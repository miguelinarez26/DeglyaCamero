import { fileURLToPath } from 'url';

const PROJECT_REF = 'yqmqzyaqlhgzcbcbintn';
const ACCESS_TOKEN = 'sbp_b915095fb1c9fab7425af27f0a6288221f449d94';
const API_URL = `https://api.supabase.com/v1/projects/${PROJECT_REF}/database/query`;

async function runQuery(sql) {
    console.log(`Executing: ${sql.substring(0, 50)}...`);
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

        const data = await response.json();
        console.log('Success.');
        return data;
    } catch (err) {
        console.error('Query Failed:', err.message);
        // Don't exit, just log
    }
}

async function run() {
    const statements = [
        "ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS first_name text;",
        "ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS last_name text;",
        "ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS phone text;",
        "ALTER TABLE public.patients ADD COLUMN IF NOT EXISTS national_id text;",
        "ALTER FUNCTION public.handle_new_user() SET search_path = public;",
        "ALTER FUNCTION public.is_admin_or_specialist() SET search_path = public;",
        "ALTER FUNCTION public.is_role(text) SET search_path = public;",
        "ALTER FUNCTION public.is_programador() SET search_path = public;",
        "NOTIFY pgrst, 'reload config';"
    ];

    for (const sql of statements) {
        await runQuery(sql);
    }
}

run();
