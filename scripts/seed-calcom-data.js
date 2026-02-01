
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PROJECT_REF = 'yqmqzyaqlhgzcbcbintn';
const ACCESS_TOKEN = 'sbp_b915095fb1c9fab7425af27f0a6288221f449d94';
const API_URL = `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`;

async function runQuery(sql) {
    try {
        console.log('Executing SQL...');
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

async function seed() {
    // 1. Get a user
    const usersResult = await runQuery("SELECT id FROM auth.users LIMIT 1");

    if (!usersResult || usersResult.length === 0) {
        console.error("No users found in auth.users to seed data for.");
        return;
    }

    const userId = usersResult[0].id;
    console.log(`Seeding data for User ID: ${userId}`);

    // 2. Insert Event Type
    const insertEventTypeSql = `
        INSERT INTO event_types (title, slug, length, description, user_id, active)
        VALUES (
            'Consulta Inicial', 
            'consulta-inicial', 
            60, 
            'Sesión de diagnóstico y planificación.', 
            '${userId}', 
            true
        )
        ON CONFLICT (slug) DO NOTHING
        RETURNING id;
    `;

    const eventTypeResult = await runQuery(insertEventTypeSql);
    // If we just inserted or if it existed, we need the ID. 
    // If ON CONFLICT DO NOTHING returned nothing, fetch it.

    let eventTypeId;
    if (eventTypeResult && eventTypeResult.length > 0) {
        eventTypeId = eventTypeResult[0].id;
    } else {
        const fetchEt = await runQuery("SELECT id FROM event_types WHERE slug = 'consulta-inicial'");
        if (fetchEt && fetchEt.length > 0) eventTypeId = fetchEt[0].id;
    }

    if (!eventTypeId) {
        console.error("Failed to get event type ID");
        return;
    }
    console.log(`Event Type ID: ${eventTypeId}`);

    // 3. Insert Availability (Mon-Fri, 9-17)
    // days: 1,2,3,4,5
    // user_id check

    const insertAvailSql = `
        INSERT INTO availability (user_id, event_type_id, days, start_time, end_time)
        SELECT '${userId}', ${eventTypeId}, ARRAY[1,2,3,4,5], '09:00:00', '17:00:00'
        WHERE NOT EXISTS (
            SELECT 1 FROM availability WHERE user_id = '${userId}' AND event_type_id = ${eventTypeId}
        );
    `;

    await runQuery(insertAvailSql);
    console.log("Availability seeded.");
}

seed();
