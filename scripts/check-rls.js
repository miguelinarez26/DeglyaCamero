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
        console.log(JSON.stringify(data, null, 2));
    } catch (err) {
        console.error('Query Failed:', err.message);
    }
}

const sql = `
select
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
from
  pg_policies
where
  tablename = 'patients';
`;

runQuery(sql);
