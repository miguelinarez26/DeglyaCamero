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

async function checkSchema() {
    const sql = `
        SELECT column_name, is_nullable, data_type
        FROM information_schema.columns 
        WHERE table_schema = 'public' 
        AND table_name = 'patients';
    `;
    const result = await runQuery(sql);
    console.log(JSON.stringify(result, null, 2));
}

checkSchema();
