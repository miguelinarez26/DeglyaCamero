
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Load environment variables
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../.env') })

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Error: Missing environment variables VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY')
    process.exit(1)
}

console.log('Connecting to Supabase...')
console.log(`URL: ${supabaseUrl}`)

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function verify() {
    try {
        // Try to select from profiles (might fail due to RLS if unauthenticated, but checks connection)
        // Or check health if possible, but identifying a table existance is good.
        // Since anon key has limited access, we might just check if we can reach the server.
        const { data, error } = await supabase.from('profiles').select('count', { count: 'exact', head: true })

        if (error) {
            // RLS error is expected if no public access, but network error is bad.
            console.log('Query result (expected error if RLS is on):', error.message)
            if (error.code === 'PGRST116' || error.code === '42501' || error.message.includes('permission denied')) {
                console.log('Connection successful! (RLS prevented data access, which is good)')
            } else {
                console.error('Connection verification encountered an issue:', error)
            }
        } else {
            console.log('Connection successful! Profiles table reachable.')
        }

        // Also try auth service
        const { data: authData, error: authError } = await supabase.auth.getSession()
        if (authError) {
            console.error('Auth service check failed:', authError.message)
        } else {
            console.log('Auth service reachable.')
        }

    } catch (err) {
        console.error('Unexpected error during verification:', err)
    }
}

verify()
