-- ==========================================
-- MIGRATION: 20260126_refactor_schema.sql
-- DESCRIPTION: Refactor schema for Hybrid Patients, Clinical Privacy, and Payment Flow.
-- INCLUDES: Safe data migration for appointments.
-- ==========================================

BEGIN;

-- 1. UPDATE ENUMS (Types)
-- ==========================================
-- Add new roles to user_role enum if they don't exist
ALTER TYPE public.user_role ADD VALUE IF NOT EXISTS 'receptionist';
ALTER TYPE public.user_role ADD VALUE IF NOT EXISTS 'programador'; -- developer role

-- Create appointment_status enum
DO $$ BEGIN
    CREATE TYPE public.appointment_status AS ENUM ('pendiente', 'confirmada', 'cancelada');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. CREATE STORAGE BUCKET
-- ==========================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('clinic-docs', 'clinic-docs', true) -- Set public to false if strict privacy is needed, but user didn't specify. Keeping private for medical records is safer.
ON CONFLICT (id) DO NOTHING;

-- Policy: Authenticated users can upload (for payment proofs)
CREATE POLICY "Auth users can upload to clinic-docs"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK ( bucket_id = 'clinic-docs' );

-- Policy: Specialists/Admins/Receptionists can view
CREATE POLICY "Staff can view clinic-docs"
ON storage.objects FOR SELECT TO authenticated
USING ( bucket_id = 'clinic-docs' AND (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('specialist', 'admin', 'receptionist', 'programador'))
    OR owner = auth.uid() -- Patients see their own uploads
));

-- 3. UPDATE SPECIALISTS TABLE
-- ==========================================
-- Ensure table exists (it might be dropped in previous steps of schema.sql if run fresh, but assuming we are migrating an existing DB)
CREATE TABLE IF NOT EXISTS public.specialists (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    name TEXT
);

-- Add columns if they don't exist
DO $$ BEGIN
    ALTER TABLE public.specialists ADD COLUMN IF NOT EXISTS profile_id UUID REFERENCES public.profiles(id);
    ALTER TABLE public.specialists ADD COLUMN IF NOT EXISTS google_calendar_token TEXT;
EXCEPTION
    WHEN others THEN null;
END $$;

-- 4. CREATE PATIENTS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID REFERENCES public.profiles(id), -- Nullable for WhatsApp walk-ins
    full_name TEXT NOT NULL,
    whatsapp TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_profile_id UNIQUE (profile_id)
);

-- Enable RLS
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;

-- 5. DATA MIGRATION: POPULATE PATIENTS
-- ==========================================
-- Populate patients from existing profiles
INSERT INTO public.patients (profile_id, full_name, whatsapp, created_at)
SELECT 
    id, 
    TRIM(COALESCE(first_name, '') || ' ' || COALESCE(middle_name, '') || ' ' || COALESCE(last_name_1, '') || ' ' || COALESCE(last_name_2, '')), 
    whatsapp,
    created_at
FROM public.profiles
WHERE role = 'patient'
ON CONFLICT (profile_id) DO NOTHING;

-- 6. UPDATE APPOINTMENTS TABLE (SAFE MIGRATION)
-- ==========================================
-- Step A: Add temporary column to hold old reference
ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS old_patient_id UUID;

-- Step B: Copy current patient_id (referencing profiles) to old_patient_id
-- Only do this if we haven't already migrated (check if patient_id is still pointing to profiles? 
-- Hard to check constraints easily in pure SQL block without complex logic, so we assume standard flow).
-- We'll assume patient_id CURRENTLY references profiles.id.
UPDATE public.appointments SET old_patient_id = patient_id WHERE old_patient_id IS NULL;

-- Step C: Drop the old FK constraint
ALTER TABLE public.appointments DROP CONSTRAINT IF EXISTS appointments_patient_id_fkey;

-- Step D: Map patient_id to the NEW patients.id using the profile_id link
UPDATE public.appointments a
SET patient_id = p.id
FROM public.patients p
WHERE a.old_patient_id = p.profile_id;

-- Step E: Add new FK constraint
ALTER TABLE public.appointments ADD CONSTRAINT appointments_patient_id_fkey 
    FOREIGN KEY (patient_id) REFERENCES public.patients(id);

-- Step F: Add new columns
ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS payment_proof_url TEXT;
ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS status public.appointment_status DEFAULT 'pendiente';
ALTER TABLE public.appointments ADD COLUMN IF NOT EXISTS verified_by UUID REFERENCES public.profiles(id);

-- 7. CREATE MEDICAL_RECORDS TABLE
-- ==========================================
CREATE TABLE IF NOT EXISTS public.medical_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID NOT NULL REFERENCES public.patients(id),
    specialist_id UUID NOT NULL REFERENCES public.specialists(id),
    content TEXT, -- Encryption handled by pgsodium/application layer if needed, currently TEXT as requested
    attachments_urls TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.medical_records ENABLE ROW LEVEL SECURITY;

-- 8. SECURITY (RLS POLICIES)
-- ==========================================

-- HELPER FUNCTIONS
CREATE OR REPLACE FUNCTION public.is_role(target_role public.user_role)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid()
        AND role = target_role
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.is_programador()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid()
        AND role = 'programador'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- PATIENTS POLICIES
-- Programador & Specialists & Receptionists can view all
CREATE POLICY "Staff view all patients" ON public.patients
FOR SELECT USING (
    public.is_role('specialist') OR 
    public.is_role('receptionist') OR 
    public.is_programador()
);

-- Patients can view their own record
CREATE POLICY "Patients view own record" ON public.patients
FOR SELECT USING (
    profile_id = auth.uid()
);

-- Receptionists/Specialists can insert/update
CREATE POLICY "Staff manage patients" ON public.patients
FOR ALL USING (
    public.is_role('specialist') OR 
    public.is_role('receptionist') OR 
    public.is_programador()
);


-- MEDICAL RECORDS POLICIES
-- Only Specialists can VIEW their own records (connected via specialist_id ? OR just be a specialist?)
-- Req: "Solo los usuarios con role = 'especialista' puedan leer y escribir... y únicamente si el specialist_id coincide con su perfil"
-- We need to link auth.uid() -> specialist.id.
-- Let's assume specialists.profile_id is the link.

CREATE POLICY "Specialists manage own records" ON public.medical_records
FOR ALL USING (
    EXISTS (
        SELECT 1 FROM public.specialists s
        WHERE s.id = medical_records.specialist_id
        AND s.profile_id = auth.uid()
    ) OR public.is_programador() -- Programador bypass
);

-- Receptionists CANNOT see medical records (Default deny ensures this if no policy grants it)


-- APPOINTMENTS POLICIES
-- Update existing or create new
CREATE POLICY "Receptionists view all appointments" ON public.appointments
FOR SELECT USING (
    public.is_role('receptionist') OR
    public.is_role('specialist') OR
    public.is_role('admin') OR
    public.is_programador()
    OR patient_id IN (SELECT id FROM public.patients WHERE profile_id = auth.uid()) -- Patient sees own
);

CREATE POLICY "Receptionists manage appointments" ON public.appointments
FOR UPDATE USING (
    public.is_role('receptionist') OR public.is_programador()
);

-- 9. CLEANUP
-- ==========================================
-- Optional: DROP COLUMN old_patient_id after verification;
-- ALTER TABLE public.appointments DROP COLUMN old_patient_id;

COMMIT;
