
import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const DB_CONFIG = {
    connectionString: `postgresql://postgres:${encodeURIComponent('1923.Carmi@')}@[2600:1f13:838:6e09:c3a:2acd:3f2f:57f9]:5432/postgres`,
    ssl: { rejectUnauthorized: false } // Required for Supabase connections
};

const MIGRATION_FILE = path.join(__dirname, '../supabase/migrations/20240505160000_initial_schema.sql');

async function migrate() {
    const client = new pg.Client(DB_CONFIG);

    try {
        console.log('🔌 Connecting to database...');
        await client.connect();
        console.log('✅ Connected.');

        console.log(`📖 Reading migration file: ${MIGRATION_FILE}`);
        const sql = fs.readFileSync(MIGRATION_FILE, 'utf8');

        console.log('🚀 Executing migration...');
        await client.query(sql);

        console.log('✅ Migration applied successfully!');

    } catch (err) {
        console.error('❌ Migration failed:', err);
    } finally {
        await client.end();
        console.log('🔌 Disconnected.');
    }
}

migrate();
