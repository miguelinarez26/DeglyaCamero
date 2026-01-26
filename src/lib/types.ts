export interface ISecureVault {
  encryptField(text: string, key_id: string): Promise<Buffer>;
  decryptField(encryptedData: Buffer, key_id: string, userToken: string): Promise<string>;
  generateSpecialist2FAToken(specialistId: string): Promise<string>;
}

export interface Appointment {
  id: string;
  patientId?: string;
  specialistId: string;
  startTime: Date;
  endTime: Date;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
}

export interface TimeSlot {
  start: Date;
  end: Date;
}

export interface ICalendarManager {
  syncEvent(event: Appointment): Promise<string>;
  rollbackEvent(eventId: string): Promise<void>;
  checkAvailability(date: Date): Promise<TimeSlot[]>;
}

export type VibeMode = 'clinical_clean' | 'warm_empathy' | 'modern_parallax';

export interface UIConfig {
  mode: VibeMode;
  transitions: 'stiff' | 'fluid';
  glassmorphism: boolean;
}
