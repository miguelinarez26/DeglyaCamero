import { createClient } from '@supabase/supabase-js'

// Variables de entorno cargadas desde .env
const supabaseUrl = "https://kzoapszbctymrheexslh.supabase.co"
const supabaseAnonKey = "sb_publishable_Zw9ToXOfWCcoyC1-wW4u0A_M0642YV_"

// --- CLEAN SLATE LOGIC (Anti-Despelote) ---
// Si venimos de un link, limpiamos el localStorage ANTES de inicializar Supabase
if (typeof window !== 'undefined') {
    const hash = window.location.hash;
    const isInviteIntent = hash.includes('access_token') || hash.includes('type=invite') || hash.includes('type=recovery');
    if (isInviteIntent) {
        console.warn("[SB CLIENT] Invitación detectada. Limpiando memoria para evitar choques...");
        localStorage.removeItem('sb-kzoapszbctymrheexslh-auth-token');
    }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
