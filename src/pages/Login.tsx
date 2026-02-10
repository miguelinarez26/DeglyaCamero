import { useState } from 'react';
import { supabase } from '../lib/backend';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // 1. Authenticate
            const { data: { user }, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError || !user) throw new Error('Credenciales inválidas. Verifica tu correo y contraseña.');

            // 2. Check Role & Profile Validity
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single();

            // If profile missing, it might be a sync issue or migration lag. 
            // We could attempt self-repair here or just block. For now, strict block with clear msg.
            if (profileError) {
                console.error("Profile Fetch Error:", profileError);
                throw new Error('Error recuperando perfil de usuario. Contacte soporte.');
            }

            if (profile?.role !== 'patient') {
                await supabase.auth.signOut();
                throw new Error('Acceso denegado. Este portal es solo para pacientes.');
            }

            // 3. Redirect
            navigate('/dashboard/paciente');

        } catch (err: any) {
            console.error(err);
            setError(err.message || "Error desconocido al iniciar sesión");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100 flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Ambient Glows (Subtler for Light Mode) */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-deglya-teal/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-deglya-gold/10 rounded-full blur-[120px]" />

            <div className="bg-white/60 backdrop-blur-xl border border-white/40 p-10 rounded-[2.5rem] w-full max-w-md shadow-2xl shadow-stone-200/50 z-10">

                <div className="text-center mb-10">
                    <h1 className="text-4xl font-display font-medium text-deglya-teal mb-2">Deglya Camero</h1>
                    <p className="text-stone-500 font-sans text-xs tracking-[0.2em] uppercase font-bold">Portal Pacientes</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-xs uppercase tracking-wider text-stone-500 font-bold ml-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-stone-50 border-stone-200 text-stone-800 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-deglya-teal/20 focus:border-deglya-teal transition-all outline-none"
                            placeholder="tu@email.com"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-xs uppercase tracking-wider text-stone-500 font-bold ml-1">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-stone-50 border-stone-200 text-stone-800 rounded-2xl px-5 py-4 focus:ring-2 focus:ring-deglya-teal/20 focus:border-deglya-teal transition-all outline-none"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-100 text-red-600 text-sm p-4 rounded-xl text-center font-medium animate-in fade-in slide-in-from-top-2">
                            {error}
                        </div>
                    )}

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-deglya-teal hover:bg-deglya-teal/90 text-white font-bold tracking-wide py-4.5 py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.01] hover:shadow-lg shadow-deglya-teal/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Validando...</span>
                                </>
                            ) : (
                                'Ingresar'
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-8 text-center space-y-4">
                    <a href="#" className="block text-sm text-stone-400 hover:text-deglya-teal transition-colors font-medium">
                        ¿Olvidaste tu contraseña?
                    </a>

                    <div className="pt-6 border-t border-stone-100">
                        <p className="text-stone-400 text-xs mb-3">¿Aún no tienes cuenta?</p>
                        <button
                            onClick={() => navigate('/booking')}
                            className="text-sm font-bold text-deglya-gold hover:text-deglya-gold/80 transition-colors uppercase tracking-wider"
                        >
                            Reservar una Cita
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
