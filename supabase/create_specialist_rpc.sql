-- Función para invitar/crear un especialista con el rol correcto bypassando el trigger de paciente por defecto
CREATE OR REPLACE FUNCTION public.create_specialist(
    p_email TEXT,
    p_password TEXT,
    p_first_name TEXT,
    p_last_name_1 TEXT,
    p_cedula TEXT
)
RETURNS UUID AS $$
DECLARE
    new_user_id UUID;
BEGIN
    -- 1. Crear el usuario en auth.users
    INSERT INTO auth.users (email, password, raw_user_meta_data, email_confirmed_at, confirmed_at)
    VALUES (
        p_email, 
        crypt(p_password, gen_salt('bf')), 
        jsonb_build_object(
            'first_name', p_first_name,
            'last_name_1', p_last_name_1,
            'cedula', p_cedula,
            'role', 'specialist'
        ),
        NOW(),
        NOW()
    )
    RETURNING id INTO new_user_id;

    -- 2. El trigger public.handle_new_user() se ejecutará automáticamente insertando en public.profiles con rol 'patient'
    -- 3. Corregimos el rol a 'specialist'
    UPDATE public.profiles 
    SET role = 'specialist' 
    WHERE id = new_user_id;

    RETURN new_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
