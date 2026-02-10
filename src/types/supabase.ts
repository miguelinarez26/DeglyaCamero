export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            appointments: {
                Row: {
                    id: string
                    patient_id: string
                    service_id: string
                    start_time: string
                    end_time: string
                    status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
                    meeting_link: string | null
                    notes: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    patient_id: string
                    service_id: string
                    start_time: string
                    end_time: string
                    status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
                    meeting_link?: string | null
                    notes?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    patient_id?: string
                    service_id?: string
                    start_time?: string
                    end_time?: string
                    status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
                    meeting_link?: string | null
                    notes?: string | null
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "appointments_patient_id_fkey"
                        columns: ["patient_id"]
                        referencedRelation: "patients"
                        referencedColumns: ["id"]
                    },
                    {
                        foreignKeyName: "appointments_service_id_fkey"
                        columns: ["service_id"]
                        referencedRelation: "services"
                        referencedColumns: ["id"]
                    }
                ]
            }
            patients: {
                Row: {
                    id: string
                    profile_id: string | null
                    email: string | null
                    full_name: string | null
                    phone: string | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    profile_id?: string | null
                    email?: string | null
                    full_name?: string | null
                    phone?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    profile_id?: string | null
                    email?: string | null
                    full_name?: string | null
                    phone?: string | null
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "patients_profile_id_fkey"
                        columns: ["profile_id"]
                        referencedRelation: "profiles"
                        referencedColumns: ["id"]
                    }
                ]
            }
            profiles: {
                Row: {
                    id: string
                    email: string
                    full_name: string | null
                    role: 'patient' | 'specialist' | 'admin'
                    avatar_url: string | null
                    created_at: string
                }
                Insert: {
                    id: string
                    email: string
                    full_name?: string | null
                    role?: 'patient' | 'specialist' | 'admin'
                    avatar_url?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    email?: string
                    full_name?: string | null
                    role?: 'patient' | 'specialist' | 'admin'
                    avatar_url?: string | null
                    created_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "profiles_id_fkey"
                        columns: ["id"]
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
            services: {
                Row: {
                    id: string
                    title: string
                    description: string | null
                    price: number
                    duration_min: number
                    category: string | null
                    is_active: boolean
                }
                Insert: {
                    id: string
                    title: string
                    description?: string | null
                    price: number
                    duration_min: number
                    category?: string | null
                    is_active?: boolean
                }
                Update: {
                    id?: string
                    title?: string
                    description?: string | null
                    price?: number
                    duration_min?: number
                    category?: string | null
                    is_active?: boolean
                }
                Relationships: []
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            appointment_status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
            user_role: 'patient' | 'specialist' | 'admin'
        }
    }
}
