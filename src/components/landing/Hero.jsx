import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle, Leaf } from 'lucide-react';
import heroGradient from '../../assets/hero-gradient.png';
import { Link } from 'react-router-dom';
const deglyaHeroNew = import.meta.env.BASE_URL + 'images/Deglya-3 (1).jpg';

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
                    <span
                        className="inline-block py-1 px-3 rounded-full bg-[#9dbba4]/40 backdrop-blur-md text-xs font-bold tracking-wider uppercase border border-primary/20 text-gradient-wellness shadow-sm"
                    >
                        Psicóloga y Autora
                    </span>
                    <h1 className="text-4xl lg:text-6xl font-display font-medium leading-tight text-primary">
                        ¿Quieres potenciar tus <span className="italic text-secondary">habilidades</span>?
                        <span className="block mt-4">
                            Rediséñate en{' '}
                        </span>
                        <span className="block h-[1.3em] relative overflow-hidden text-deglya-sage-dark italic mt-2">
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
                    <p className="text-lg lg:text-xl text-primary/80 max-w-lg leading-relaxed">
                        Acompaño procesos de transformación con empatía y esperanza. Descubre el maravilloso camino de rediseñarte y potenciar tus capacidades.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                        <Link to="/servicios" className="btn-action-blue px-8 py-3 rounded-full shadow-lg">
                            Explorar Servicios
                        </Link>
                    </div>
                </motion.div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="relative lg:h-[750px] flex items-center justify-center"
                >
                    {/* Abstract Shape with Subtle Green Tint */}
                    <div className="absolute inset-0 bg-[#9dbba4]/20 rounded-3xl rotate-3 transform scale-95 origin-bottom-right dark:bg-[#9dbba4]/10" />

                    {/* Vertical Capsule Shape with Shared Transparent Green Background #9dbba4 */}
                    <div
                        className="relative w-full max-w-[480px] h-[580px] mx-auto overflow-hidden shadow-xl group flex items-start justify-center bg-[#9dbba4]/40 backdrop-blur-md border border-white/20 rounded-t-[10rem] rounded-b-[2rem]"
                    >
                        <img
                            src={deglyaHeroNew}
                            alt="Deglya Camero"
                            className="w-full h-full object-cover object-[center_45%] pointer-events-none drop-shadow-2xl"
                        />
                    </div>
                </motion.div>
            </div>
        </header>
    );
};

export default Hero;
