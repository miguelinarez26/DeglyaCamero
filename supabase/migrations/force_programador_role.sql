-- ==========================================
-- HELPER: force_programador_role.sql
-- DESCRIPTION: Run this to force a user to have the 'programador' role (Super Admin / VIP).
-- ==========================================

-- Replace 'tu_email@ejemplo.com' with your actual email
UPDATE public.profiles
SET role = 'programador'
WHERE email = 'tu_email@ejemplo.com'; -- <--- CAMBIA ESTO POR TU EMAIL REAL

-- Just in case, confirm it linked
SELECT * FROM public.profiles WHERE role = 'programador';
