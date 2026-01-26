
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

async function checkTables() {
    console.log('Checking for profiles table...');
    // Try to select from profiles. If table missing, it will error.
    const { data, error } = await supabase.from('profiles').select('id').limit(1);

    if (error) {
        console.log('Result:', error.message); // likely "relation ... does not exist"
    } else {
        console.log('✅ Table profiles exists!');
    }
}

checkTables();
