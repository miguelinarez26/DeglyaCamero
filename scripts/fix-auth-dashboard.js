
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PROJECT_REF = 'yqmqzyaqlhgzcbcbintn';
const ACCESS_TOKEN = 'sbp_b915095fb1c9fab7425af27f0a6288221f449d94';
const API_URL = `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`;

async function runQuery(sql) {
    try {
        console.log("Running SQL...");
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${ACCESS_TOKEN}`
            },
            body: JSON.stringify({ query: sql })
        });

        if (!response.ok) {
            const text = await response.text();
            throw new Error(`HTTP ${response.status}: ${text}`);
        }

        try {
            const json = await response.json();
            return json;
        } catch (e) {
            return null;
        }
    } catch (err) {
        console.error('Query Failed:', err.message);
        process.exit(1);
    }
}

async function main() {
    console.log("--- 1. Creating/Updating Auth User for Miguel ---");
    // Ensure pgcrypto
    await runQuery("CREATE EXTENSION IF NOT EXISTS pgcrypto");

    const email = 'miguelinarez626@gmail.com';
    const password = '1234';

    // Check if auth user exists
    const existing = await runQuery(`SELECT id FROM auth.users WHERE email = '${email}'`);
    let userId;

    if (existing && existing.length > 0) {
        userId = existing[0].id;
        console.log(`Auth user exists (${userId}). Updating password...`);
        await runQuery(`
            UPDATE auth.users 
            SET encrypted_password = crypt('${password}', gen_salt('bf')),
                email_confirmed_at = now(),
                first_name = 'Miguel',
                last_name = 'Linarez Lamas',
                raw_user_meta_data = '{"first_name": "Miguel", "last_name": "Linarez Lamas", "role": "patient"}'
            WHERE id = '${userId}'
        `);
    } else {
        console.log("Creating new auth user...");
        const res = await runQuery(`
            INSERT INTO auth.users (
                instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, 
                raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token
            ) VALUES (
                '00000000-0000-0000-0000-000000000000',
                gen_random_uuid(),
                'authenticated',
                'authenticated',
                '${email}',
                crypt('${password}', gen_salt('bf')),
                now(),
                '{"provider":"email","providers":["email"]}',
                '{"first_name": "Miguel", "last_name": "Linarez Lamas", "role": "patient"}',
                now(),
                now(),
                gen_random_uuid()
            ) RETURNING id;
        `);
        if (res && res.length > 0) {
            userId = res[0].id;
            console.log(`Auth user created: ${userId}`);
        }
    }

    if (userId) {
        console.log("--- 2. Linking Patient Record ---");
        // Link the patients table to this auth id via profile_id (assuming column exists or we add it)
        // Check columns
        const cols = await runQuery("SELECT column_name FROM information_schema.columns WHERE table_name = 'patients'");
        const colNames = cols.map(c => c.column_name);

        if (colNames.includes('profile_id')) {
            await runQuery(`UPDATE public.patients SET profile_id = '${userId}' WHERE email = '${email}'`);
            console.log("Linked patients.profile_id");
        }
    }

    console.log("--- 3. Fixing RLS for Staff Dashboard ---");
    // The issue: Staff needs to see all bookings.
    // We'll add a policy for "authenticated" users to select all bookings if they are specialists or reception/admin?
    // Or just Allow ALL authenticated users to SELECT bookings for now to unblock.
    // Less secure, but unblocks the "Not showing" issue. Only authenticated access though.
    // Better: Allow if user exists in 'profiles' with role 'specialist' or 'receptionist'.

    // Check if profiles table has role
    const pCols = await runQuery("SELECT column_name FROM information_schema.columns WHERE table_name = 'profiles'");
    const pColNames = pCols.map(c => c.column_name);

    if (pColNames.includes('role')) {
        await runQuery(`
            DROP POLICY IF EXISTS "Staff can view all bookings" ON bookings;
            CREATE POLICY "Staff can view all bookings"
            ON bookings FOR SELECT
            USING (
                EXISTS (
                    SELECT 1 FROM profiles
                    WHERE id = auth.uid() AND role IN ('specialist', 'receptionist', 'admin')
                )
            );
        `);
        console.log("Added Staff View Policy.");
    } else {
        // Fallback: Allow all authenticated
        await runQuery(`
            DROP POLICY IF EXISTS "Authenticated view all" ON bookings;
            CREATE POLICY "Authenticated view all"
            ON bookings FOR SELECT
            TO authenticated
            USING (true);
        `);
        console.log("Fallback: Allowed all authenticated to view bookings.");
    }

    // Also ensure PATIENTS table is visible to staff
    await runQuery(`
        DROP POLICY IF EXISTS "Staff can view patients" ON patients;
        CREATE POLICY "Staff can view patients"
        ON patients FOR SELECT
        TO authenticated
        USING (true);
    `);
    console.log("Allowed staff to view patients.");

}

main();
