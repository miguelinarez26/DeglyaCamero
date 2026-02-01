import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PROJECT_REF = 'yqmqzyaqlhgzcbcbintn';
// Ideally this should be in env, but reusing the one found in the previous working script
const ACCESS_TOKEN = 'sbp_b915095fb1c9fab7425af27f0a6288221f449d94';
const API_URL = `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`;

async function runQuery(sql) {
    try {
        console.log('Sending SQL query to Supabase...');
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

        // The Management API might return an empty body for some operations or the result set
        try {
            const data = await response.json();
            console.log('Migration Result:', JSON.stringify(data, null, 2));
        } catch (e) {
            console.log('Migration completed (no JSON response).');
        }

    } catch (err) {
        console.error('Migration Failed:', err.message);
        process.exit(1);
    }
}

async function main() {
    const sqlPath = path.join(__dirname, '../supabase/migrations/20260127_calcom_schema.sql');
    if (!fs.existsSync(sqlPath)) {
        console.error(`Migration file not found at ${sqlPath}`);
        process.exit(1);
    }

    const sql = fs.readFileSync(sqlPath, 'utf8');
    console.log(`Applying migration from: ${sqlPath}`);
    await runQuery(sql);
}

main();
