import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

const Services = () => {
    const services = [
        {
            tag: "BIENESTAR",
            title: "Psicoterapia y Coaching",
            description: "Acompañamiento personal profundo. Atendemos diversas necesidades en los procesos de cambio, trauma psicológico y rediseño personal.",
            img: import.meta.env.BASE_URL + "images/Psicoterapeuta y Coaching.png",
            link: "/servicios/pilar/psicoterapia-coaching"
        },
        {
            tag: "SANACIÓN HOLÍSTICA",
            title: "Laboratorio de Neuro-bienestar",
            description: "Reprogramación y psicoeducación. Experiencias grupales para reprogramar las distorsiones en la autopercepción y la percepción del mundo.",
            img: import.meta.env.BASE_URL + "images/laboratorio neuro-bienestar.png",
            link: "/servicios/pilar/laboratorio-neuro-bienestar"
        },
        {
            tag: "ESENCIA & MENTE",
            title: "Recursos de Rediseño",
            description: "Herramientas de autogestión psicológica. Accede a herramientas diseñadas para tu crecimiento continuo y a tu propio ritmo.",
            img: import.meta.env.BASE_URL + "images/recursosdediseno.png",
            link: "/servicios/pilar/recursos-rediseno"
        }
    ];

    return (
        <section id="services" className="py-24 px-6 lg:px-12 bg-transparent transition-colors">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20 max-w-3xl mx-auto">
                    <span className="font-bold uppercase tracking-widest text-sm mb-3 block text-[#D1554A]">Sistema Destino</span>
                    <h2 className="text-4xl lg:text-5xl font-display font-semibold mb-6 text-accent">
                        Nuestros Pilares de Transformación
                    </h2>
                    <p className="text-accent/80 text-lg">
                        Nuestro enfoque se destaca por estar centrado en el Sistema Destino, integrando diferentes metodologías de intervención psicoterapéutica.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="bg-[#9dbba4]/40 backdrop-blur-md border border-white/20 rounded-[2rem] overflow-hidden flex flex-col h-full shadow-sm hover:shadow-xl transition-all duration-500 group"
                        >
                            {/* Taller Image Header - To avoid cropping the brain image and show its full detail */}
                            <div className="relative h-80 w-full overflow-hidden">
                                <img
                                    src={service.img}
                                    alt={service.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                            </div>

                            {/* Even more Compact Content Container */}
                            <div className="px-7 py-6 flex flex-col flex-grow items-start justify-between">
                                <div>
                                    <h3 className="text-xl lg:text-2xl font-display font-bold mb-2 text-[#2F3E30] leading-tight">
                                        {service.title}
                                    </h3>
                                    <p className="text-[#6B6358] text-sm lg:text-base leading-relaxed mb-4">
                                        {service.description}
                                    </p>
                                </div>

                                <Link
                                    to={service.link}
                                    className="px-9 py-2.5 rounded-full border border-[#2F3E30] text-[#2F3E30] text-sm lg:text-base font-medium transition-all duration-500 hover:bg-gradient-to-r hover:from-[#D1554A] hover:to-[#E28A47] hover:text-white hover:border-transparent active:scale-95 inline-block"
                                >
                                    Saber más
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
