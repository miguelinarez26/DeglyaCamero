import React from 'react';
import { ShieldCheck, Heart, Award, Sparkles, Lock, Sun } from 'lucide-react';

const values = [
    {
        icon: ShieldCheck,
        title: "Integridad",
        desc: "Honestidad y coherencia en cada paso.",
        bg: "bg-[#C97D60]", // Terracotta
        text: "text-white"
    },
    {
        icon: Heart,
        title: "Empatía",
        desc: "Escuchamos y comprendemos sin juzgar.",
        bg: "bg-[#F1E4C3]", // Warm Sand
        text: "text-[#4A5D4E]"
    },
    {
        icon: Award,
        title: "Excelencia",
        desc: "Formación continua para lo mejor.",
        bg: "bg-[#A2C4C9]", // Serene Blue
        text: "text-white"
    },
    {
        icon: Sparkles,
        title: "Transformación",
        desc: "El poder de cambiar y crecer.",
        bg: "bg-[#D4E2D4]", // Sage Green
        text: "text-[#4A5D4E]",
        border: "border border-[#4A5D4E]/10"
    },
    {
        icon: Lock,
        title: "Confidencialidad",
        desc: "Tu información siempre protegida.",
        bg: "bg-booking-primary", // Deep Earth equivalent
        text: "text-white"
    },
    {
        icon: Sun,
        title: "Calidez",
        desc: "Espacios seguros donde te sientas en casa.",
        bg: "bg-white",
        text: "text-booking-secondary",
        border: "border border-booking-secondary/20"
    }
];

const OurValues = () => {
    return (
        <section className="py-20 bg-white/50 relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <div className="text-center mb-12">
                    <h2 className="font-display text-3xl md:text-4xl text-booking-primary font-bold">Nuestros Valores</h2>
                </div>

                <div className="relative">
                    {/* Decorative Background Pattern */}
                    <div className="absolute inset-0 z-0 hidden md:block opacity-30 pointer-events-none">
                        <svg className="w-full h-full" viewBox="0 0 1000 400">
                            <path d="M250,100 L500,100 L750,100 M250,300 L500,300 L750,300 M250,100 L250,300 M500,100 L500,300 L750,100 L750,300" fill="none" stroke="currentColor" className="text-deglya-wood" strokeDasharray="4 4" strokeWidth="1"></path>
                        </svg>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 relative z-10">
                        {values.map((v, i) => (
                            <div key={i} className={`${v.bg} ${v.text} ${v.border || ''} p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm hover:-translate-y-1 transition-transform duration-300 h-full`}>
                                <v.icon size={32} className="mb-2" />
                                <h3 className="font-display text-lg font-bold mb-1">{v.title}</h3>
                                <p className="text-xs md:text-sm leading-snug opacity-90">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurValues;
