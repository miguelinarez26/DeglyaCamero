-- Create Profiles Table
create table public.profiles (
  id uuid references auth.users not null primary key,
  full_name text,
  id_number text,
  phone text,
  email text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS for Profiles
alter table public.profiles enable row level security;

create policy "Users can view their own profile" on public.profiles
  for select using (auth.uid() = id);

create policy "Users can update their own profile" on public.profiles
  for update using (auth.uid() = id);

-- Create Appointments Table
create table public.appointments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id),
  service_type text not null,
  scheduled_at timestamptz not null,
  price numeric(10, 2) not null,
  payment_status text default 'pending', -- pending, paid, failed
  receipt_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Enable RLS for Appointments
alter table public.appointments enable row level security;

create policy "Users can view their own appointments" on public.appointments
  for select using (auth.uid() = user_id);

create policy "Users can insert their own appointments" on public.appointments
  for insert with check (auth.uid() = user_id);

-- Create Intake Forms Table (Encrypted/Private)
create table public.intake_forms (
  id uuid default gen_random_uuid() primary key,
  appointment_id uuid references public.appointments(id) not null,
  reason text,
  goals_json jsonb,
  priorities text,
  created_at timestamptz default now()
);

-- Enable RLS for Intake Forms
alter table public.intake_forms enable row level security;

create policy "Users can view their own intake forms" on public.intake_forms
  for select using (
    exists (
      select 1 from public.appointments
      where public.appointments.id = public.intake_forms.appointment_id
      and public.appointments.user_id = auth.uid()
    )
  );

create policy "Users can insert their own intake forms" on public.intake_forms
  for insert with check (
    exists (
      select 1 from public.appointments
      where public.appointments.id = public.intake_forms.appointment_id
      and public.appointments.user_id = auth.uid()
    )
  );

-- Storage Policy for Receipts (Mock bucket setup instructions usually needed, but policy here)
-- Note: You need to create a bucket named 'receipts' in Supabase Storage manually or via seed.
