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

        const data = await response.json();
        console.log('Query successful:', JSON.stringify(data, null, 2));
        return data;
    } catch (err) {
        console.error('Query Failed:', err.message);
        process.exit(1);
    }
}

const sql = `
-- 1. Add missing columns to patients table
ALTER TABLE public.patients 
ADD COLUMN IF NOT EXISTS first_name text,
ADD COLUMN IF NOT EXISTS last_name text,
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS national_id text;

-- 2. Fix Function Search Paths (Security Warning)
ALTER FUNCTION public.handle_new_user() SET search_path = public;
ALTER FUNCTION public.is_admin_or_specialist() SET search_path = public;
ALTER FUNCTION public.is_role(text) SET search_path = public;
ALTER FUNCTION public.is_programador() SET search_path = public;

-- 3. Reload Config
NOTIFY pgrst, 'reload config';
`;

runQuery(sql);
