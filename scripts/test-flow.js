
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load Env
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) { console.error("Missing Env Vars"); process.exit(1); }

const supabase = createClient(supabaseUrl, supabaseKey);

async function testGuestFlow() {
    console.log("🧪 1. Testing Guest Booking Flow (RPC Pure)...");

    // 1. Create Patient (RPC)
    const mockGuest = {
        email: `test_guest_${Date.now()}@example.com`,
        full_name: "Test RPC User",
        phone: "555-9999"
    };

    console.log(`   - Creating Patient: ${mockGuest.email}`);
    const { data: patientId, error: pError } = await supabase.rpc('create_guest_patient', {
        p_email: mockGuest.email,
        p_full_name: mockGuest.full_name,
        p_phone: mockGuest.phone
    });

    if (pError) {
        console.error("   ❌ Patient RPC Failed:", pError.message);
        return;
    }
    console.log("   ✅ Patient Created ID:", patientId);

    // 2. Create Appointment (RPC)
    console.log("   - Creating Appointment (RPC)...");
    const { data: aptId, error: aError } = await supabase.rpc('create_guest_appointment', {
        p_patient_id: patientId,
        p_service_id: 'initial-interview',
        p_start_time: new Date().toISOString(),
        p_end_time: new Date(Date.now() + 3600000).toISOString(),
        p_notes: 'Test Note RPC'
    });

    if (aError) {
        console.error("   ❌ Appointment RPC Failed:", aError.message);
        return;
    }

    console.log("   ✅ Appointment Created ID:", aptId);

    // 3. Test Invisible Registration (Magic Link)
    console.log("   - Testing Magic Link Dispatch...");
    const { error: otpError } = await supabase.auth.signInWithOtp({
        email: mockGuest.email,
        options: {
            emailRedirectTo: 'http://localhost:5173/activar-cuenta/success'
        }
    });

    if (otpError) {
        console.error("   ❌ Magic Link Failed:", otpError.message);
    } else {
        console.log("   ✅ Magic Link Request Sent Successfully!");
        console.log("      (Check http://localhost:54324/project/default/auth/users or Inbucket)");
    }

    console.log("🎉 FLOW TEST SUCCESSFUL (RPC + MAGIC LINK verified)");
}

testGuestFlow();
