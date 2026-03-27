import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/backend';
import { Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useUserRole } from '../hooks/useUserRole';

const SetPassword = () => {
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    
    // Traemos el rol para saber a dónde redirigir exactamente
    const { role, user, loading: roleLoading } = useUserRole();
    const [userEmail, setUserEmail] = useState<string | null>(null);

    // Efecto para capturar el email de forma ultra-segura si el hook tarda un segundo
    React.useEffect(() => {
        if (user?.email) {
            setUserEmail(user.email);
        } else {
            // Re-chequeo manual por si las moscas
            supabase.auth.getUser().then(({ data: { user: autoUser } }) => {
                if (autoUser?.email) setUserEmail(autoUser.email);
            });
        }
    }, [user]);

    const handleSetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        if (!user) {
            setError('Sesión expirada o inválida. Por favor, usa el link de invitación nuevamente.');
            return;
        }

        // --- SEGURIDAD: EVITAR SOBREESCRIBIR LA CUENTA ADMIN ---
        if (user.email === 'camerodeglya@gmail.com') {
            setError('ALERTA: Estás intentando cambiar la clave de la ADMINISTRADORA (Deglya) en lugar del paciente. Por favor, usa el botón de "HARD RESET" en el Login antes de usar el link mágico.');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        setLoading(true);

        try {
            const { error: updateError } = await supabase.auth.updateUser({
                password: password
            });

            if (updateError) throw updateError;

            // Esperar un momento para que se asigne el rol si es nuevo
            setTimeout(() => {
                const currentRole = role as any;
                if (currentRole === 'admin' || currentRole === 'receptionist' || currentRole === 'secretary') {
                    navigate('/dashboard/recepcion');
                } else if (currentRole === 'specialist' || currentRole === 'therapist') {
                    navigate('/dashboard/especialista');
                } else {
                    navigate('/dashboard/paciente');
                }
            }, 1000);
            
        } catch (err: any) {
            console.error('Error updating password:', err);
            setError(err.message || 'Hubo un error al guardar tu contraseña.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl shadow-xl w-full max-w-md p-8 border border-stone-100">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-display font-bold text-stone-800 mb-2">Paso Final</h2>
                    <p className="text-stone-500">Crea tu contraseña segura para acceder a tu portal en el futuro.</p>
                </div>

                <form onSubmit={handleSetPassword} className="space-y-6">
                    <div className="space-y-2 mb-4 bg-stone-50 p-4 rounded-xl border border-stone-200">
                        <label className="text-xs font-bold text-stone-500 uppercase tracking-wider italic">Invitación para:</label>
                        <p className="font-bold text-stone-800 break-all text-lg">
                            {userEmail || (roleLoading ? 'Verificando invitación...' : 'Cargando perfil...')}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-stone-700 ml-1">Nueva Contraseña</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-3.5 text-stone-400 w-5 h-5" />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-stone-200 focus:border-[#D96B2F] focus:ring-4 focus:ring-[#D96B2F]/10 outline-none transition-all text-stone-700 font-medium"
                                placeholder="Mínimo 6 caracteres"
                                autoComplete="new-password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-3.5 text-stone-400 hover:text-[#D96B2F] transition-colors"
                            >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <div className="p-3 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100 text-center font-medium">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-stone-900 text-white rounded-xl font-bold hover:bg-stone-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Guardar y Entrar al Portal'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SetPassword;
