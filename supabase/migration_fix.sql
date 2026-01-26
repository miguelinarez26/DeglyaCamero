-- 1. Add guest_details to appointments
alter table public.appointments add column if not exists guest_details jsonb;

-- 2. Enable RLS on specialists
alter table public.specialists enable row level security;

-- 3. Add public read policy for specialists
create policy "Public can view specialists"
on public.specialists
for select
using (true);

-- 4. Add key_id to specialists if missing (check schema first, it was there but maybe not in real db)
-- (It was in schema.sql line 11: encryption_key_id uuid not null)
-- We assume schema was applied before. If not, this might fail, but let's focus on confirmed missing items.
