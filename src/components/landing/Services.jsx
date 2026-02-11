import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BrainCircuit, Library, ArrowRight } from 'lucide-react';

const Services = () => {
    const services = [
        {
            icon: <Sparkles size={32} />,
            title: "Psicoterapia y Coaching",
            description: "Atendemos diversas necesidades en los procesos de cambio, trauma psicológico y rediseño personal a través de un acompañamiento empático.",
            link: "#"
        },
        {
            icon: <BrainCircuit size={32} />,
            title: "Laboratorio Neuro-Bienestar",
            description: "Experiencias grupales de reprogramación. Educamos, formamos y ayudamos a reprogramar las autopercepciones limitantes.",
            link: "#"
        },
        {
            icon: <Library size={32} />,
            title: "Recursos de Rediseño",
            description: "Experiencias de autoaprendizaje y autoayuda. Accede a herramientas diseñadas para tu crecimiento continuo a tu propio ritmo.",
            link: "#"
        }
    ];

    return (
        <section id="services" className="py-24 px-6 lg:px-12 bg-transparent transition-colors">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <span className="text-structure font-bold uppercase tracking-widest text-sm mb-3 block">Sistema Destino</span>
                    <h2 className="text-4xl lg:text-5xl font-display font-semibold mb-6 text-accent">
                        Nuestros Pilares de Transformación
                    </h2>
                    <p className="text-accent/80">
                        Nuestro enfoque se destaca por estar centrado en el Sistema Destino, integrando diferentes tipos de formación y especialidades.
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
                            className="group relative bg-white dark:bg-stone-800/10 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-transparent hover:border-structure/20"
                        >
                            <div className="w-14 h-14 bg-structure/10 rounded-xl flex items-center justify-center text-structure mb-6 group-hover:bg-structure group-hover:text-white transition-colors">
                                {service.icon}
                            </div>
                            <h3 className="text-2xl font-display font-semibold mb-4 text-accent">
                                {service.title}
                            </h3>
                            <p className="text-accent/80 mb-6 text-sm leading-relaxed">
                                {service.description}
                            </p>
                            <a href="/servicios" className="inline-flex items-center text-structure font-semibold text-sm hover:underline">
                                Saber más <ArrowRight size={16} className="ml-1" />
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
