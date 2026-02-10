import { createClient } from '@supabase/supabase-js';
import type { ICalendarManager, UIConfig, Appointment, TimeSlot } from './types';

// Environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
}

// 1. Singleton Supabase Client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 2. Mock Implementations (Placeholders until logic is fully fleshed out)

// --- Security Tool ---
// SecureVault removed in favor of direct pgsodium RPC calls

// --- Calendar Tool ---
class CalendarManagerImpl implements ICalendarManager {
    async syncEvent(event: Appointment): Promise<string> {
        return `gcal_${Date.now()}`;
    }

    async rollbackEvent(eventId: string): Promise<void> {
        console.log(`[Calendar] Rolling back event ${eventId}`);
    }

    async checkAvailability(date: Date): Promise<TimeSlot[]> {
        return [];
    }
}

// --- UI Mutator ---
export const defaultUIConfig: UIConfig = {
    mode: 'clinical_clean',
    transitions: 'fluid',
    glassmorphism: true,
};

// 3. Exported Instances
export const calendarManager = new CalendarManagerImpl();

export async function getSpecialists() {
    // Fetch specialists who have active event types
    // We assume specialists are in 'profiles' or 'auth.users'. 
    // Since 'profiles' is the standard, we'll query that.
    // If 'profiles' doesn't have specialty/full_name, we might need to adjust.
    // Fallback: Query event_types distinct user_id, then get profile?
    // Let's assume 'profiles' exists and has this data.

    // Attempt to fetch from profiles linked to event_types
    const { data, error } = await supabase
        .from('event_types')
        .select(`
            user_id,
            profiles:user_id (
                id,
                full_name,
                specialty,
                avatar_url
            )
        `)
        .eq('active', true);

    if (error) {
        console.error('Error fetching specialists:', error);
        return [];
    }

    // Deduplicate specialists
    const specialists = new Map();
    data.forEach((item: any) => {
        if (item.profiles) {
            specialists.set(item.profiles.id, item.profiles);
        }
    });

    return Array.from(specialists.values());
}

export async function getAvailableSlots(date: Date, specialistId: string): Promise<string[]> {
    if (!date || !specialistId) return [];

    // 1. Get Availability Config
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayIndex = date.getDay(); // 0-6

    const { data: availability, error: availError } = await supabase
        .from('availability')
        .select('*')
        .eq('user_id', specialistId)
        .contains('days', [dayIndex]) // Check if day is working day
        .single();

    if (availError || !availability) {
        // Fallback or No Availability
        console.log('No specific availability found, using default 9-5');
        // We can return validation error "No slots" or default.
        // Let's return default for now to not block UI if table empty.
        // return []; 
    }

    // Default 9-17 if not set
    const startHour = availability ? parseInt(availability.start_time.split(':')[0]) : 9;
    const endHour = availability ? parseInt(availability.end_time.split(':')[0]) : 17;

    const allSlots = [];
    for (let h = startHour; h < endHour; h++) {
        allSlots.push(`${h.toString().padStart(2, '0')}:00`);
    }

    // 2. Get Existing Bookings
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const { data: bookings, error: bookingError } = await supabase
        .from('appointments') // Updated to V5 Table
        .select('start_time')
        // .eq('user_id', specialistId) // Temporarily disabled specialist filter until 'specialist_id' logic is strict
        .gte('start_time', startOfDay.toISOString())
        .lte('start_time', endOfDay.toISOString())
        .neq('status', 'cancelled');

    if (bookingError) {
        console.error('Error fetching bookings:', bookingError);
        return allSlots;
    }

    const bookedTimes = bookings.map((b: any) => {
        const d = new Date(b.start_time);
        return `${d.getHours().toString().padStart(2, '0')}:00`;
    });

    return allSlots.filter(slot => !bookedTimes.includes(slot));
}

// --- 3. Appointment Logic (Hybrid Flow) ---
export async function createAppointment(appointmentData: any) {
    const { triage, date, time, patientDetails } = appointmentData;

    if (!date || !time) throw new Error("Fecha y hora son requeridas.");

    // 1. Identify Actor (User or Guest)
    const { data: { user } } = await supabase.auth.getUser();

    // Guest Data
    const guestEmail = patientDetails?.email;
    const guestName = patientDetails?.name ? `${patientDetails.name} ${patientDetails.lastName || ''}`.trim() : null;
    const guestPhone = patientDetails?.phone;

    if (!user && !guestEmail) {
        throw new Error("Debes proporcionar un email para agendar.");
    }

    // 2. Resolve Patient Identity (The Hybrid Core)
    let patientId: string | null = null;
    const targetEmail = user?.email || guestEmail;

    // A. Check if patient exists by Email
    const { data: existingPatient } = await supabase
        .from('patients')
        .select('id, profile_id')
        .eq('email', targetEmail)
        .maybeSingle();

    if (existingPatient) {
        // Found existing record!
        patientId = existingPatient.id;

        // Linkage opportunity: If user is logged in but patient record has no profile link, link it now.
        if (user && !existingPatient.profile_id) {
            await supabase.from('patients').update({ profile_id: user.id }).eq('id', patientId);
        }
    } else {
        // B. Create New Patient Record via RPC (Secure)
        const { data: newId, error: rpcError } = await supabase.rpc('create_guest_patient', {
            p_email: targetEmail,
            p_full_name: user?.user_metadata?.full_name || guestName,
            p_phone: guestPhone
        });

        if (rpcError) throw new Error(`Error registrando ficha de paciente: ${rpcError.message}`);
        patientId = newId;
    }

    // 3. Prepare Appointment Data
    const startTime = new Date(date);
    const [h, m] = time.split(':').map(Number);
    startTime.setHours(h, m, 0, 0);

    const endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + 1); // Default duration 50-60min

    // 4. Create Appointment
    // 4. Create Appointment
    let booking;

    if (user) {
        // Authenticated User -> Standard Insert (RLS Protected)
        const appointmentPayload = {
            patient_id: patientId,
            service_id: 'initial-interview',
            start_time: startTime.toISOString(),
            end_time: endTime.toISOString(),
            status: 'pending',
            notes: triage ? JSON.stringify(triage) : null
        };

        const { data, error } = await supabase
            .from('appointments')
            .insert(appointmentPayload)
            .select()
            .single();

        if (error) throw error;
        booking = data;

    } else {
        // Guest -> Secure RPC
        const { data: newAptId, error: rpcError } = await supabase.rpc('create_guest_appointment', {
            p_patient_id: patientId,
            p_service_id: 'initial-interview',
            p_start_time: startTime.toISOString(),
            p_end_time: endTime.toISOString(),
            p_notes: triage ? JSON.stringify(triage) : null
        });

        if (rpcError) throw rpcError;
        booking = { id: newAptId };

        // 5. INVISIBLE REGISTRATION (The Magic)
        // Auto-invite user to create account via Magic Link
        if (!user && guestEmail) {
            console.log(`✨ Initiating Invisible Registration for ${guestEmail}`);
            const { error: otpError } = await supabase.auth.signInWithOtp({
                email: guestEmail,
                options: {
                    // Redirect to Activate Account page where they set password
                    emailRedirectTo: `${window.location.origin}/activar-cuenta/success`
                }
            });

            if (otpError) {
                console.warn("⚠️ Magic Link sending failed:", otpError.message);
                // Non-blocking: Booking succeeded, just the invite failed.
            }
        }
    }

    return booking;
}
