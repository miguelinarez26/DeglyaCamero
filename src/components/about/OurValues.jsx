import React from 'react';
import { ShieldCheck, Heart, Award, Sparkles, Lock, Sun } from 'lucide-react';

const values = [
    {
        icon: ShieldCheck,
        title: "Integridad",
        desc: "Honestidad y coherencia en cada paso.",
        why: "La seguridad es el cimiento necesario para la vulnerabilidad terapéutica.",
        forWhat: "Para garantizar un espacio donde puedas expresarte sin juicios ni riesgos.",
        bg: "bg-structure/10",
        text: "text-structure",
        border: "border-structure/20"
    },
    {
        icon: Heart,
        title: "Empatía",
        desc: "Escuchamos y comprendemos sin juzgar.",
        why: "Nadie sana en la frialdad; el vínculo humano es el motor del cambio.",
        forWhat: "Para validar tu experiencia y transformar el dolor en aprendizaje consciente.",
        bg: "bg-conversion/10",
        text: "text-conversion",
        border: "border-conversion/20"
    },
    {
        icon: Award,
        title: "Excelencia",
        desc: "Formación continua para lo mejor.",
        why: "Tu bienestar merece la mejor formación y precisión diagnóstica posible.",
        forWhat: "Para asegurar resultados medibles y un progreso real en tu Rediseño Vital.",
        bg: "bg-stone-100",
        text: "text-accent",
        border: "border-stone-200"
    },
    {
        icon: Sparkles,
        title: "Transformación",
        desc: "El poder de cambiar y crecer.",
        why: "El rediseño requiere una brújula clara para no perderse en el síntoma.",
        forWhat: "Para que alcances una autonomía emocional duradera y auténtica.",
        bg: "bg-structure/10",
        text: "text-structure",
        border: "border-structure/20"
    },
    {
        icon: Lock,
        title: "Confidencialidad",
        desc: "Tu información siempre protegida.",
        why: "Privacidad clínica absoluta y ética profesional en cada interacción.",
        forWhat: "Para construir una alianza terapéutica sólida basada en la confianza mutua.",
        bg: "bg-conversion/10",
        text: "text-conversion",
        border: "border-conversion/20"
    },
    {
        icon: Sun,
        title: "Calidez",
        desc: "Espacios seguros donde te sientas en casa.",
        why: "La salud mental debe ser accesible, comprensiva y libre de barreras.",
        forWhat: "Para ofrecerte métodos de reprogramación mental efectivos y modernos.",
        bg: "bg-white",
        text: "text-accent",
        border: "border-stone-200"
    }
];

const OurValues = () => {
    return (
        <section className="py-24 bg-white/50 relative overflow-hidden">
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="font-display text-4xl md:text-5xl text-structure font-bold">Nuestros Valores</h2>
                    <p className="mt-4 text-stone-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Los pilares que sostienen nuestro compromiso con tu transformación y bienestar integral.
                    </p>
                </div>

                <div className="relative">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                        {values.map((v, i) => (
                            <div
                                key={i}
                                className={`${v.bg} ${v.text} ${v.border || ''} p-10 rounded-[2.5rem] flex flex-col items-center justify-center text-center shadow-sm hover:shadow-xl hover:bg-white transition-all duration-500 group relative min-h-[300px] overflow-hidden`}
                            >
                                {/* Main Content */}
                                <div className="group-hover:translate-y-[-140%] transition-transform duration-500 ease-in-out flex flex-col items-center h-full justify-center">
                                    <div className="p-4 bg-white rounded-2xl mb-5 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                                        <v.icon size={36} />
                                    </div>
                                    <h3 className="font-display text-2xl font-bold mb-3">{v.title}</h3>
                                    <p className="text-sm leading-relaxed opacity-90 max-w-[200px]">{v.desc}</p>
                                </div>

                                {/* Revealed Details (Why/ForWhat) */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center p-10 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out bg-white/40 backdrop-blur-md">
                                    <div className="space-y-6 text-left w-full">
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-widest text-structure mb-2">¿Por qué?</p>
                                            <p className="text-base text-stone-800 font-sans leading-relaxed font-medium">{v.why}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-black uppercase tracking-widest text-conversion mb-2">¿Para qué?</p>
                                            <p className="text-base text-stone-800 font-sans leading-relaxed font-medium">{v.forWhat}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurValues;
