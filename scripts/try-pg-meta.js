
import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const PROJECT_URL = process.env.VITE_SUPABASE_URL;

async function tryPgMeta() {
    const sql = fs.readFileSync(path.resolve('supabase/schema.sql'), 'utf8');

    // Construct pg-meta URL (common pattern)
    // Sometimes it is at /pg-meta or /api/pg-meta
    const endpoints = [
        `${PROJECT_URL}/pg-meta/default/query`,
        `${PROJECT_URL}/api/pg-meta/default/query`
    ];

    for (const url of endpoints) {
        console.log(`Trying ${url}...`);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': SERVICE_KEY,
                    'Authorization': `Bearer ${SERVICE_KEY}`
                },
                body: JSON.stringify({ query: sql })
            });

            if (response.ok) {
                const result = await response.json();
                console.log('✅ SUCCESS! Executed via pg-meta.');
                console.log(result);
                return;
            } else {
                console.log(`Failed ${response.status}: ${await response.text()}`);
            }
        } catch (e) {
            console.log(`Error hitting ${url}:`, e.message);
        }
    }
}

tryPgMeta();
