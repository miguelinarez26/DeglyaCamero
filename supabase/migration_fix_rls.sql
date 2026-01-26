-- Drop permissive policy
drop policy if exists "Public can insert appointments" on public.appointments;

-- Create stricter policy
create policy "Public can insert pending appointments"
on public.appointments
for insert
with check (
  status = 'pending'
  AND (
    (auth.uid() IS NULL AND patient_id IS NULL) -- Guest case
    OR 
    (auth.uid() = patient_id) -- Authenticated case
  )
);
