import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Lock, ArrowRight } from 'lucide-react';

const IntakePage = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here we would submit to Supabase 'intake_forms' table
        alert("¡Gracias! Hemos recibido tu información. Te contactaremos pronto.");
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-deglya-cream dark:bg-[#1a160c] py-12 px-4 transition-colors duration-300 flex flex-col items-center justify-center font-sans">

            <div className="w-full max-w-3xl mb-8 animate-in slide-in-from-bottom-4 duration-700">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-booking-secondary">Paso 1 de 3</span>
                    <span className="text-xs font-medium text-gray-500">Historial Médico</span>
                </div>
                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-booking-secondary w-1/3 rounded-full"></div>
                </div>
            </div>

            <main className="w-full max-w-3xl bg-white dark:bg-[#2c2618] rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden animate-in slide-in-from-bottom-8 duration-700 delay-100">
                <div className="px-8 pt-10 pb-6 text-center border-b border-gray-50">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 text-booking-primary mb-4">
                        <Heart size={24} className="fill-current" />
                    </div>
                    <h1 className="font-display text-3xl md:text-4xl text-booking-primary dark:text-white font-bold mb-3">
                        Gracias por tu confianza
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto leading-relaxed">
                        Bienvenido. Para asegurarnos de aprovechar al máximo nuestra primera sesión, comparte un poco sobre lo que te trae aquí hoy.
                    </p>
                </div>

                <form className="px-8 py-8 space-y-8" onSubmit={handleSubmit}>
                    <div className="space-y-3">
                        <label className="block font-display text-lg text-deglya-wood dark:text-gray-200 font-medium" htmlFor="reason">
                            ¿Qué te trae a terapia o coaching hoy?
                        </label>
                        <textarea className="w-full bg-gray-50 border-gray-200 rounded-2xl p-4 text-gray-700 focus:ring-2 focus:ring-booking-primary/50 focus:border-booking-primary transition-all resize-none shadow-sm placeholder-gray-400 outline-none" id="reason" placeholder="Describe brevemente tu situación actual o sentimientos..." rows="4"></textarea>
                    </div>

                    <div className="space-y-3">
                        <label className="block font-display text-lg text-deglya-wood dark:text-gray-200 font-medium">
                            ¿Has estado en terapia antes?
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <label className="relative flex items-center p-4 rounded-2xl border border-gray-200 bg-gray-50 cursor-pointer hover:border-booking-primary/50 transition-colors group">
                                <input className="h-5 w-5 text-booking-primary border-gray-300 focus:ring-booking-primary" name="previous_therapy" type="radio" />
                                <span className="ml-3 text-gray-700 font-medium group-hover:text-booking-primary transition-colors">Sí, he estado</span>
                            </label>
                            <label className="relative flex items-center p-4 rounded-2xl border border-gray-200 bg-gray-50 cursor-pointer hover:border-booking-primary/50 transition-colors group">
                                <input className="h-5 w-5 text-booking-primary border-gray-300 focus:ring-booking-primary" name="previous_therapy" type="radio" />
                                <span className="ml-3 text-gray-700 font-medium group-hover:text-booking-primary transition-colors">No, es mi primera vez</span>
                            </label>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="block font-display text-lg text-deglya-wood dark:text-gray-200 font-medium">
                            Lista 3 objetivos para nuestras sesiones
                        </label>
                        <div className="space-y-3">
                            {[1, 2, 3].map((num) => (
                                <div key={num} className="flex items-center gap-3">
                                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-booking-primary font-bold text-sm">{num}</span>
                                    <input className="flex-1 bg-gray-50 border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:ring-2 focus:ring-booking-primary/50 focus:border-booking-primary transition-all shadow-sm outline-none" placeholder={`Objetivo ${num}`} type="text" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-6 flex justify-end">
                        <button className="group relative w-full sm:w-auto inline-flex items-center justify-center bg-booking-primary hover:bg-booking-primary/90 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg" type="submit">
                            <span>Guardar y Continuar</span>
                            <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={20} />
                        </button>
                    </div>
                </form>
            </main>

            <div className="mt-8 text-center animate-in fade-in delay-300">
                <p className="flex items-center justify-center gap-2 text-sm text-gray-400">
                    <Lock size={14} />
                    Tu información está encriptada y es confidencial.
                </p>
            </div>
        </div>
    );
};

export default IntakePage;
