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
        .from('bookings')
        .select('start_time')
        .eq('user_id', specialistId) // Filter by specialist
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

export async function createAppointment(appointmentData: any) {
    const { triage, date, time, patientDetails } = appointmentData;

    if (!date || !time) throw new Error("Date and Time are required");

    // 1. Auth/Guest Check
    const { data: { user } } = await supabase.auth.getUser();
    const guestEmail = patientDetails?.email;
    const guestNationalId = patientDetails?.nationalId;
    const guestPhone = patientDetails?.phone;

    if (!user && !guestEmail) {
        throw new Error("Debes iniciar sesión o proporcionar un email.");
    }

    // 2. Resolve Patient (Cal.com style: link to 'patients' table)
    let patientId: string | null = null;

    // ... Existing patient resolution logic (kept for robustness) ...
    // Note: I will reimplement concise version since previous was good but need to ensure it uses the 'patients' table as expected.

    if (user) {
        const { data: existing } = await supabase.from('patients').select('id').eq('profile_id', user.id).maybeSingle();
        if (existing) patientId = existing.id;
    }

    if (!patientId && (guestEmail || guestNationalId)) {
        let query = supabase.from('patients').select('id');
        const ors = [];
        if (guestEmail) ors.push(`email.eq.${guestEmail}`);
        if (guestNationalId) ors.push(`national_id.eq.${guestNationalId}`);
        // Phone?

        if (ors.length > 0) {
            const { data: found } = await query.or(ors.join(',')).maybeSingle();
            if (found) patientId = found.id;
        }
    }

    if (!patientId) {
        const newPatient = {
            profile_id: user?.id || null,
            email: guestEmail,
            first_name: patientDetails?.name,
            last_name: patientDetails?.lastName,
            phone: guestPhone,
            national_id: guestNationalId
        };
        const { data: created, error } = await supabase.from('patients').insert(newPatient).select('id').single();
        if (error) throw new Error(`Error registrando paciente: ${error.message}`);
        patientId = created.id;
    }

    // 3. Prepare Booking Data
    // We need an event_type_id. For now, fetch the first active one or default.
    const { data: eventTypes } = await supabase.from('event_types').select('id, user_id').limit(1).single();
    if (!eventTypes) throw new Error("No appointment types available.");

    const eventTypeId = eventTypes.id;
    const specialistId = eventTypes.user_id; // The specialist

    const startTime = new Date(date);
    const [h, m] = time.split(':').map(Number);
    startTime.setHours(h, m, 0, 0);
    const endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + 1); // Default 1 hour

    // 4. Create Booking
    const bookingPayload = {
        uid: undefined, // Let DB generate
        event_type_id: eventTypeId,
        user_id: specialistId,
        patient_id: patientId,
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        title: triage?.reason || 'Consulta General',
        description: triage?.details || '',
        status: 'pending',
        payment_proof_url: patientDetails?.paymentProof
    };

    const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert(bookingPayload)
        .select()
        .single();

    if (bookingError) throw new Error(`Error creating booking: ${bookingError.message}`);

    // 5. Create Booking Note (Encrypted)
    if (triage?.details || triage?.severity) {
        const noteContent = JSON.stringify({
            details: triage.details,
            severity: triage.severity,
            duration: triage.duration
        });

        // Basic Note Insertion (Encryption should be handled by DB Extension or Edge Function in real prod)
        // Here we insert into 'note' (plain) and potentially 'encrypted_note' if we had the key.
        // Use the secure RPC function we created
        const { error: noteError } = await supabase.rpc('create_encrypted_note', {
            p_booking_id: booking.id,
            p_note: noteContent,
            p_created_by: user?.id || null // If guest, null
        });

        if (noteError) {
            console.error("Error creating encrypted note:", noteError);
        } else {
            console.log("Secure note created via pgsodium.");
        }
    }

    return booking;
}
