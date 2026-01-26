import fs from 'fs';
import path from 'path';

// Extracted from previous logs / user provided token
const PROJECT_REF = 'yqmqzyaqlhgzcbcbintn';
const TOKEN = 'sbp_b915095fb1c9fab7425af27f0a6288221f449d94';
const SCHEMA_PATH = path.resolve('supabase/schema.sql');

async function deploy() {
    if (!fs.existsSync(SCHEMA_PATH)) {
        console.error(`Schema file not found at ${SCHEMA_PATH}`);
        process.exit(1);
    }

    console.log(`Reading schema from ${SCHEMA_PATH}...`);
    const sql = fs.readFileSync(SCHEMA_PATH, 'utf8');

    console.log(`Deploying to project ${PROJECT_REF}...`);

    try {
        const response = await fetch(`https://api.supabase.com/v1/projects/${PROJECT_REF}/query`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: sql })
        });

        if (!response.ok) {
            const text = await response.text();
            console.error(`API Error ${response.status}: ${text}`);
            process.exit(1);
        }

        const result = await response.json();
        console.log('✅ Schema executed successfully!');
        // console.log(result); // Result might be empty for DDL
    } catch (err) {
        console.error('Network/Script Error:', err);
        process.exit(1);
    }
}

deploy();
