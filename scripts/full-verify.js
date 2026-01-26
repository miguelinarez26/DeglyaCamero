
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

async function verifyAll() {
    console.log('🔍 Verifying Supabase Setup...\n');
    let errors = 0;

    // 1. Check Profiles Table & Columns
    try {
        // Try to insert and immediately rollback/delete or just select
        // Since we have no data, select might yield 0 rows but should not error.
        const { data, error } = await supabase.from('profiles').select('id, first_name, last_name_1, role').limit(1);

        if (error) {
            console.error('❌ Table profiles check failed:', error.message);
            errors++;
        } else {
            console.log('✅ Table "profiles" exists and is accessible.');
            // Note: We can't strictly check for column existence without querying information_schema (requires pg connection) 
            // or failing on a select. If previous select didn't fail, columns likely exist.
        }
    } catch (e) {
        console.error('❌ Unexpected error checking profiles:', e.message);
        errors++;
    }

    // 2. Check Storage Bucket
    try {
        const { data, error } = await supabase.storage.getBucket('comprobantes_pago');

        if (error) {
            console.error('❌ Bucket "comprobantes_pago" check failed:', error.message);
            // It might fail if RLS prevents even listing buckets, but getBucket usually works for Service Role
            errors++;
        } else if (data) {
            console.log('✅ Bucket "comprobantes_pago" exists.');
            console.log(`   Public: ${data.public}`);
        } else {
            console.error('❌ Bucket "comprobantes_pago" not found.');
            errors++;
        }
    } catch (e) {
        console.error('❌ Unexpected error checking storage:', e.message);
        errors++;
    }

    console.log('\n---');
    if (errors === 0) {
        console.log('🎉 SYSTEM VERIFIED: All backend components are ready.');
    } else {
        console.log(`⚠️  FOUND ${errors} ISSUES. Please review output.`);
    }
}

verifyAll();
