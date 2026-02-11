
import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.join(__dirname, '../.env');

// Manual .env parser
const env = {};
if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    lines.forEach(line => {
        const [key, value] = line.split('=');
        if (key && value) {
            env[key.trim()] = value.trim();
        }
    });
}

const supabaseUrl = env.VITE_SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
    console.error('Missing environment variables (VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY).');
    console.error('Loaded from:', envPath);
    process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function createPatientUser() {
    const email = 'paciente_test@deglya.com';
    const password = 'Password123!';
    const fullName = 'Paciente Pruebas';

    console.log(`Creating user: ${email}...`);

    // 1. Create Auth User
    const { data: { user }, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: fullName }
    });

    if (authError) {
        if (authError.message.includes('already registered') || authError.status === 422) {
            console.log('User already exists in Auth. Fetching by email...');

            // List users to find ID
            const { data, error: listError } = await supabase.auth.admin.listUsers();
            if (listError) {
                console.error('Error listing users:', listError);
                return;
            }

            const existing = data.users.find(u => u.email === email);
            if (existing) {
                console.log(`Found existing user: ${existing.id}`);
                // Start Reset password just in case user forgot it
                const { error: updateError } = await supabase.auth.admin.updateUserById(existing.id, { password: password });
                if (updateError) console.error('Error resetting password:', updateError);
                else console.log('Password reset to default.');

                return await ensureProfileAndPatient(existing.id, email, fullName);
            } else {
                console.error("User said to exist but not found in list. Maybe pagination issue?");
            }
        }
        console.error('Error creating auth user:', authError);
        return;
    }

    if (user) {
        console.log(`Auth user created: ${user.id}`);
        await ensureProfileAndPatient(user.id, email, fullName);
    }
}

async function ensureProfileAndPatient(userId, email, fullName) {
    // 2. Upsert Profile
    console.log('Upserting Profile...');

    // Check if table exists/columns by trying update
    const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
            id: userId,
            full_name: fullName,
            role: 'patient',
            email: email,
            avatar_url: ''
        }, { onConflict: 'id' });

    if (profileError) {
        console.error('Error upserting profile:', profileError);
    } else {
        console.log('Profile created/updated.');
    }

    // 3. Upsert Patient Record
    console.log('Upserting Patient Record...');

    // Check existing patient
    const { data: existingPatients, error: fetchError } = await supabase
        .from('patients')
        .select('*')
        .eq('email', email); // Link by email effectively

    if (fetchError) console.error('Error checking patient:', fetchError);

    let patientId;

    if (existingPatients && existingPatients.length > 0) {
        patientId = existingPatients[0].id;
        console.log(`Found existing patient record: ${patientId}. Updating profile_id...`);

        const { error: updatePatientError } = await supabase
            .from('patients')
            .update({ profile_id: userId })
            .eq('id', patientId);

        if (updatePatientError) console.error("Error updating patient profile_id:", updatePatientError);
        else console.log("Patient record linked to auth user.");

    } else {
        console.log("Creating new patient record...");
        const { data, error: insertError } = await supabase
            .from('patients')
            .insert({
                profile_id: userId,
                first_name: fullName.split(' ')[0],
                last_name: fullName.split(' ')[1] || '',
                email: email,
                phone: '555-0000'
            })
            .select();

        if (insertError) {
            console.error('Error creating patient record:', insertError);
        } else {
            console.log('Patient record created.');
        }
    }
}

createPatientUser();
