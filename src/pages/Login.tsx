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

            if (authError || !user) throw authError || new Error('Credenciales inválidas');

            // 2. Check Role (Strict Patient Only)
            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single();

            if (profile?.role !== 'patient') {
                await supabase.auth.signOut();
                throw new Error('Acceso denegado. Este portal es solo para pacientes.');
            }

            // 3. Redirect
            navigate('/dashboard/paciente');

        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-deglya-charcoal flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Ambient Glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-deglya-teal/20 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl z-10">

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-display font-light text-white mb-2">Deglya Camero</h1>
                    <p className="text-deglya-gray-light font-sans text-sm tracking-wide uppercase">Acceso Seguro</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-deglya-gray-light mb-2 ml-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-deglya-teal focus:border-transparent transition-all"
                            placeholder="tu@email.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs uppercase tracking-wider text-deglya-gray-light mb-2 ml-1">Contraseña</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-deglya-teal focus:border-transparent transition-all"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-200 text-sm p-3 rounded-xl text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-deglya-teal hover:bg-deglya-teal/90 text-white font-semibold py-4 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg shadow-deglya-teal/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Validando...' : 'Entrar al Portal'}
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <a href="#" className="text-sm text-white/40 hover:text-white transition-colors">
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
