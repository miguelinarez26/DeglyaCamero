import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, Leaf } from 'lucide-react';
import heroGradient from '../../assets/hero-gradient.png';
import deglyaHeroNew from '../../assets/brand/deglya-hero-new.jpg';

const words = ["confianza", "esperanza", "espiritualidad", "propósito"];

const Hero = () => {

    const [index, setIndex] = React.useState(0);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header className="relative w-full min-h-[85vh] flex items-center pt-24 pb-12 px-6 lg:px-12 overflow-hidden">
            {/* Backgrounds */}
            <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-0 left-0 w-96 h-96 bg-structure/10 rounded-full filter blur-3xl -z-10 pointer-events-none"
            />

            <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6"
                >
                    <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wider uppercase border border-primary/20">
                        Psicóloga y Autora
                    </span>
                    <h1 className="text-4xl lg:text-6xl font-display font-medium leading-tight text-stone-700">
                        ¿Quieres potenciar tus <span className="text-secondary italic">habilidades</span>?
                        <span className="block mt-4 text-3xl lg:text-5xl opacity-90 font-normal">
                            Rediseñate en{' '}
                        </span>
                        <span className="block h-[1.3em] relative overflow-hidden text-primary italic mt-2">
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={index}
                                    initial={{ y: 30, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -30, opacity: 0 }}
                                    transition={{ duration: 0.5, ease: "backOut" }}
                                    className="block absolute top-0 left-0"
                                >
                                    {words[index]}
                                </motion.span>
                            </AnimatePresence>
                        </span>
                    </h1>
                    <p className="text-lg lg:text-xl text-stone-700 max-w-lg leading-relaxed">
                        Acompaño procesos de transformación con empatía y esperanza. Descubre el maravilloso camino de rediseñarte y potenciar tus capacidades.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                        <a href="#services" className="bg-conversion text-stone-900 px-8 py-3 rounded-md font-semibold shadow-lg hover:shadow-conversion/30 transition-all hover:-translate-y-1">
                            Ver Servicios
                        </a>
                        <a href="#about" className="flex items-center gap-2 px-8 py-3 rounded-md border border-stone-300 hover:border-primary hover:text-primary transition-colors text-stone-700">
                            <PlayCircle size={18} />
                            Mi Historia
                        </a>
                    </div>
                </motion.div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="relative lg:h-[600px] flex items-center justify-center"
                >
                    {/* Abstract Shape */}
                    <div className="absolute inset-0 bg-primary/5 rounded-t-[10rem] rounded-b-[2rem] rotate-3 transform scale-95 origin-bottom-right dark:bg-primary/10" />

                    {/* Main Image */}
                    <div className="relative w-full h-full max-h-[550px] rounded-t-[10rem] rounded-b-[2rem] overflow-hidden shadow-2xl group flex items-end justify-center bg-stone-100">
                        <img
                            src={deglyaHeroNew}
                            alt="Deglya Camero Portrait"
                            className="w-full h-full object-cover object-[50%_15%] hover:scale-105 transition-transform duration-700"
                        />
                    </div>
                </motion.div>
            </div>
        </header>
    );
};

export default Hero;
