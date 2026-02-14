import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const slides = [
    {
        id: 1,
        // Placeholder gradient/image - replace with real images later
        image: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2074&auto=format&fit=crop",
        title: "El Arte de Rediseñarte",
        subtitle: "Descubre tu potencial ilimitado"
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=1528&auto=format&fit=crop",
        title: "Calma y Propósito",
        subtitle: "Un espacio para tu bienestar mental"
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1470115636492-6d2b56f9146d?q=80&w=2070&auto=format&fit=crop",
        title: "Reino de lo Posible",
        subtitle: "Donde la transformación comienza"
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
                    {/* Image Layer */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slides[current].image})` }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/30 md:bg-black/20" />
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
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight mb-4 drop-shadow-lg">
                            {slides[current].title}
                        </h1>
                        <p className="text-xl md:text-2xl font-light tracking-wide opacity-90 max-w-2xl mx-auto drop-shadow-md">
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
