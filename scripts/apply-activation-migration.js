import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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

        return await response.json();
    } catch (err) {
        console.error('Query Failed:', err.message);
        throw err;
    }
}

async function applyMigration() {
    try {
        const migrationPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../supabase/migrations/20260126_fix_schema_and_warnings.sql');
        console.log(`Reading migration from: ${migrationPath}`);
        const migrationSql = fs.readFileSync(migrationPath, 'utf8');

        console.log('Applying migration...');
        const result = await runQuery(migrationSql);
        console.log('Migration applied successfully:', JSON.stringify(result, null, 2));

        // Reload schema cache
        console.log('Reloading schema cache...');
        await runQuery(`NOTIFY pgrst, 'reload config';`);
        console.log('Schema cache reloaded.');

    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

applyMigration();
