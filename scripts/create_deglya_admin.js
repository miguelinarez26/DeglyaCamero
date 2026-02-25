import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Faltan variables de entorno (VITE_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY)');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

async function createSpecialist() {
    const email = 'deglya.therapy@gmail.com';
    const password = 'Deglya2026*';
    const fullName = 'Deglya Camero';

    console.log(`Buscando usuario: ${email}`);

    const { data: listData, error: listError } = await supabase.auth.admin.listUsers();
    if (listError) {
        console.error('Error listando usuarios:', listError.message);
        return;
    }

    let existingUser = listData.users.find(u => u.email === email);
    let userId;

    if (existingUser) {
        userId = existingUser.id;
        console.log('Usuario ya existe con ID:', userId);

        console.log('Actualizando password y metadata...');
        const { error: updateError } = await supabase.auth.admin.updateUserById(userId, {
            password: password,
            user_metadata: { full_name: fullName, role: 'specialist' }
        });
        if (updateError) console.error('Error actualizando usuario:', updateError.message);
    } else {
        console.log('Creando nuevo usuario...');
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true,
            user_metadata: { full_name: fullName, role: 'specialist' }
        });

        if (authError) {
            console.error('Error creando usuario:', authError.message);
            return;
        }
        userId = authData.user.id;
    }

    // 2. Forzar el perfil en public.profiles
    console.log('Asegurando perfil en public.profiles...');
    const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
            id: userId,
            email: email,
            full_name: fullName,
            role: 'specialist'
        }, { onConflict: 'id' });

    if (profileError) {
        console.error('Error al actualizar perfil:', profileError.message);
    } else {
        console.log('¡Operación completada!');
        console.log(`Acceso garantizado para: ${email}`);
    }
}

createSpecialist();
