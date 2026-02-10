-- ==========================================
-- FIX: SECURE GUEST CREATION (RPC)
-- ==========================================

-- Por privacidad, no permitimos que 'anon' haga SELECT en la tabla patients.
-- Por lo tanto, no pueden recibir el ID de vuelta tras un INSERT estándar.
-- Solución: Una función segura que inserta y retorna el ID.

create or replace function public.create_guest_patient(
    p_email text,
    p_full_name text,
    p_phone text
)
returns uuid
language plpgsql
security definer -- Corre con permisos de administrador (bypaea RLS)
as $$
declare
    new_id uuid;
begin
    -- 1. Verificar si ya existe (por email) para evitar duplicados / errores
    select id into new_id from public.patients where email = p_email limit 1;
    
    if new_id is not null then
        return new_id; -- Retornamos el existente
    end if;

    -- 2. Insertar nuevo
    insert into public.patients (profile_id, email, full_name, phone)
    values (null, p_email, p_full_name, p_phone)
    returning id into new_id;

    return new_id;
end;
$$;

-- Permitir que 'anon' y 'authenticated' usen esta función
grant execute on function public.create_guest_patient(text, text, text) to anon, authenticated, service_role;
