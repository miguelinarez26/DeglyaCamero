import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthCore from "../components/auth/AuthCore";
import { useUserRole } from "../hooks/useUserRole";
import { Loader2 } from "lucide-react";
import { supabase } from "../lib/backend";

/**
 * Portal de Seguridad Deglya Camero (V2 - Anti-Cache)
 */
const SecurityPortal = () => {
    const navigate = useNavigate();
    const { user, role, loading, error } = useUserRole();

    useEffect(() => {
        if (user && !loading && role) {
            const currentRole = role;
            if (currentRole === 'patient') {
                navigate('/dashboard/paciente');
            } else if (currentRole === 'specialist' || currentRole === 'therapist') {
                navigate('/dashboard/especialista');
            } else if (['receptionist', 'admin', 'secretary'].includes(currentRole)) {
                navigate('/dashboard/recepcion');
            } else if (currentRole === 'programador') {
                navigate('/dashboard/recepcion'); 
            } else {
                navigate('/dashboard/paciente');
            }
        }
    }, [user, role, loading, navigate]);

    return (
        <div className="min-h-screen bg-deglya-charcoal flex items-center justify-center p-4 relative overflow-hidden">
            <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-deglya-teal/10 rounded-full blur-[120px] animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[120px]" />

            <div className="w-full max-w-md relative z-10">
                <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden">
                    <div className="p-1">
                        <AuthCore
                            onBack={() => navigate('/')}
                            onSuccess={() => console.log("Security Access Granted.")}
                        />
                    </div>
                </div>

                {user && !role && loading && (
                    <div className="mt-8 flex flex-col items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
                        <Loader2 className="h-6 w-6 text-deglya-teal animate-spin" />
                        <p className="text-deglya-gray-light text-sm font-sans tracking-wide uppercase">
                            Configurando tu espacio...
                        </p>
                    </div>
                )}

                {error && !loading && (
                    <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-200 text-sm text-center">
                        Hubo un problema al verificar tus permisos: {error}
                    </div>
                )}

                <div className="mt-8 text-center">
                    <p className="text-white/30 text-xs font-sans tracking-widest uppercase mb-4">
                        Centro de Especialidades Deglya Camero
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SecurityPortal;
