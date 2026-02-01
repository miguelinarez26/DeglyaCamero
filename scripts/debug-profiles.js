
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

async function debug() {
    console.log("1. Listing all public tables...");
    const tables = await runQuery("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    console.log("Tables:", JSON.stringify(tables, null, 2));

    console.log("2. Checking 'profiles' specifically...");
    const profileCheck = await runQuery("SELECT * FROM information_schema.tables WHERE table_name = 'profiles'");
    console.log("Profile check:", JSON.stringify(profileCheck, null, 2));

    console.log("3. Attempting simple select...");
    try {
        const result = await runQuery("SELECT count(*) FROM public.profiles");
        console.log("Select result:", JSON.stringify(result, null, 2));
    } catch (e) {
        console.error("Select failed:", e);
    }
}

debug();
