import React from 'react';
import { ShieldCheck, Heart, Award, Sparkles, Compass, PenTool, Lightbulb } from 'lucide-react';

const values = [
    {
        icon: ShieldCheck,
        title: "Integridad",
        desc: "Honestidad y coherencia en cada paso.",
        why: "Sentirse seguro es el cimiento necesario para abrir la puerta de la vulnerabilidad.",
        forWhat: "Para garantizar un espacio donde puedas expresarte sin juicios ni riesgos y así alcanzar sanidad.",
        image: import.meta.env.BASE_URL + "images/integridad.png",
        color: "from-black/60 to-transparent",
        theme: "dark"
    },
    {
        icon: Heart,
        title: "Empatía",
        desc: "Escuchamos y comprendemos sin juzgar.",
        why: "Nadie sana en la frialdad; el vínculo humano propicia y sostiene el cambio.",
        forWhat: "Para validar tu experiencia y transformar el dolor en aprendizaje consciente.",
        image: import.meta.env.BASE_URL + "images/Empatia.png",
        color: "from-black/60 to-transparent",
        theme: "dark"
    },
    {
        icon: Heart,
        title: "Adopción Psicoespiritual",
        desc: "Aprendemos con el ejemplo de aquellos que están o han pasado por situaciones similares a las nuestras.",
        why: "Si una persona no posee referentes, internos o externos en su entorno que le permitan reprogramar su sistema interno de modelos parentales que le ayuden a reparentalizarse, el proceso de cambio será incompleto.",
        forWhat: "Para consolidar nuevas memorias que le permitan guiar su proceso de cambio y sostenerlo en el tiempo. Eje del modelo de reparentalización.",
        image: import.meta.env.BASE_URL + "images/adopcion psicoespiritual.png",
        color: "from-black/60 to-transparent",
        theme: "dark"
    },
    {
        icon: Sparkles,
        title: "Dios",
        desc: "Nuestro centro vital y de fe.",
        why: "Dios es nuestro centro vital y de nuestra fe cristiana se desprende nuestro hacer.",
        forWhat: "Para ofrecer un acompañamiento integral fundamentado en un propósito trascendental.",
        image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?auto=format&fit=crop&q=80&w=600",
        color: "from-black/60 to-transparent",
        theme: "dark"
    },
    {
        icon: Compass,
        title: "Destino",
        desc: "La base de nuestro trabajo.",
        why: "Creemos firmemente que, sin importar el punto de partida, se puede cambiar el destino.",
        forWhat: "Para ayudarte a trazar una nueva ruta hacia la plenitud y tu propósito de vida.",
        image: import.meta.env.BASE_URL + "images/destino.png",
        color: "from-black/60 to-transparent",
        theme: "dark"
    },
    {
        icon: PenTool,
        title: "Diseño Personal",
        desc: "Estructurando tu nueva identidad.",
        why: "Cada persona necesita un plan consciente para moldear su mejor versión.",
        forWhat: "Para pasar del dolor a una identidad saludable y bien fundamentada.",
        image: import.meta.env.BASE_URL + "images/diseno personal.png",
        color: "from-black/60 to-transparent",
        theme: "dark"
    },
    {
        icon: Lightbulb,
        title: "Esperanza",
        desc: "La luz que impulsa cada cambio.",
        why: "La convicción en un futuro mejor es el motor emocional de toda curación.",
        forWhat: "Para mantener el enfoque en la restauración, incluso en medio de la dificultad.",
        image: import.meta.env.BASE_URL + "images/esperanza.png",
        color: "from-black/60 to-transparent",
        theme: "dark"
    },
    {
        icon: Award,
        title: "Excelencia",
        desc: "Formación continua para lo mejor.",
        why: "Tu bienestar merece la mejor formación y precisión diagnóstica posible.",
        forWhat: "Para asegurar resultados medibles y un progreso real en tu transformación.",
        image: import.meta.env.BASE_URL + "images/excelencia.png",
        color: "from-black/60 to-transparent",
        theme: "dark"
    }
];

const OurValues = () => {
    return (
        <section className="py-24 bg-white/50 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="font-display text-4xl md:text-5xl text-structure font-bold">Nuestros Valores</h2>
                    <p className="mt-4 text-stone-600 max-w-2xl mx-auto text-lg leading-relaxed">
                        Los pilares que sostienen nuestro compromiso con tu transformación y bienestar integral.
                    </p>
                </div>

                <div className="relative">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                        {values.map((v, i) => (
                            <div
                                key={i}
                                className="group relative min-h-[360px] overflow-hidden rounded-[2.5rem] shadow-sm hover:shadow-2xl transition-all duration-500"
                            >
                                {/* Background Image */}
                                <img
                                    src={v.image}
                                    alt={v.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                {/* Subtle Shadow Gradient for Text Readability - Overlay removed as requested */}
                                <div className={`absolute inset-0 bg-gradient-to-t ${v.color} transition-all duration-500`} />

                                {/* Content Wrapper */}
                                <div className={`relative z-10 h-full p-8 flex flex-col items-start justify-end transition-all duration-500 ${v.theme === 'light' ? 'text-stone-800' : 'text-white'}`}>

                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-auto shadow-sm backdrop-blur-md transition-colors ${v.theme === 'light' ? 'bg-white/50 text-stone-800' : 'bg-white/10 text-white group-hover:bg-white/20'}`}>
                                        <v.icon size={28} />
                                    </div>

                                    <div className="mt-6 w-full transform group-hover:-translate-y-2 transition-transform duration-500">
                                        <h3 className="font-display text-2xl font-bold mb-2">{v.title}</h3>
                                        <p className="text-sm leading-relaxed opacity-90">{v.desc}</p>
                                    </div>

                                    {/* Hover Reveal with Grid expansion */}
                                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-in-out w-full opacity-0 group-hover:opacity-100">
                                        <div className="overflow-hidden">
                                            <div className={`space-y-4 pt-4 mt-2 border-t ${v.theme === 'light' ? 'border-stone-800/20' : 'border-white/20'}`}>
                                                <div>
                                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">¿Por qué?</p>
                                                    <p className="text-sm font-medium leading-tight">{v.why}</p>
                                                </div>
                                                <div>
                                                    <p className="text-[10px] font-black uppercase tracking-widest opacity-70 mb-1">¿Para qué?</p>
                                                    <p className="text-sm font-medium leading-tight">{v.forWhat}</p>
                                                </div>
                                            </div>
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
