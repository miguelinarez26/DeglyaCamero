-- ==========================================
-- MIGRATION V5: HYBRID APPOINTMENTS (CLEAN)
-- ==========================================

-- 1. LIMPIEZA PROTEGIDA
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

DROP TABLE IF EXISTS public.appointments CASCADE;
DROP TABLE IF EXISTS public.services CASCADE;
DROP TABLE IF EXISTS public.patients CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

DROP TYPE IF EXISTS appointment_status CASCADE;
DROP TYPE IF EXISTS user_role CASCADE;

-- 2. CONFIGURACIÓN
create extension if not exists "uuid-ossp";

create type user_role as enum ('patient', 'specialist', 'admin');
create type appointment_status as enum ('pending', 'confirmed', 'completed', 'cancelled');

-- 3. TABLAS

-- A. PROFILES (Cuentas de Usuario - Google/Email)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  role user_role default 'patient',
  created_at timestamptz default now()
);

-- B. PATIENTS (Identidad Médica - Híbrida)
create table public.patients (
  id uuid default uuid_generate_v4() primary key,
  profile_id uuid references public.profiles(id), -- NULL = Invitado, UUID = Registrado
  email text, -- Vital para enlazar después
  full_name text,
  phone text,
  created_at timestamptz default now()
);

-- C. SERVICES
create table public.services (
  id text primary key,
  title text not null,
  price numeric not null,
  duration_min int default 50,
  description text,
  category text,
  is_active boolean default true
);

-- D. APPOINTMENTS
create table public.appointments (
  id uuid default uuid_generate_v4() primary key,
  patient_id uuid references public.patients(id) not null, -- Siempre apunta a un Paciente
  service_id text references public.services(id) not null,
  start_time timestamptz not null,
  end_time timestamptz not null,
  status appointment_status default 'pending',
  meeting_link text,
  notes text,
  created_at timestamptz default now()
);

-- 4. SEGURIDAD (RLS)

alter table public.profiles enable row level security;
alter table public.patients enable row level security;
alter table public.appointments enable row level security;
alter table public.services enable row level security;

-- POLICIES

-- Services (Público)
create policy "Services public view" on public.services for select using (true);

-- Profiles (Dueño)
create policy "Profiles view own" on public.profiles for select using (auth.uid() = id);
create policy "Profiles update own" on public.profiles for update using (auth.uid() = id);

-- Patients (Híbrido)
-- Invitados pueden CREAR (para reservar)
create policy "Anon create patient" on public.patients for insert with check (profile_id is null);
-- Usuarios ven SU paciente
create policy "User view own patient" on public.patients for select using (profile_id = auth.uid());
-- Admin/Especialistas ven todo (Simplificado por ahora)

-- Appointments
-- Invitados pueden CREAR
create policy "Anon create appointment" on public.appointments for insert with check (
  exists (select 1 from public.patients where id = patient_id and profile_id is null)
);
-- Usuarios ven SUS citas (via Patient link)
create policy "User view own appointments" on public.appointments for select using (
  exists (select 1 from public.patients where id = patient_id and profile_id = auth.uid())
);

-- 5. TRIGGERS (Auto-Perfil)
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url, role)
  values (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name', 
    new.raw_user_meta_data->>'avatar_url', -- Google envía esto
    'patient'
  );
  
  -- LÓGICA DE ENLACE INTELIGENTE (Opcional por ahora)
  -- Si ya existe un paciente con ese email, le asignamos el profile_id
  update public.patients 
  set profile_id = new.id 
  where email = new.email and profile_id is null;
  
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 6. DATOS SEMILLA
insert into public.services (id, title, price, duration_min, category) values 
('initial-interview', 'Entrevista Inicial', 50.00, 50, 'personas'),
('individual-therapy', 'Terapia Individual', 80.00, 50, 'personas'),
('couples-therapy', 'Terapia de Pareja', 120.00, 50, 'personas')
on conflict (id) do nothing;
