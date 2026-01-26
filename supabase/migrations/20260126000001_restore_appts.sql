-- RESTORE APPOINTMENTS & SPECIALISTS
-- This file restores tables required by the frontend that were dropped during cleanup.

-- 1. SPECIALISTS TABLE
-- Needs: id, full_name, specialty
CREATE TABLE IF NOT EXISTS public.specialists (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    full_name TEXT NOT NULL,
    specialty TEXT DEFAULT 'General',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert a default specialist to prevent "No specialists available" error
INSERT INTO public.specialists (full_name, specialty)
SELECT 'Dr. Triage General', 'Medicina General'
WHERE NOT EXISTS (SELECT 1 FROM public.specialists);

-- Enable RLS for specialists (Public Read)
ALTER TABLE public.specialists ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read specialists" ON public.specialists FOR SELECT USING (true);


-- 2. APPOINTMENTS TABLE
-- Needs: specialist_id, start_time, end_time, status, patient_id, triage_notes
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    
    specialist_id UUID REFERENCES public.specialists(id),
    patient_id UUID REFERENCES public.profiles(id), -- Links to our new profiles
    
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
    triage_notes JSONB,
    
    guest_id UUID -- Legacy field, keeping nullable for now via text, or assume null
);

-- Enable RLS
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Policy: Users see their own appointments
CREATE POLICY "Users view own appointments"
    ON public.appointments
    FOR SELECT
    USING (auth.uid() = patient_id);

-- Policy: Users create appointments (for themselves)
CREATE POLICY "Users create appointments"
    ON public.appointments
    FOR INSERT
    WITH CHECK (auth.uid() = patient_id);

-- Policy: Staff view all
CREATE POLICY "Staff view all appointments"
    ON public.appointments
    FOR SELECT
    USING (public.is_admin_or_specialist());
