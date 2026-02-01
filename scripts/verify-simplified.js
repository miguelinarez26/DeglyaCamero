
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

async function verify() {
    console.log("1. Event Types:");
    const events = await runQuery("SELECT * FROM public.event_types");
    console.log(JSON.stringify(events, null, 2));

    console.log("2. Profiles:");
    const profiles = await runQuery("SELECT * FROM public.profiles");
    console.log(JSON.stringify(profiles, null, 2));

    console.log("3. Join Test:"); // simplified
    const joinSql = `
        SELECT e.id, e.user_id, p.id as profile_id
        FROM public.event_types e 
        JOIN public.profiles p ON e.user_id = p.id
    `;
    try {
        const joinResult = await runQuery(joinSql);
        console.log("Join Result:", JSON.stringify(joinResult, null, 2));
    } catch (e) {
        console.error("Join failed:", e);
    }
}

verify();
