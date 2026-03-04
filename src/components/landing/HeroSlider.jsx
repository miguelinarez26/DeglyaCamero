import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const slides = [
    {
        id: 1,
        // Foto de Paisaje Premium 4K (Naturaleza majestuosa, tonos cálidos)
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=2600&auto=format&fit=crop",
        title: "El Arte de Rediseñarte",
        subtitle: "Descubre tu potencial ilimitado",
        position: "center 65%"
    },
    {
        id: 2,
        // Foto para nueva seccion: Calma y proposito
        image: import.meta.env.BASE_URL + "images/calmayproposito1.jpg",
        title: "Calma y Propósito",
        subtitle: "Un espacio para tu bienestar mental",
        position: "center center"
    },
    {
        id: 3,
        // Foto para el reino de lo posible
        image: import.meta.env.BASE_URL + "images/reinodeloposible.jpg",
        title: "Reino de lo Posible",
        subtitle: "Donde la transformación comienza",
        position: "center center"
    }
];

const HeroSlider = () => {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-screen w-full overflow-hidden bg-structure">
            <AnimatePresence mode="wait">
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0"
                >
                    {/* Image Layer - Full Cover without blur */}
                    <div
                        className="absolute inset-0 bg-cover"
                        style={{
                            backgroundImage: `url(${slides[current].image})`,
                            backgroundPosition: slides[current].position || "center center"
                        }}
                    />
                    {/* Overlay muy sutil cálido (no negro entero) para resaltar colores y no matar la luz */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-900/40 via-transparent to-black/10 mix-blend-multiply" />
                </motion.div>
            </AnimatePresence>

            {/* Content Layer */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 px-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={current}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] filter shadow-black">
                            {slides[current].title}
                        </h1>
                        <p className="text-xl md:text-2xl font-light tracking-wide opacity-100 max-w-2xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] text-white/95">
                            {slides[current].subtitle}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 text-white/70"
            >
                <ArrowDown size={32} />
            </motion.div>
        </section>
    );
};

export default HeroSlider;
