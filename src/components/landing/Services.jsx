import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BrainCircuit, Library, ArrowRight } from 'lucide-react';

const Services = () => {
    const services = [
        {
            icon: <Sparkles size={32} />,
            title: "Psicoterapia y Coaching",
            subtitle: "Acompañamiento personal profundo",
            description: "Atendemos diversas necesidades en los procesos de cambio, trauma psicológico y rediseño personal a través de un acompañamiento empático.",
            img: import.meta.env.BASE_URL + "images/terapia-individual.jpg",
            link: "#"
        },
        {
            icon: <BrainCircuit size={32} />,
            title: "Neuro-Bienestar",
            subtitle: "Reprogramación y psicoeducación",
            description: "Experiencias grupales de reprogramación psicoespiritual. Psicoeducación y entrenamiento para auto reprogramar las distorsiones en la autopercepción y la percepción del mundo.",
            img: import.meta.env.BASE_URL + "images/sanacion-emocional.jpg",
            link: "#"
        },
        {
            icon: <Library size={32} />,
            title: "Recursos de Rediseño",
            subtitle: "Herramientas de autogestión",
            description: "Experiencias de autogestión psicológica. Accede a herramientas diseñadas para tu crecimiento continuo y a tu propio ritmo.",
            img: import.meta.env.BASE_URL + "images/coaching-de-vida.jpg",
            link: "#"
        }
    ];

    return (
        <section id="services" className="py-24 px-6 lg:px-12 bg-transparent transition-colors">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 max-w-3xl mx-auto">
                    <span className="font-bold uppercase tracking-widest text-sm mb-3 block text-gradient-wellness">Sistema Destino</span>
                    <h2 className="text-4xl lg:text-5xl font-display font-semibold mb-6 text-accent">
                        Nuestros Pilares de Transformación
                    </h2>
                    <p className="text-accent/80">
                        Nuestro enfoque se destaca por estar centrado en el Sistema Destino, integrando diferentes metodologías de intervención psicoterapéutica y otras especialidades de acompañamiento personal.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="group relative h-[450px] w-full rounded-3xl overflow-hidden cursor-pointer shadow-lg"
                            onClick={() => window.location.href = "/DeglyaCamero/servicios"}
                        >
                            {/* Background Image */}
                            <img
                                src={service.img}
                                alt={service.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                            />

                            {/* Base Dark Gradient (always visible on bottom for readability) */}
                            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/90 via-stone-900/30 to-transparent transition-opacity duration-500 group-hover:opacity-0" />

                            {/* Hover Color Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#D96B2F] via-[#DB5E42] to-[#D35355] opacity-0 group-hover:opacity-[0.85] transition-opacity duration-500 ease-in-out" />

                            {/* Content Container */}
                            <div className="absolute inset-0 flex flex-col justify-end p-8 z-10 text-white">
                                {/* Elements that slide up */}
                                <div className="transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-2">
                                    <div className="mb-4">
                                        {React.cloneElement(service.icon, { size: 36, strokeWidth: 1.5, className: "opacity-80 group-hover:opacity-100 transition-opacity" })}
                                    </div>
                                    <h3 className="text-3xl lg:text-3xl font-display font-medium mb-1 leading-tight group-hover:drop-shadow-md">
                                        {service.title}
                                    </h3>
                                    <p className="text-white/80 text-sm group-hover:text-white transition-colors">
                                        {service.subtitle}
                                    </p>
                                </div>

                                {/* Hidden details that expand on hover */}
                                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] opacity-0 group-hover:opacity-100 mt-2">
                                    <div className="overflow-hidden">
                                        <p className="text-white/95 text-sm leading-relaxed mb-6 pt-2">
                                            {service.description}
                                        </p>
                                        <button className="px-6 py-2.5 rounded-full border border-white/80 text-white text-sm font-semibold hover:bg-white hover:text-[#D1554A] transition-all duration-300">
                                            Saber más
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
