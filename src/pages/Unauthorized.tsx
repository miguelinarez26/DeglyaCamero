import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-deglya-charcoal flex flex-col items-center justify-center p-6 text-white text-center font-display">
            <h1 className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500 mb-4">
                403
            </h1>
            <h2 className="text-3xl font-semibold mb-2">Acceso Restringido</h2>
            <p className="text-deglya-gray-light max-w-md mx-auto mb-8 font-sans">
                No tienes los permisos necesarios para acceder a esta área clínica.
                Si crees que esto es un error, contacta a soporte.
            </p>

            <button
                onClick={() => navigate('/')}
                className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all duration-300 backdrop-blur-md"
            >
                Volver al Inicio
            </button>
        </div>
    );
};

export default Unauthorized;
