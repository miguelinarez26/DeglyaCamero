
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

async function ensureUsers() {
    console.log("Checking Specialist: Deglya Camero...");

    // First, check what columns "profiles" actually has
    const columns = await runQuery("SELECT column_name FROM information_schema.columns WHERE table_name = 'profiles'");
    const columnNames = columns.map(c => c.column_name);
    console.log("Profiles Table Columns:", columnNames);

    const hasFullName = columnNames.includes('full_name');

    // Check if user exists in auth.users
    const users = await runQuery("SELECT id FROM auth.users LIMIT 1");
    if (!users || users.length === 0) {
        console.error("No auth users found! Cannot create profile.");
        return;
    }
    const specialistId = users[0].id;

    // Check if profile exists
    const profile = await runQuery(`SELECT * FROM public.profiles WHERE id = '${specialistId}'`);

    if (profile && profile.length > 0) {
        console.log("Specialist profile exists.");
        // Update if needed
        if (hasFullName) {
            await runQuery(`UPDATE public.profiles SET full_name = 'Deglya Camero' WHERE id = '${specialistId}'`);
        } else if (columnNames.includes('first_name') && columnNames.includes('last_name')) {
            await runQuery(`UPDATE public.profiles SET first_name = 'Deglya', last_name = 'Camero' WHERE id = '${specialistId}'`);
        }
    } else {
        console.log("Creating Deglya profile...");
        let insertFields = 'id';
        let insertValues = `'${specialistId}'`;

        if (hasFullName) {
            insertFields += ', full_name';
            insertValues += ", 'Deglya Camero'";
        } else if (columnNames.includes('first_name')) {
            insertFields += ', first_name, last_name';
            insertValues += ", 'Deglya', 'Camero'";
        }

        if (columnNames.includes('specialty')) {
            insertFields += ', specialty';
            insertValues += ", 'Psicóloga Clínica'";
        }

        if (columnNames.includes('role')) {
            insertFields += ', role';
            insertValues += ", 'specialist'";
        }

        await runQuery(`INSERT INTO public.profiles (${insertFields}) VALUES (${insertValues})`);
        console.log("Deglya profile created.");
    }

    console.log("Checking Patient: Miguel Linarez Lamas...");
    const miguel = await runQuery("SELECT * FROM public.patients WHERE email = 'miguelinarez626@gmail.com'");

    if (miguel && miguel.length > 0) {
        console.log("Patient found:", miguel[0].first_name);
    } else {
        console.log("Patient not found. Creating Miguel...");
        await runQuery(`
            INSERT INTO public.patients (first_name, last_name, email, phone)
            VALUES ('Miguel', 'Linarez Lamas', 'miguelinarez626@gmail.com', '555-1234')
        `);
        console.log("Patient Miguel created.");
    }
}

ensureUsers();
