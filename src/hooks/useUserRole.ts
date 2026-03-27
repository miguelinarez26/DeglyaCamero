import { useEffect, useState, useCallback } from 'react';
import { supabase } from '../lib/backend';
import { Database } from '../types/supabase';

type UserRole = Database['public']['Enums']['user_role'] | 'specialist' | 'secretary' | 'admin' | 'programador';
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

    // --- MODO DEMO / BYPASS ---
    const isDemo = typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('demo') === 'specialist';

    const fetchRoleData = useCallback(async (userId: string) => {
        try {
            // ==========================================
            // OVERRIDE MAESTRO (ADMIN FUNDADORA)
            // ==========================================
            if (userId === 'c4b3e03b-74a2-4408-902a-5a7bc544e454') {
                setRole('admin');
                return;
            }

            // 1. Obtener el perfil para datos estéticos (como nombre)
            const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .maybeSingle();

            if (profileError) throw profileError;

            if (profileData) {
                setProfile(profileData);
            }

            // 2. PRIORIDAD 1: Consultar la tabla user_roles (Staff)
            const { data: userRoleData, error: roleError } = await supabase
                .from('user_roles')
                .select('role')
                .eq('user_id', userId)
                .maybeSingle();

            if (roleError && roleError.code !== '42P01') {
                console.error("Error fetching user_roles:", roleError);
            }

            // Si existe en user_roles, ESE es su rol real
            if (userRoleData && userRoleData.role) {
                setRole(userRoleData.role as UserRole);
                return;
            }

            // 3. PRIORIDAD 2: Rol en la tabla profiles
            if (profileData && profileData.role) {
                setRole(profileData.role as UserRole);
                return;
            }

            // 4. Fallback si no está en ningún lado
            setRole('patient');
        } catch (err: any) {
            console.error('Error fetching role/profile:', err);
            setError(err.message);
        }
    }, []);

    // Initial auth check to cover all Supabase v2 versions reliably
    useEffect(() => {
        let mounted = true;
        if (isDemo) return;
        
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!mounted) return;
            if (session?.user) {
                setUser(session.user);
            } else {
                setLoading(false);
            }
        });
        return () => { mounted = false; };
    }, [isDemo]);

    // Role Fetching Effect - Entirely detached from Auth pipeline
    useEffect(() => {
        if (!user || role !== null) return;
        
        let isActive = true;

        const loadRoles = async () => {
            setLoading(true);
            await fetchRoleData(user.id);
            // Siempre quitar el loading, sin importar qué gane en la condición de montaje
            setLoading(false);
        };

        loadRoles();

        return () => { isActive = false; };
    }, [user, role, fetchRoleData]);

    useEffect(() => {
        let mounted = true;
        if (isDemo) return;

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            console.log('Auth Change Event:', event, ' | Mounted:', mounted);
            if (!mounted) return;

            if (session?.user) {
                setUser(session.user);
                // NOTA VITAL: No usar "await fetchRoleData" aquí.
                // Supabase AuthClient congela "signInWithPassword" si esta función es async y se detiene.
                // El useEffect de arriba detectará que 'user' cambió e iniciará la descarga independientemente.
            } else {
                setUser(null);
                setProfile(null);
                setRole(null);
                if (mounted) setLoading(false);
            }
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, [isDemo]);

    return { user, profile, role, loading, error };
};
