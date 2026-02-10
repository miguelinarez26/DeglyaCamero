import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '../../lib/uiStore';
import { useNavigate } from 'react-router-dom';
import { User, UserPlus, X } from 'lucide-react';

const BookingModal = () => {
    const { isBookingModalOpen, closeBookingModal } = useUIStore();
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        closeBookingModal();
        navigate(path);
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
                            onClick={closeBookingModal}
                            className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 transition-colors rounded-full hover:bg-stone-100"
                        >
                            <X size={20} />
                        </button>

                        <div className="text-center mb-8 relative z-10">
                            <h2 className="text-2xl font-display font-bold text-deglya-teal mb-2">
                                ¿Cómo deseas continuar?
                            </h2>
                            <p className="text-stone-600">
                                Selecciona la opción que mejor describa tu situación actual para guiarte al lugar correcto.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
                            {/* Option 1: First Time */}
                            <button
                                onClick={() => handleNavigation('/booking?service=initial-interview')}
                                className="group relative flex flex-col items-center justify-center p-6 bg-white border border-stone-200 rounded-xl hover:border-yellow-400 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="w-14 h-14 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-4 group-hover:bg-yellow-400 group-hover:text-stone-900 transition-colors">
                                    <UserPlus size={28} />
                                </div>
                                <h3 className="font-bold text-stone-800 text-lg mb-1">Primera Vez</h3>
                                <p className="text-sm text-stone-500 text-center">
                                    Deseo agendar mi primera sesión de valoración.
                                </p>
                            </button>

                            {/* Option 2: Returning Patient */}
                            <button
                                onClick={() => handleNavigation('/portal')}
                                className="group relative flex flex-col items-center justify-center p-6 bg-white border border-stone-200 rounded-xl hover:border-deglya-teal hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                            >
                                <div className="w-14 h-14 bg-teal-50 text-deglya-teal rounded-full flex items-center justify-center mb-4 group-hover:bg-deglya-teal group-hover:text-white transition-colors">
                                    <User size={28} />
                                </div>
                                <h3 className="font-bold text-stone-800 text-lg mb-1">Ya soy Paciente</h3>
                                <p className="text-sm text-stone-500 text-center">
                                    Quiero ingresar a mi portal para gestionar citas.
                                </p>
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default BookingModal;
