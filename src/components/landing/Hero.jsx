import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PlayCircle, Leaf } from 'lucide-react';

const Hero = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <header ref={targetRef} className="relative w-full min-h-screen flex items-center pt-24 pb-12 px-6 lg:px-12 overflow-hidden">
            {/* Parallax Backgrounds */}
            <motion.div
                style={{ y: backgroundY }}
                className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#F0EBE5] to-transparent dark:from-[#2a2622] -z-10 opacity-60 pointer-events-none"
            />
            <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl -z-10 pointer-events-none"
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
                    <h1 className="text-5xl lg:text-7xl font-display font-medium leading-tight text-gray-900 dark:text-gray-100">
                        Transforma el <span className="text-primary italic">caos</span> en propósito.
                    </h1>
                    <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
                        Acompaño procesos de transformación con empatía y esperanza. Descubre el maravilloso camino de rediseñarte y potenciar tus capacidades.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                        <a href="#services" className="bg-secondary text-white px-8 py-3 rounded-md font-semibold shadow-lg hover:shadow-secondary/30 transition-all hover:-translate-y-1">
                            Ver Servicios
                        </a>
                        <a href="#about" className="flex items-center gap-2 px-8 py-3 rounded-md border border-gray-300 dark:border-gray-600 hover:border-primary hover:text-primary transition-colors text-text-light dark:text-text-dark">
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
                    className="relative lg:h-[800px] flex items-center justify-center"
                >
                    {/* Abstract Shape */}
                    <div className="absolute inset-0 bg-primary/5 rounded-t-[10rem] rounded-b-[2rem] rotate-3 transform scale-95 origin-bottom-right dark:bg-primary/10" />

                    {/* Main Image */}
                    <div className="relative w-full h-full max-h-[700px] rounded-t-[10rem] rounded-b-[2rem] overflow-hidden shadow-2xl group">
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBwLfj0su2jucTxeaOjwcqM_LNPGzvE-nnaDGAkKSFxlmlUiEsqC4QxUbo109C-_xqztJ4tE3kHBXeVA6TAPpopifGv5__CLJnBag-K9ddVamVRiNvvZw5ncZjDw_43XUtFaQFg2OpEnne44fjFbuntK6MgkY1SUZZGNzlBa_mxBoZcWoulUDK1xi2D-kcjqkbn0THDUy67irEjm2908_G2dZ4MO-20dTCPDDAq_EsPVAPvstKr5jJj4UMq1RVmwCXKgkLczci7SrY"
                            alt="Deglya Camero Portrait"
                            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
                        />
                    </div>

                    {/* Floating Card */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="absolute bottom-10 -left-6 bg-surface-light dark:bg-surface-dark p-4 rounded-xl shadow-xl flex items-center gap-4 max-w-xs border border-gray-100 dark:border-gray-700"
                    >
                        <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full text-green-600 dark:text-green-400">
                            <Leaf size={24} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold">Enfoque</p>
                            <p className="font-display font-semibold text-gray-900 dark:text-white">Bienestar Integral</p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </header>
    );
};

export default Hero;
