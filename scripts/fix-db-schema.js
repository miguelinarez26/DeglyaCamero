import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const PROJECT_REF = 'yqmqzyaqlhgzcbcbintn';
const ACCESS_TOKEN = 'sbp_a75195660f0e7855e461a40170454fab789f52fe';
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

        return await response.json();
    } catch (err) {
        console.error('Query Failed:', err.message);
        return null; // Return null on failure
    }
}

async function checkAndFix() {
    console.log('🔍 Checking if table "guests" exists...');
    const checkSql = `
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'guests';
    `;

    const result = await runQuery(checkSql);

    // The result from SQL API is usually an array of rows, usually [ { table_name: 'guests' } ]
    // or sometimes { result: [...] } depending on endpoint version, but usually array.

    if (Array.isArray(result) && result.length > 0) {
        console.log('✅ Table "guests" FOUND.');
    } else {
        console.error('❌ Table "guests" NOT FOUND. Migration might have failed.');
        console.log('Result was:', JSON.stringify(result, null, 2));

        // If not found, we should re-run the migration code directly here or signal to do so.
        console.log('⚠️ Attempting to create tables again...');
        const migrationPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../supabase/migration_roles_guests.sql');
        const migrationSql = fs.readFileSync(migrationPath, 'utf8');
        await runQuery(migrationSql);
        console.log('✅ Re-migration executed.');
    }

    console.log('🔄 Forcing PostgREST schema cache reload...');
    await runQuery(`NOTIFY pgrst, 'reload config';`);
    console.log('✅ Reload signal sent.');
}

checkAndFix();
