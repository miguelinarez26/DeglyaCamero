import React from 'react';
import { motion } from 'framer-motion';

const OurHistory = () => {
    return (
        <section className="py-20 px-6 md:px-12 bg-[#F1E4C3]/20 relative">
            <div className="max-w-4xl mx-auto">
                <h2 className="font-display text-3xl md:text-4xl text-booking-primary font-bold mb-8 text-center">Nuestra Historia</h2>
                <div className="relative">
                    {/* Vignette Circle Effect (Static) */}
                    <div className="float-right ml-6 mb-2 w-40 h-40 md:w-56 md:h-56 bg-[#7D8F69]/10 backdrop-blur-sm rounded-full flex items-center justify-center text-center p-4 border-2 border-white/60 shadow-inner relative z-10 shape-circle">
                        <div>
                            <span className="font-display text-5xl md:text-6xl font-bold text-booking-primary block leading-none">15+</span>
                            <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-booking-primary mt-1 block">Años transformando vidas</span>
                        </div>
                    </div>

                    <div className="text-deglya-wood font-medium text-base md:text-lg leading-relaxed space-y-6 text-justify">
                        <p>
                            Deglya Camero Group nació de una visión clara: crear un espacio donde la transformación personal y el éxito empresarial pudieran coexistir y potenciarse mutuamente. Lo que comenzó como una práctica individual de coaching y terapia, hoy es un grupo multidisciplinario de profesionales apasionados por el bienestar integral.
                        </p>
                        <p>
                            Cada paso de nuestro camino ha estado marcado por la cercanía con quienes confían en nosotros. Hemos acompañado a más de 2,000 personas y 50 empresas en su camino hacia una vida más plena, equilibrada y significativa. No solo ofrecemos servicios, construimos puentes hacia la mejor versión de cada individuo y organización.
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
