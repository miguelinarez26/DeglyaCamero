-- ==========================================
-- 1. LIMPIEZA (DROP)
-- ==========================================
-- Eliminamos tablas en orden inverso de dependencia para evitar errores
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

DROP TABLE IF EXISTS public.appointments CASCADE;
DROP TABLE IF EXISTS public.medical_records CASCADE;
DROP TABLE IF EXISTS public.specialists CASCADE;
DROP TABLE IF EXISTS public.user_roles CASCADE; -- Si existía como tabla
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Eliminar tipos personalizados si existen
DROP TYPE IF EXISTS public.user_role CASCADE;

-- ==========================================
-- 2. ENUMS Y TABLAS
-- ==========================================

-- Definimos roles estrictos (admin, therapist, patient)
CREATE TYPE public.user_role AS ENUM ('patient', 'therapist', 'admin');

CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    
    -- Información Personal (Granularidad Solicitada)
    first_name TEXT NOT NULL,
    middle_name TEXT,              -- Opcional
    last_name_1 TEXT NOT NULL,
    last_name_2 TEXT,              -- Lo dejo opcional en DB por flexibilidad, aunque el form lo pida
    
    cedula TEXT UNIQUE,            -- Cédula de Identidad
    email TEXT,                    -- Sincronizado desde auth.users
    whatsapp TEXT,
    
    -- Seguridad y Rol
    role public.user_role NOT NULL DEFAULT 'patient',
    
    -- Validación básica de email
    CONSTRAINT profiles_email_check CHECK (email ~* '^.+@.+\..+$')
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- 3. AUTOMATIZACIÓN SILENCIOSA (TRIGGER)
-- ==========================================

-- Esta función se ejecuta automáticamente cada vez que un usuario se registra
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (
        id, 
        first_name, 
        middle_name, 
        last_name_1, 
        last_name_2, 
        cedula, 
        email, 
        whatsapp, 
        role
    )
    VALUES (
        NEW.id,
        -- Extraemos datos de raw_user_meta_data envidatos desde el frontend
        COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
        NEW.raw_user_meta_data->>'middle_name',
        COALESCE(NEW.raw_user_meta_data->>'last_name_1', ''),
        NEW.raw_user_meta_data->>'last_name_2',
        NEW.raw_user_meta_data->>'cedula',
        NEW.email,
        NEW.raw_user_meta_data->>'whatsapp',
        'patient' -- Forzamos el rol 'patient' por defecto
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger que escucha inserciones en la tabla de autenticación
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ==========================================
-- 4. SEGURIDAD (POLÍTICAS RLS)
-- ==========================================

-- Primero eliminamos TODAS las políticas viejas de profiles si existen (para hacer esto re-ejecutable)
DROP POLICY IF EXISTS "Usuarios pueden ver su propio perfil" ON public.profiles;
DROP POLICY IF EXISTS "Usuarios pueden editar su propio perfil" ON public.profiles;
DROP POLICY IF EXISTS "Personal puede ver todos los perfiles" ON public.profiles;
DROP POLICY IF EXISTS "Pacientes ven y editan su propio registro" ON public.profiles;
DROP POLICY IF EXISTS "Terapeutas ven y editan su propio registro" ON public.profiles;
DROP POLICY IF EXISTS "Admins acceso total" ON public.profiles;

-- Política 1: Pacientes y Terapeutas
-- Un 'patient' o 'therapist' solo puede ver y editar su propio registro por ahora.
-- (Ambos caen en esta misma regla de acceso restringido a sí mismos)
CREATE POLICY "Usuarios comunes (pacientes y terapeutas) pueden ver su propio perfil"
    ON public.profiles
    FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Usuarios comunes (pacientes y terapeutas) pueden actualizar su propio perfil"
    ON public.profiles
    FOR UPDATE
    USING (auth.uid() = id);

-- Función robusta para verificar si alguien es admin absoluto
-- La guardamos aquí para usarla en la política 2 y evitar recursión infinita
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM public.profiles
        WHERE id = auth.uid()
        AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Política 2: Admins
-- Un 'admin' tiene acceso total (lectura, inserción, actualización, borrado) sobre toda la tabla profiles.
CREATE POLICY "Admins tienen acceso global a todos los perfiles"
    ON public.profiles
    FOR ALL
    USING (public.is_admin());

