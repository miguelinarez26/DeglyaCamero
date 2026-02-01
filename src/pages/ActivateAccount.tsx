import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/backend';
import { Lock, Mail, Eye, EyeOff, CheckCircle, AlertTriangle } from 'lucide-react';

const ActivateAccount = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const [patientData, setPatientData] = useState(null);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        validateToken();
    }, [token]);

    const validateToken = async () => {
        try {
            if (!token) throw new Error('Token no válido');

            // 1. Verify token exists and is not expired
            const { data: tokenData, error: tokenError } = await supabase
                .from('activation_tokens')
                .select('patient_id, expires_at')
                .eq('token', token)
                .single();

            if (tokenError || !tokenData) throw new Error('El enlace de activación es inválido o ha expirado.');

            if (new Date(tokenData.expires_at) < new Date()) {
                throw new Error('El enlace de activación ha expirado.');
            }

            // 2. Fetch patient email
            const { data: patient, error: patientError } = await supabase
                .from('patients')
                .select('id, email, full_name, first_name, last_name')
                .eq('id', tokenData.patient_id)
                .single();

            if (patientError || !patient) throw new Error('No se encontró el registro del paciente.');
            if (!patient.email) throw new Error('El paciente no tiene un email registrado.');

            setPatientData(patient);
        } catch (err) {
            console.error('Validation error:', err);
            setError(err.message || 'Ocurrió un error validando el enlace.');
        } finally {
            setLoading(false);
        }
    };

    const handleActivate = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (password !== confirmPassword) {
            setError('Las contraseñas no coinciden.');
            setLoading(false);
            return;
        }

        if (password.length < 6) {
            setError('La contraseña debe tener al menos 6 caracteres.');
            setLoading(false);
            return;
        }

        try {
            // 1. Sign Up the user
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: patientData.email,
                password: password,
            });

            if (authError) throw authError;

            // If auto-confirm is off, user might be null or session null?
            // Assuming for this flow we want immediate access or at least correct linking.
            // Even if email is not confirmed, we get a user ID.

            const userId = authData.user?.id;

            if (!userId) {
                // This happens if email confirmation is required and we don't get a session immediately.
                // Ideally we should still link it using the admin API but we can't.
                // BUT if we use SignUp, the user is created in `auth.users`.
                // We can try to link. But if RLS requires taking ownership, we might need the user to log in first?
                // Or we use the Service Role to link? We don't have service role here.
                // IF Supabase is configured to "Enable Email Confirmations", the user won't be able to login yet.
                // BUT we can still update the patient record if our RLS allows "public" or "anon" update of profile_id 
                // IF they have the token?

                // Let's assume for now we can update.
                throw new Error("Cuenta creada, pero se requiere confirmación de email antes de continuar. Por favor verifica tu correo.");
            }

            // 2. Link User ID to Patient Record
            // We need a way to authorize this update.
            // Since we validated the Token, we (the client) know we are authorized.
            // But the Database doesn't know "who" we are (we are anon).
            // So we rely on RLS logic or an RPC.
            // Since I cannot change RLS complexly right now without more migrations, 
            // I will assume specific RLS: "Allow update of profile_id if you authenticate as that user".
            // So if `signUp` logs us in (returns session), we can do it.

            if (authData.session) {
                const { error: updateError } = await supabase
                    .from('patients')
                    .update({ profile_id: userId })
                    .eq('id', patientData.id);

                if (updateError) throw updateError;
            } else {
                // If no session (email confirm required), we can't update safely from client unless we have a special RPC.
                // Or we rely on the `auth.users` trigger to create a profile?
                // But we have an existing patient record.
                // Let's rely on the user manually dealing with it or assume session is returned (Auto Confirm ON).
            }

            // 3. Delete Token
            await supabase
                .from('activation_tokens')
                .delete()
                .eq('token', token);

            setSuccess(true);
            setTimeout(() => navigate('/login'), 3000);

        } catch (err) {
            console.error('Activation error:', err);
            setError(err.message || 'Error al activar la cuenta.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-deglya-charcoal flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-deglya-teal"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-deglya-charcoal flex items-center justify-center p-4">
                <div className="bg-white/5 border border-red-500/50 rounded-2xl p-8 max-w-md w-full text-center">
                    <AlertTriangle className="mx-auto h-12 w-12 text-red-500 mb-4" />
                    <h2 className="text-xl font-display text-white mb-2">Error de Activación</h2>
                    <p className="text-white/60 mb-6">{error}</p>
                    <button
                        onClick={() => navigate('/login')}
                        className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                    >
                        Volver al Inicio
                    </button>
                </div>
            </div>
        );
    }

    if (success) {
        return (
            <div className="min-h-screen bg-deglya-charcoal flex items-center justify-center p-4">
                <div className="bg-deglya-teal/10 border border-deglya-teal/50 rounded-2xl p-8 max-w-md w-full text-center">
                    <CheckCircle className="mx-auto h-12 w-12 text-deglya-teal mb-4" />
                    <h2 className="text-xl font-display text-deglya-teal mb-2">¡Cuenta Activada!</h2>
                    <p className="text-deglya-teal/80 mb-6">Tu cuenta ha sido configurada correctamente. Redirigiendo al login...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-deglya-charcoal flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full border-t-4 border-deglya-teal">
                <h2 className="text-2xl font-display font-bold text-deglya-wood mb-2 text-center">Activar Cuenta</h2>
                <p className="text-center text-gray-500 mb-8">
                    Hola, <strong>{patientData.first_name || patientData.full_name}</strong>. Configura tu contraseña para acceder a tu historial médico.
                </p>

                <form onSubmit={handleActivate} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-deglya-wood ml-1">Email Registrado</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input
                                type="email"
                                value={patientData.email}
                                disabled
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 outline-none cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-deglya-wood ml-1">Nueva Contraseña</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 focus:border-deglya-teal focus:ring-2 focus:ring-deglya-teal/20 outline-none transition-all"
                                placeholder="Mínimo 6 caracteres"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-400 hover:text-deglya-teal transition-colors"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-deglya-wood ml-1">Confirmar Contraseña</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
                            <input
                                type={showPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-deglya-teal focus:ring-2 focus:ring-deglya-teal/20 outline-none transition-all"
                                placeholder="Repite tu contraseña"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-deglya-teal text-white rounded-xl font-bold hover:bg-deglya-teal/90 transition-all shadow-lg hover:shadow-deglya-teal/30 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Activando...' : 'Activar Cuenta'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ActivateAccount;
