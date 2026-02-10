-- ==========================================
-- FIX: ANONYMOUS APPOINTMENT CREATION
-- ==========================================

-- Problema: RLS bloquea INSERT en appointments para usuarios anónimos.
-- Solución: Permitir INSERT si el paciente asociado es un "Invitado" (sin usuario).

create policy "Anon create appointment" 
    on public.appointments for insert 
    with check (
        exists (
            select 1 
            from public.patients 
            where public.patients.id = patient_id 
            and public.patients.profile_id is null -- Solo permite si es un Paciente Invitado
        )
    );

-- Asegurar que la función RPC de antes tenga permisos correctos (ya estaba en el script anterior, pero refozamos).
grant execute on function public.create_guest_patient(text, text, text) to anon;
grant insert on public.appointments to anon;
