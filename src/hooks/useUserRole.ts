import { useEffect, useState } from 'react';
import { supabase } from '../lib/backend';
import { Database } from '../types/supabase';

type UserRole = Database['public']['Enums']['user_role'];
type Profile = Database['public']['Tables']['profiles']['Row'];

export interface UserContext {
    user: any | null; // Supabase auth user
    profile: Profile | null;
    role: UserRole | null;
    loading: boolean;
    error: string | null;
}

export const useUserRole = (): UserContext => {
    const [user, setUser] = useState<any | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [role, setRole] = useState<UserRole | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // 1. Check active session
        const checkSession = async () => {
            try {
                const { data: { session }, error: sessionError } = await supabase.auth.getSession();

                if (sessionError) throw sessionError;

                if (session?.user) {
                    setUser(session.user);

                    // 2. Fetch Profile to get Role
                    const { data: profileData, error: profileError } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', session.user.id)
                        .single();

                    if (profileError) {
                        // Handle case where auth exists but profile doesn't (should be rare with triggers)
                        console.error('Error fetching profile:', profileError);
                        setError('Error al cargar perfil de usuario.');
                    } else {
                        setProfile(profileData);
                        setRole(profileData.role);
                    }
                }
            } catch (err: any) {
                console.error('Auth Check Error:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        checkSession();

        // 3. Listen for changes (Login/Logout)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
            if (session?.user) {
                setUser(session.user);
                setLoading(true); // Re-fetch profile on new login
                const { data } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();
                setProfile(data);
                setRole(data?.role || null);
                setLoading(false);
            } else {
                setUser(null);
                setProfile(null);
                setRole(null);
                setLoading(false);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return { user, profile, role, loading, error };
};
