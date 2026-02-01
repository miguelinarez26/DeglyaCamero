
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
            const data = await response.json();
            return data;
        } catch (e) {
            return null;
        }
    } catch (err) {
        console.error('Query Failed:', err.message);
        process.exit(1);
    }
}

async function verify() {
    console.log("Checking tables in public schema...");
    const tables = await runQuery("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    console.log("Tables:", JSON.stringify(tables, null, 2));

    const sql = `
        SELECT e.id, e.title, p.full_name, p.specialty 
        FROM public.event_types e 
        JOIN public.profiles p ON e.user_id = p.id 
        WHERE e.active = true
    `;

    console.log("Executing join query...");
    const result = await runQuery(sql);
    console.log('Verification Result:', JSON.stringify(result, null, 2));

    if (!result || result.length === 0) {
        console.warn("WARNING: No active event types joined with profiles found!");
        // We might need to insert a profile for the user
        const userIdResult = await runQuery("SELECT id FROM auth.users LIMIT 1");
        if (userIdResult && userIdResult.length > 0) {
            const userId = userIdResult[0].id;
            console.log(`Checking profile for user ${userId}...`);
            // Check if profile exists
            const profileResult = await runQuery(`SELECT * FROM public.profiles WHERE id = '${userId}'`);

            if (!profileResult || profileResult.length === 0) {
                console.log(`Inserting profile for user ${userId}...`);
                // Check columns in profiles to avoid error if specialty doesn't exist
                const columnsResult = await runQuery(`
                    SELECT column_name FROM information_schema.columns 
                    WHERE table_schema = 'public' AND table_name = 'profiles'
                `);
                const columns = columnsResult.map(c => c.column_name);
                console.log("Profiles columns:", columns);

                // Construct insert based on available columns
                let insertSql = `INSERT INTO public.profiles (id, full_name`;
                let valuesSql = `VALUES ('${userId}', 'Degly Camero'`;

                if (columns.includes('specialty')) {
                    insertSql += `, specialty`;
                    valuesSql += `, 'Psicóloga Clínica'`;
                }

                insertSql += `) ${valuesSql})`;

                await runQuery(insertSql);
                console.log("Profile inserted.");
            }
        }
    } else {
        console.log("Success: Specialists are ready.");
    }
}

verify();
