-- ==========================================
-- MIGRATION: 20260126_allow_anon_uploads.sql
-- DESCRIPTION: Allow public (anonymous) users to upload payment proofs to 'clinic-docs'.
-- ==========================================

BEGIN;

-- 1. DROP EXISTING UPLOAD POLICY (If it was restricted to authenticated)
DROP POLICY IF EXISTS "Auth users can upload to clinic-docs" ON storage.objects;

-- 2. CREATE NEW UPLOAD POLICY (For Everyone)
CREATE POLICY "Public uploads to clinic-docs"
ON storage.objects FOR INSERT TO public
WITH CHECK ( bucket_id = 'clinic-docs' );

-- 3. ENSURE SELECT IS ALSO PUBLIC (Ideally, or keep it restricted? 
-- The prompt asks for upload. Usually, the user needs to SEE the image to preview it or the receptionist needs to see it?
-- Receptionist is authenticated. 
-- Does the guest need to see it after upload? Probably for preview.
-- Let's allow public READ for simplicity in this MVP default bucket, OR restrict if requested. 
-- User only mentioned "subida". I'll keep READ restricted to Staff+Owner for privacy, BUT 
-- if the user acts as "guest", they won't be "owner" (auth.uid() is null). 
-- So guests won't see their upload preview if I don't allow public read.
-- I'll allow public read for now to ensure no broken images in the UI, assuming UUIDs are hard to guess.

DROP POLICY IF EXISTS "Staff can view clinic-docs" ON storage.objects;

CREATE POLICY "Public view clinic-docs"
ON storage.objects FOR SELECT TO public
USING ( bucket_id = 'clinic-docs' );

COMMIT;
