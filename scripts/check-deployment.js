import fs from 'fs';
import path from 'path';

const PROJECT_REF = 'yqmqzyaqlhgzcbcbintn';
const TOKEN = 'sbp_b915095fb1c9fab7425af27f0a6288221f449d94';

async function check() {
    // Check for the specific columns we added to verify migration success
    const query = "SELECT column_name FROM information_schema.columns WHERE table_name = 'profiles' AND column_name IN ('first_name', 'last_name_1');";
    console.log(`Checking deployment on ${PROJECT_REF}...`);

    try {
        const response = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/query`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        });

        if (!response.ok) {
            const text = await response.text();
            console.log(`Check Failed: ${response.status} - ${text}`);
            return;
        }

        const result = await response.json();
        console.log('Columns Found:', JSON.stringify(result, null, 2));
    } catch (err) {
        console.error('Error:', err);
    }
}

check();
