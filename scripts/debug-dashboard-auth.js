
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PROJECT_REF = 'yqmqzyaqlhgzcbcbintn';
const ACCESS_TOKEN = 'sbp_b915095fb1c9fab7425af27f0a6288221f449d94';
const API_URL = `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`;

async function runQuery(sql) {
    try {
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
            return await response.json();
        } catch (e) {
            return null;
        }
    } catch (err) {
        console.error('Query Failed:', err.message);
        process.exit(1);
    }
}

async function debugDashboard() {
    console.log("1. Checking Bookings Table...");
    const bookings = await runQuery(`
        SELECT b.id, b.status, b.start_time, 
               p.first_name, p.last_name, p.email,
               pr.full_name as specialist_name
        FROM bookings b
        LEFT JOIN patients p ON b.patient_id = p.id
        LEFT JOIN profiles pr ON b.user_id = pr.id
        ORDER BY b.created_at DESC LIMIT 5
    `);
    console.log("Bookings:", JSON.stringify(bookings, null, 2));

    console.log("2. Checking Patients Schema...");
    const pCols = await runQuery("SELECT column_name FROM information_schema.columns WHERE table_name = 'patients'");
    const cols = pCols.map(c => c.column_name);
    console.log("Patients Columns:", cols);

    // Check if we can link to auth
    // Assuming 'profile_id' or similar might exist if we added it, or we rely on email matching?
    // User wants Miguel to login.

    console.log("3. Creating Auth User for Miguel (miguelinarez626@gmail.com)...");

    // Check if exists in auth schema
    const authUser = await runQuery("SELECT id, email FROM auth.users WHERE email = 'miguelinarez626@gmail.com'");
    let userId;

    if (authUser && authUser.length > 0) {
        console.log("Auth User Exists:", authUser[0].id);
        userId = authUser[0].id;
    } else {
        console.log("Creating Auth User via SQL...");
        // Use pgcrypto for password '1234'
        const insertAuth = `
            INSERT INTO auth.users (
                instance_id,
                id,
                aud,
                role,
                email,
                encrypted_password,
                email_confirmed_at,
                raw_app_meta_data,
                raw_user_meta_data,
                created_at,
                updated_at,
                is_sso_user
            ) VALUES (
                '00000000-0000-0000-0000-000000000000',
                gen_random_uuid(),
                'authenticated',
                'authenticated',
                'miguelinarez626@gmail.com',
                crypt('1234', gen_salt('bf')),
                now(),
                '{"provider":"email","providers":["email"]}',
                '{}',
                now(),
                now(),
                false
            ) RETURNING id;
        `;
        // Make sure pgcrypto is on? Usually is. 
        // We'll trust it is or enable it.
        await runQuery("CREATE EXTENSION IF NOT EXISTS pgcrypto");

        const result = await runQuery(insertAuth);
        if (result && result.length > 0) {
            userId = result[0].id;
            console.log("Created Auth User:", userId);
        }
    }

    if (userId) {
        // 4. Link Patient Record if possible
        // If 'patients' has a profile_id column, update it.
        if (cols.includes('profile_id')) {
            console.log("Linking Patient Record to Auth User...");
            await runQuery(`UPDATE public.patients SET profile_id = '${userId}' WHERE email = 'miguelinarez626@gmail.com'`);
        }
    }
}

debugDashboard();
