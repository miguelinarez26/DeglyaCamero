
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PROJECT_REF = 'yqmqzyaqlhgzcbcbintn';
const ACCESS_TOKEN = 'sbp_b915095fb1c9fab7425af27f0a6288221f449d94';
const API_URL = `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`;

async function runQuery(sql) {
    try {
        console.log('Applying Migration...');
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
            console.log('Result:', JSON.stringify(data, null, 2));
        } catch (e) {
            console.log('Migration applied (no JSON response).');
        }
    } catch (err) {
        console.error('Migration Failed:', err.message);
        process.exit(1);
    }
}

async function apply() {
    const sqlPath = path.join(__dirname, '../supabase/migrations/20260127_enable_real_encryption.sql');
    if (!fs.existsSync(sqlPath)) {
        console.error(`Migration file not found at ${sqlPath}`);
        return;
    }
    const sql = fs.readFileSync(sqlPath, 'utf8');
    await runQuery(sql);
}

apply();
