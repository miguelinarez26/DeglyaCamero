import { useNavigate } from 'react-router-dom';
import { AlertOctagon } from 'lucide-react';
import { useUserRole } from '../hooks/useUserRole'; // Import hook for diagnosis

const Unauthorized = () => {
    const navigate = useNavigate();
    const { role } = useUserRole();

    return (
        <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-4">
            <div className="text-center group p-10 bg-white rounded-3xl shadow-xl max-w-md w-full relative overflow-hidden border border-stone-100">
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-red-400 to-[#D96B2F]"></div>
                
                <AlertOctagon className="w-24 h-24 text-red-400 mx-auto mb-6 drop-shadow-xl" />
                
                <h1 className="text-7xl font-display font-bold text-[#D96B2F] mb-4">
                    403
                </h1>
                
                <h2 className="text-2xl font-bold text-stone-800 mb-2">
                    Acceso Restringido
                </h2>
                
                <p className="text-stone-500 mb-4 px-4 font-medium">
                    No tienes los permisos necesarios para acceder a esta área clínica. Si crees que esto es un error, contacta a soporte.
                </p>

                {/* --- DIAGNOSTIC BLOCK --- */}
                <div className="bg-stone-50 border border-stone-200 rounded-lg p-3 mb-6 text-sm">
                    <p className="text-stone-500">
                        Diagnóstico interno de rol en caché: <span className="font-bold text-stone-800">[{role || 'N/A'}]</span>
                    </p>
                </div>
                {/* ------------------------ */}
                
                <button
                    onClick={() => navigate('/')}
                    className="px-8 py-3 bg-white text-stone-700 font-bold uppercase tracking-widest text-xs border-2 border-stone-200 hover:border-stone-400 rounded-full transition-all"
                >
                    Volver al Inicio
                </button>
            </div>
        </div>
    );
};

export default Unauthorized;
