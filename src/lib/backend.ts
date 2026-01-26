import { createClient } from '@supabase/supabase-js';
import type { ISecureVault, ICalendarManager, UIConfig, Appointment, TimeSlot } from './types';

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
class SecureVaultImpl implements ISecureVault {
    async encryptField(text: string, key_id: string): Promise<Buffer> {
        // In reality, call a Supabase Edge Function or use a client-side library if appropriate (but better server-side)
        // For now, we simulate encryption
        console.log(`[SecureVault] Encrypting with key ${key_id}`);
        return Buffer.from(`ENCRYPTED[${text}]`);
    }

    async decryptField(encryptedData: Buffer, key_id: string, userToken: string): Promise<string> {
        console.log(`[SecureVault] Decrypting with key ${key_id}`);
        return encryptedData.toString().replace('ENCRYPTED[', '').replace(']', '');
    }

    async generateSpecialist2FAToken(specialistId: string): Promise<string> {
        console.log(`[SecureVault] Sending 2FA to specialist ${specialistId}`);
        return "123456";
    }
}

// --- Calendar Tool ---
class CalendarManagerImpl implements ICalendarManager {
    async syncEvent(event: Appointment): Promise<string> {
        console.log(`[Calendar] Syncing event:`, event);
        return `gcal_${Date.now()}`;
    }

    async rollbackEvent(eventId: string): Promise<void> {
        console.log(`[Calendar] Rolling back event ${eventId}`);
    }

    async checkAvailability(date: Date): Promise<TimeSlot[]> {
        // Return dummy slots
        return [
            { start: new Date(date.setHours(9, 0)), end: new Date(date.setHours(10, 0)) },
            { start: new Date(date.setHours(14, 0)), end: new Date(date.setHours(15, 0)) },
        ];
    }
}

// --- UI Mutator ---
export const defaultUIConfig: UIConfig = {
    mode: 'clinical_clean',
    transitions: 'fluid',
    glassmorphism: true,
};

// 3. Exported Instances
export const secureVault = new SecureVaultImpl();
export const calendarManager = new CalendarManagerImpl();

export async function getSpecialists() {
    const { data, error } = await supabase
        .from('specialists')
        .select('id, full_name, specialty');

    if (error) {
        console.error('Error fetching specialists:', error);
        return [];
    }

    return data;
}

export async function getAvailableSlots(date: Date, specialistId: string): Promise<string[]> {
    if (!date || !specialistId) return [];

    // Define working hours/slots (could be dynamic based on specialist)
    const allSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

    // Start and End of the selected day in UTC
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const { data: appointments, error } = await supabase
        .from('appointments')
        .select('start_time')
        .eq('specialist_id', specialistId)
        .gte('start_time', startOfDay.toISOString())
        .lte('start_time', endOfDay.toISOString())
        .neq('status', 'cancelled');

    if (error) {
        console.error('Error checking availability:', error);
        return allSlots; // Fallback to all slots if error, or handle differently
    }

    // Filter out booked slots
    // Assuming start_time is stored in UTC. We need to match the time part.
    // This simple logic assumes appointments align exactly with slots.
    const bookedTimes = appointments.map(app => {
        const appDate = new Date(app.start_time);
        // Format to HH:00. Note: This depends on timezone handling.
        // For simplicity, we'll just use getHours().
        const hours = appDate.getHours().toString().padStart(2, '0');
        return `${hours}:00`;
    });

    return allSlots.filter(slot => !bookedTimes.includes(slot));
}

export async function createAppointment(appointmentData: any) {
    const { triage, date, time, patientDetails } = appointmentData;

    if (!date || !time) throw new Error("Date and Time are required");

    // 1. Validate Authentication (Guests must sign up first)
    // We removed 'create_guest_secure' RPC to enforce strict Auth flow.
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("Debes iniciar sesión o registrarte para agendar una cita.");
    }

    // Guest logic is deprecated favor of real profiles
    const guestId = null;


    // 2. Resolve Specialist (For Triage, we might auto-assign or need a 'Triage' specialist)
    // Since schema requires specialist_id, we'll fetch the first available one for now as a 'Lead'.
    // In a real app, you might have a specific ID for 'Unassigned' or pool.
    const { data: specialists } = await getSpecialists();
    const assignedSpecialistId = specialists[0]?.id;

    if (!assignedSpecialistId) throw new Error("No specialists available to assign.");

    // 3. Construct Timestamps
    const startTime = new Date(date);
    const [hours, minutes] = time.split(':').map(Number);
    startTime.setHours(hours, minutes, 0, 0);

    const endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + 1);

    // 4. Create Appointment
    // User is already validated above


    const payload = {
        specialist_id: assignedSpecialistId, // Auto-assigned for triage
        start_time: startTime.toISOString(),
        end_time: endTime.toISOString(),
        status: 'pending',
        patient_id: user?.id || null, // Null if guest
        guest_id: guestId,
        triage_notes: JSON.stringify(triage), // Store triage info
    };

    const { data, error } = await supabase
        .from('appointments')
        .insert([payload])
        .select()
        .single();

    if (error) {
        console.error("Error creating appointment:", error);
        throw error;
    }
    return data;
}
