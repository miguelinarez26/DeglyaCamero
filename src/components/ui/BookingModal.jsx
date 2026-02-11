import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../../lib/uiStore';
import { useNavigate } from 'react-router-dom';
import { User, UserPlus, X, ArrowLeft } from 'lucide-react';
import AuthCore from '../auth/AuthCore';

const BookingModal = () => {
    const { isBookingModalOpen, closeBookingModal } = useUIStore();
    const navigate = useNavigate();

    const [view, setView] = React.useState('selection'); // 'selection' | 'login'

    const handleNavigation = (path) => {
        closeBookingModal();
        navigate(path);
    };

    const handleClose = () => {
        closeBookingModal();
        setTimeout(() => setView('selection'), 300); // Reset after animation
    };

    return (
        <AnimatePresence>
            {isBookingModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center -top-10 sm:top-0">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeBookingModal}
                        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="relative w-full max-w-lg bg-stone-50 rounded-2xl shadow-2xl p-6 sm:p-8 m-4 border border-white/50 overflow-hidden"
                    >
                        {/* Decorative Background Blob */}
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-deglya-teal/5 rounded-full blur-3xl pointer-events-none" />

                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 transition-colors rounded-full hover:bg-stone-100"
                        >
                            <X size={20} />
                        </button>

                        {view === 'selection' ? (
                            <>
                                <div className="text-center mb-8 relative z-10">
                                    <h2 className="text-3xl font-display font-bold text-structure mb-3">
                                        ¿Cómo deseas continuar?
                                    </h2>
                                    <p className="text-accent font-sans max-w-sm mx-auto">
                                        Selecciona la opción que mejor describa tu situación actual para guiarte al lugar correcto.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 relative z-10">
                                    {/* Option 1: First Time - Using CONVERSION color */}
                                    <button
                                        onClick={() => handleNavigation('/booking?service=initial-interview')}
                                        className="group relative flex flex-col items-center justify-center p-8 bg-white border border-stone-200 rounded-2xl hover:border-conversion hover:shadow-xl hover:shadow-conversion/5 transition-all duration-300 transform hover:-translate-y-1.5"
                                    >
                                        <div className="w-16 h-16 bg-conversion/10 text-conversion rounded-full flex items-center justify-center mb-5 group-hover:bg-conversion group-hover:text-stone-900 transition-all duration-300">
                                            <UserPlus size={32} />
                                        </div>
                                        <h3 className="font-display font-bold text-stone-800 text-xl mb-2">Primera Vez</h3>
                                        <p className="text-sm text-stone-500 text-center font-sans leading-relaxed">
                                            Deseo agendar mi primera sesión de valoración médica.
                                        </p>
                                        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-xs font-bold uppercase tracking-wider text-conversion">Comenzar →</span>
                                        </div>
                                    </button>

                                    {/* Option 2: Returning Patient - Using STRUCTURE color */}
                                    <button
                                        onClick={() => setView('login')}
                                        className="group relative flex flex-col items-center justify-center p-8 bg-white border border-stone-200 rounded-2xl hover:border-structure hover:shadow-xl hover:shadow-structure/5 transition-all duration-300 transform hover:-translate-y-1.5"
                                    >
                                        <div className="w-16 h-16 bg-structure/10 text-structure rounded-full flex items-center justify-center mb-5 group-hover:bg-structure group-hover:text-white transition-all duration-300">
                                            <User size={32} />
                                        </div>
                                        <h3 className="font-display font-bold text-stone-800 text-xl mb-2">Ya soy Paciente</h3>
                                        <p className="text-sm text-stone-500 text-center font-sans leading-relaxed">
                                            Quiero ingresar a mi portal para gestionar mis citas.
                                        </p>
                                        <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-xs font-bold uppercase tracking-wider text-structure">Ingresar →</span>
                                        </div>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="relative z-10">
                                <AuthCore
                                    onBack={() => setView('selection')}
                                    onSuccess={() => handleNavigation('/portal')}
                                />
                            </div>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default BookingModal;
