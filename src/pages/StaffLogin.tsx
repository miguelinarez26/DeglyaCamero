import { useState } from 'react';
import { supabase } from '../lib/backend';
import { useNavigate } from 'react-router-dom';

const StaffLogin = () => {
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

            // 2. Check Role
            const { data: profile } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', user.id)
                .single();

            const role = profile?.role;

            if (role === 'patient') {
                await supabase.auth.signOut();
                throw new Error('Acceso restringido a personal autorizado.');
            }

            // 3. Redirect based on Role
            if (role === 'specialist') navigate('/dashboard/especialista');
            else if (['receptionist', 'admin', 'programador'].includes(role)) navigate('/dashboard/recepcion');
            else navigate('/'); // Fallback

        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-neutral-800 border border-neutral-700 rounded-lg shadow-xl p-8">
                <div className="mb-8 border-b border-neutral-700 pb-4">
                    <h1 className="text-2xl font-mono text-white tracking-tighter">SYSTEM_ACCESS</h1>
                    <p className="text-neutral-400 text-xs font-mono mt-1">AUTHORIZED_PERSONNEL_ONLY</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div className="space-y-1">
                        <label className="text-xs font-mono text-neutral-500 uppercase">Personal_ID (Email)</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black/30 border border-neutral-600 rounded px-3 py-2 text-white font-mono focus:border-deglya-teal focus:outline-none transition-colors"
                            placeholder="admin@deglya.com"
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-mono text-neutral-500 uppercase">Security_Key</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/30 border border-neutral-600 rounded px-3 py-2 text-white font-mono focus:border-deglya-teal focus:outline-none transition-colors"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    {error && (
                        <div className="bg-red-900/20 border border-red-900/50 text-red-400 text-xs font-mono p-3">
                            ERROR: {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-neutral-200 hover:bg-white text-black font-mono font-bold py-3 rounded transition-all disabled:opacity-50"
                    >
                        {loading ? 'AUTHENTICATING...' : 'INITIALIZE_SESSION'}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate('/login')}
                        className="w-full text-center text-neutral-600 text-xs font-mono hover:text-neutral-400"
                    >
                        Are you a patient? Go to Patient Portal
                    </button>
                </form>
            </div>
        </div>
    );
};

export default StaffLogin;
