
-- 1. Create User Roles Table (First because guests policy depends on it)
-- Create type if it doesn't exist
do $$ begin
    create type public.app_role as enum ('admin', 'specialist', 'secretary');
exception
    when duplicate_object then null;
end $$;

create table if not exists public.user_roles (
  user_id uuid references auth.users not null primary key,
  role public.app_role not null
);

alter table public.user_roles enable row level security;
drop policy if exists "Read access for authenticated users" on public.user_roles;
create policy "Read access for authenticated users" on public.user_roles for select using (auth.role() = 'authenticated');


-- 2. Create Guests Table (Identity for unauthenticated users)
create table if not exists public.guests (
  id uuid default uuid_generate_v4() primary key,
  email text,
  phone text,
  national_id text, -- Cedula
  full_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(national_id)
);

-- Enable RLS for guests
alter table public.guests enable row level security;
-- Guests can be inserted by public (during booking)
drop policy if exists "Public can create guests" on public.guests;
create policy "Public can create guests" on public.guests for insert with check (true);

-- Only read/updated by staff
drop policy if exists "Staff can view guests" on public.guests;
create policy "Staff can view guests" on public.guests for select using (
  exists (select 1 from public.user_roles where user_id = auth.uid() and role in ('admin', 'specialist', 'secretary'))
);


-- 3. Modify Appointments
-- Add guest_id
alter table public.appointments add column if not exists guest_id uuid references public.guests(id);
-- Add triage data (encrypted or strict RLS)
alter table public.appointments add column if not exists triage_notes text;

-- 4. Update Appointment RLS for Staff
-- Allow staff to update appointments (e.g. confirm payment)
drop policy if exists "Staff can update appointments" on public.appointments;
create policy "Staff can update appointments"
on public.appointments
for update
using (
  exists (select 1 from public.user_roles where user_id = auth.uid() and role in ('admin', 'specialist', 'secretary'))
);
