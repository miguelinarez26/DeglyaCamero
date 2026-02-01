-- 1. Add missing columns to patients table
ALTER TABLE public.patients 
ADD COLUMN IF NOT EXISTS first_name text,
ADD COLUMN IF NOT EXISTS last_name text,
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS national_id text;

-- 2. Fix Function Search Paths (Security Warning)
-- Security Best Practice: Set search_path to 'public' to prevent malicious schema usage
ALTER FUNCTION public.handle_new_user() SET search_path = public;
ALTER FUNCTION public.is_admin_or_specialist() SET search_path = public;
ALTER FUNCTION public.is_role(text) SET search_path = public;
ALTER FUNCTION public.is_programador() SET search_path = public;

-- 3. Reload Config (to apply changes to PostgREST cache immediately)
NOTIFY pgrst, 'reload config';
