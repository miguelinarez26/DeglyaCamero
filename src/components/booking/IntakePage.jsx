import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Lock, ArrowRight, Check } from 'lucide-react';

const IntakePage = () => {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here we would submit to Supabase 'intake_forms' table
        alert("¡Gracias! Hemos recibido tu información. Te contactaremos pronto.");
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-canvas font-sans py-12 px-4 transition-colors duration-300 flex flex-col items-center justify-center">

            <div className="w-full max-w-3xl mb-8 animate-in slide-in-from-bottom-4 duration-700">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold uppercase tracking-widest text-conversion">Paso Final</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-stone-400">Historial Inicial</span>
                </div>
                <div className="h-2 w-full bg-stone-200 rounded-full overflow-hidden">
                    <div className="h-full bg-conversion w-full animate-[width_1s_ease-out] rounded-full shadow-[0_0_10px_rgba(227,179,70,0.5)]"></div>
                </div>
            </div>

            <main className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border border-stone-100 overflow-hidden animate-in slide-in-from-bottom-8 duration-700 delay-100">
                <div className="px-8 md:px-12 pt-12 pb-8 text-center border-b border-stone-50 bg-stone-50/30">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-structure/10 text-structure mb-6 shadow-sm">
                        <Heart size={28} className="fill-current" />
                    </div>
                    <h1 className="font-display text-3xl md:text-4xl text-structure font-bold mb-4">
                        Gracias por tu confianza
                    </h1>
                    <p className="text-stone-500 max-w-lg mx-auto leading-relaxed text-lg">
                        Bienvenido al sistema. Para optimizar nuestra primera sesión, por favor comparte brevemente qué te trae aquí hoy.
                    </p>
                </div>

                <form className="px-8 md:px-12 py-10 space-y-10" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <label className="block font-display text-xl text-stone-800 font-bold" htmlFor="reason">
                            ¿Qué te trae a terapia o coaching hoy?
                        </label>
                        <textarea
                            className="w-full bg-white border border-stone-200 rounded-2xl p-6 text-stone-700 focus:ring-2 focus:ring-structure/20 focus:border-structure transition-all resize-none shadow-sm placeholder-stone-400 outline-none text-lg leading-relaxed"
                            id="reason"
                            placeholder="Describe brevemente tu situación actual, sentimientos o desafíos..."
                            rows="4">
                        </textarea>
                    </div>

                    <div className="space-y-4">
                        <label className="block font-display text-xl text-stone-800 font-bold">
                            ¿Has estado en terapia antes?
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <label className="relative flex items-center p-5 rounded-2xl border border-stone-200 bg-white cursor-pointer hover:border-structure/50 hover:bg-stone-50 transition-all group shadow-sm">
                                <input className="h-5 w-5 text-structure border-stone-300 focus:ring-structure accent-structure" name="previous_therapy" type="radio" />
                                <span className="ml-3 text-stone-700 font-bold group-hover:text-structure transition-colors">Sí, he estado</span>
                            </label>
                            <label className="relative flex items-center p-5 rounded-2xl border border-stone-200 bg-white cursor-pointer hover:border-structure/50 hover:bg-stone-50 transition-all group shadow-sm">
                                <input className="h-5 w-5 text-structure border-stone-300 focus:ring-structure accent-structure" name="previous_therapy" type="radio" />
                                <span className="ml-3 text-stone-700 font-bold group-hover:text-structure transition-colors">No, es mi primera vez</span>
                            </label>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <label className="block font-display text-xl text-stone-800 font-bold">
                            3 Objetivos principales para nuestras sesiones
                        </label>
                        <div className="space-y-4">
                            {[1, 2, 3].map((num) => (
                                <div key={num} className="flex items-center gap-4">
                                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-structure/10 text-structure font-bold text-sm border border-structure/20">{num}</span>
                                    <input className="flex-1 bg-white border border-stone-200 rounded-xl px-5 py-4 text-stone-700 focus:ring-2 focus:ring-structure/20 focus:border-structure transition-all shadow-sm outline-none" placeholder={`Objetivo ${num}`} type="text" />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-8 flex justify-end border-t border-stone-100">
                        <button className="group relative w-full sm:w-auto inline-flex items-center justify-center bg-structure hover:bg-structure/90 text-white font-bold py-4 px-10 rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02]" type="submit">
                            <span>Finalizar Registro</span>
                            <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={20} />
                        </button>
                    </div>
                </form>
            </main>

            <div className="mt-8 text-center animate-in fade-in delay-300">
                <p className="flex items-center justify-center gap-2 text-sm text-stone-400 font-medium">
                    <Lock size={14} />
                    Tu información está 100% encriptada y es confidencial.
                </p>
            </div>
        </div>
    );
};

export default IntakePage;
