-- ==========================================
-- FIX: SECURE APPOINTMENT RPC
-- ==========================================

-- Reemplazamos la lógica de RLS compleja con una función atómica y segura.

create or replace function public.create_guest_appointment(
    p_patient_id uuid,
    p_service_id text,
    p_start_time timestamptz,
    p_end_time timestamptz,
    p_notes text default null
)
returns uuid
language plpgsql
security definer -- Elevation de privilegios
as $$
declare
    new_id uuid;
    v_is_guest boolean;
begin
    -- 1. Validar que el paciente existe y NO tiene usuario (Es invitado)
    select (profile_id is null) into v_is_guest
    from public.patients
    where id = p_patient_id;

    if v_is_guest is null then
        raise exception 'Paciente no encontrado';
    end if;

    if v_is_guest = false then
        raise exception 'Este paciente tiene cuenta de usuario. Debe iniciar sesión.';
    end if;

    -- 2. Insertar Cita
    insert into public.appointments (
        patient_id, service_id, start_time, end_time, status, notes
    )
    values (
        p_patient_id, p_service_id, p_start_time, p_end_time, 'pending', p_notes
    )
    returning id into new_id;

    return new_id;
end;
$$;

grant execute on function public.create_guest_appointment(uuid, text, timestamptz, timestamptz, text) to anon, authenticated;
