-- Nuke everything to start from scratch
DROP FUNCTION IF EXISTS public.create_guest_secure(text, text, text, text);
DROP TABLE IF EXISTS public.appointments CASCADE;
DROP TABLE IF EXISTS public.medical_records CASCADE;
DROP TABLE IF EXISTS public.guests CASCADE;
DROP TABLE IF EXISTS public.user_roles CASCADE;
DROP TABLE IF EXISTS public.specialists CASCADE;
DROP TYPE IF EXISTS public.app_role;

-- Keep extensions as they are generally useful basic setup
-- create extension if not exists pgsodium;
-- create extension if not exists "uuid-ossp";
