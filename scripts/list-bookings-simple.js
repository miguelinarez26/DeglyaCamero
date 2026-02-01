
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
            console.log("No JSON result.");
            return null;
        }
    } catch (err) {
        console.error('Query Failed:', err.message);
        process.exit(1);
    }
}

async function checkBookings() {
    console.log("Checking plain bookings table...");
    const bookings = await runQuery("SELECT * FROM bookings");
    console.log(JSON.stringify(bookings, null, 2));
}

checkBookings();
