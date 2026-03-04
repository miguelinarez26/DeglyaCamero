import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const OurHistory = () => {
    return (
        <section className="py-20 px-6 md:px-12 bg-[#F1E4C3]/20 relative">
            <div className="max-w-4xl mx-auto">
                <h2 className="font-display text-3xl md:text-4xl text-booking-primary font-bold mb-8 text-center">Nuestra Historia</h2>
                <div className="relative">
                    {/* Organic Animated Shapes Effect (Transformation & Therapy theme) */}
                    <div className="float-right ml-6 mb-2 w-40 h-40 md:w-56 md:h-56 bg-[#7D8F69]/5 backdrop-blur-sm rounded-full flex items-center justify-center p-4 border border-[#7D8F69]/20 shadow-inner relative z-10 shape-circle overflow-hidden">
                        <div className="relative w-full h-full flex items-center justify-center text-[#7D8F69]">
                            {/* Animated morphological borders acting like a breathing fluid */}
                            {[...Array(3)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    className="absolute w-[80%] h-[80%] border-[2px] border-current/30"
                                    style={{
                                        borderRadius: i === 0 ? '60% 40% 30% 70% / 60% 30% 70% 40%' : i === 1 ? '30% 70% 70% 30% / 50% 60% 30% 60%' : '50% 60% 30% 60% / 40% 50% 60% 50%',
                                    }}
                                    animate={{
                                        rotate: i % 2 === 0 ? 360 : -360,
                                        scale: [1, 1.05, 0.95, 1]
                                    }}
                                    transition={{
                                        rotate: { duration: 30 + i * 5, ease: "linear", repeat: Infinity },
                                        scale: { duration: 10 + i * 3, ease: "easeInOut", repeat: Infinity }
                                    }}
                                />
                            ))}
                            {/* Pulsing core symbol with text to represent combined experience */}
                            <motion.div
                                animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.85, 1, 0.85] }}
                                transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity }}
                                className="absolute flex flex-col items-center justify-center text-center px-4"
                            >
                                <div className="absolute w-24 h-24 bg-[#C97D60]/20 rounded-full blur-xl"></div>
                                <span className="font-display text-4xl md:text-5xl font-bold text-[#C97D60] relative z-10 leading-none">90+</span>
                                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-[#C97D60] relative z-10 mt-1 max-w-[120px] leading-tight opacity-90">
                                    Años de exp. combinada
                                </span>
                            </motion.div>
                        </div>
                    </div>

                    <div className="text-deglya-wood font-medium text-base md:text-lg leading-relaxed space-y-6 text-justify">
                        <p>
                            Este equipo surgió de una visión clara: crear un espacio donde la transformación personal y el éxito empresarial pudieran coexistir y potenciarse mutuamente. Lo que comenzó como una práctica individual de coaching y psicoterapia, hoy es un grupo multidisciplinario de profesionales apasionados por el bienestar integral.
                        </p>
                        <p>
                            Cada paso de nuestro camino ha estado marcado por la cercanía con quienes confían en nosotros. <strong>Como equipo tenemos 3 años consolidados, pero entre nuestras fundadoras sumamos más de 90 años de experiencia</strong>, pues cada una tiene más de 35 años de ejercicio clínico profesional. No solo ofrecemos servicios; construimos puentes fuertes hacia la mejor versión de cada individuo.
                        </p>
                    </div>
                    <div className="clear-both"></div>
                </div>
            </div>

            <style jsx>{`
                .shape-circle {
                    shape-outside: circle(50%);
                }
            `}</style>
        </section>
    );
};

export default OurHistory;
