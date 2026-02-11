import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";

// --- Data ---
const testimonials = [
    {
        text: "Deglya y su equipo me ayudaron a recuperar la confianza en mí misma. El enfoque integral es único.",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150",
        name: "María Pérez",
        role: "Emprendedora",
    },
    {
        text: "Gracias a las herramientas de gestión del estrés, vivo mucho más tranquilo y enfocado en mi propósito.",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Carlos Rodríguez",
        role: "Gerente de Ventas",
    },
    {
        text: "La terapia de pareja con el equipo fue clave para nuestra comunicación. Totalmente recomendado.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Sofía & Luis",
        role: "Padres de familia",
    },
    {
        text: "Increíble la calidez y profesionalismo. Me sentí escuchado y comprendido desde el primer día.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Javier Méndez",
        role: "Ingeniero",
    },
    {
        text: "Rediseñar mi vida con Deglya ha sido la mejor inversión. Encontré mi verdadera pasión.",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Ana Torres",
        role: "Diseñadora",
    },
    {
        text: "El taller de mindfulness cambió mi perspectiva sobre la ansiedad. Herramientas muy prácticas.",
        image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Laura Gómez",
        role: "Estudiante",
    },
    {
        text: "Un espacio seguro y lleno de luz. La espiritualidad combinada con psicología es potente.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Pedro Sánchez",
        role: "Arquitecto",
    },
    {
        text: "Superaron mis expectativas. El trato humano y cercano marca la diferencia.",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Patricia Leal",
        role: "Consultora",
    },
    {
        text: "Cada sesión es un paso hacia una mejor versión de mí. Gracias por tanto apoyo.",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150&h=150",
        name: "Roberto Díaz",
        role: "Abogado",
    },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

// --- Sub-Components ---
const TestimonialsColumn = ({ className, testimonials, duration = 10 }) => {
    return (
        <div className={className}>
            <motion.ul
                animate={{
                    translateY: "-50%",
                }}
                transition={{
                    duration: duration,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                }}
                className="flex flex-col gap-6 pb-6 bg-transparent transition-colors duration-300 list-none m-0 p-0"
            >
                {[...new Array(2)].map((_, index) => (
                    <React.Fragment key={index}>
                        {testimonials.map(({ text, image, name, role }, i) => (
                            <motion.li
                                key={`${index}-${i}`}
                                whileHover={{
                                    scale: 1.02,
                                    y: -5,
                                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                                }}
                                className="p-8 rounded-3xl bg-white border border-booking-secondary/20 shadow-sm max-w-xs w-full transition-all duration-300 cursor-default"
                            >
                                <blockquote className="m-0 p-0">
                                    <p className="text-deglya-wood/80 leading-relaxed font-body italic m-0">
                                        "{text}"
                                    </p>
                                    <footer className="flex items-center gap-4 mt-6">
                                        <img
                                            src={image}
                                            alt={`Avatar de ${name}`}
                                            className="h-12 w-12 rounded-full object-cover border-2 border-booking-secondary/20"
                                        />
                                        <div className="flex flex-col">
                                            <cite className="font-display font-bold not-italic tracking-wide text-booking-primary">
                                                {name}
                                            </cite>
                                            <span className="text-xs font-semibold uppercase tracking-wider text-booking-secondary mt-0.5">
                                                {role}
                                            </span>
                                        </div>
                                    </footer>
                                </blockquote>
                            </motion.li>
                        ))}
                    </React.Fragment>
                ))}
            </motion.ul>
        </div>
    );
};

const TestimonialsSection = () => {
    return (
        <section
            id="testimonials"
            className="bg-transparent py-24 relative overflow-hidden"
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.8 }}
                className="container px-4 z-10 mx-auto"
            >
                <div className="flex flex-col items-center justify-center max-w-2xl mx-auto mb-16 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-booking-primary/10 text-booking-primary text-xs font-bold tracking-wider uppercase border border-booking-primary/20 mb-4">
                        Comunidad
                    </span>

                    <h2 className="text-4xl md:text-5xl font-display font-medium text-deglya-wood mb-6">
                        Lo que dicen nuestros <span className="text-booking-secondary italic">pacientes</span>
                    </h2>
                    <p className="text-deglya-wood/70 text-lg leading-relaxed max-w-lg mx-auto">
                        Historias reales de transformación y crecimiento. Gracias por permitirnos ser parte de su camino.
                    </p>
                </div>

                <div
                    className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] max-h-[600px] overflow-hidden"
                >
                    <TestimonialsColumn testimonials={firstColumn} duration={40} />
                    <TestimonialsColumn testimonials={secondColumn} className="hidden md:block pt-12" duration={50} />
                    <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={45} />
                </div>
            </motion.div>
        </section>
    );
};

export default TestimonialsSection;
