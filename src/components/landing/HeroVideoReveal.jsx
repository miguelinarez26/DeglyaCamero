import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import HeroSlider from './HeroSlider';

const HeroVideoReveal = () => {
    // We use the scroll of the *entire* section
    const containerRef = useRef(null);
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // PARALLAX LOGIC (Keitimas/Harmonix Standard):
    // 1. Hero staying sticky at the back
    // 2. White card sliding up over it
    // 3. Hero STAYS FULL WIDTH (No scaling down < 1 to avoid white borders)
    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1]);
    const heroOpacity = useTransform(scrollYProgress, [0.6, 1], [1, 0]); // Fade out eventually to save performance

    return (
        <div ref={containerRef} className="relative w-full">

            {/* 1. STICKY HERO BACKGROUND */}
            {/* It sits at the top and stays there while we scroll past it */}
            <div className="sticky top-0 h-screen w-full overflow-hidden -z-10">
                <motion.div
                    style={{ scale: heroScale, opacity: heroOpacity }}
                    className="w-full h-full"
                >
                    <HeroSlider />
                </motion.div>
                {/* Overlay removed for transparency as requested */}
            </div>

            {/* 2. SCROLLING FOREGROUND (White Video Section) */}
            {/* This starts "below" the fold and slides UP over the sticky hero */}
            {/* NO NEGATIVE MARGIN: Starts clean below the hero */}
            <div className="relative z-10 bg-[#F9F7F2] rounded-t-[3rem] -mt-0 pb-24 shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.3)]">

                {/* Content Container */}
                <div className="container mx-auto px-6 pt-20 md:pt-32 flex flex-col items-center">

                    {/* Typography Header */}
                    <div className="text-center mb-16 max-w-4xl">
                        <span className="text-sm font-bold tracking-[0.3em] uppercase mb-4 block animate-fadeIn text-gradient-wellness">
                            Tu Viaje Empieza Aquí
                        </span>
                        <h2 className="text-[#2F3E30] font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight animate-slideUp">
                            Transforma tu vida desde <br />
                            <span className="italic font-light text-[#B06540] text-xl md:text-3xl lg:text-4xl block mt-4">las bases que conformaron tu SER</span>
                        </h2>
                    </div>

                    {/* The Video "Card" with Image Cover */}
                    <div
                        className="w-full max-w-6xl aspect-video rounded-[2rem] overflow-hidden shadow-2xl bg-black relative group border border-stone-200 cursor-pointer"
                        onClick={() => setIsVideoOpen(true)}
                    >
                        <img
                            src={import.meta.env.BASE_URL + "images/deglya-2.jpg"}
                            alt="Video Manifiesto"
                            className="w-full h-full object-cover object-[center_30%] opacity-100 group-hover:scale-105 transition-all duration-700"
                        />

                        {/* Elegant Play Button Center -> Moved Down */}
                        <div className="absolute inset-0 flex items-center justify-center pt-32 sm:pt-40 md:pt-48 pointer-events-none">
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-2xl group-hover:scale-110 group-hover:bg-white/30 transition-all duration-500">
                                <div className="w-0 h-0 border-t-[12px] md:border-t-[14px] border-t-transparent border-l-[20px] md:border-l-[24px] border-l-white border-b-[12px] md:border-b-[14px] border-b-transparent ml-2 opacity-100" />
                            </div>
                        </div>

                        {/* Title Overlay in Video */}
                        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 pointer-events-none">
                            <p className="text-[#2F3E30]/80 font-bold text-sm tracking-widest uppercase mb-1 drop-shadow-sm">Video Manifiesto</p>
                            <h3 className="text-[#2F3E30] font-display text-2xl md:text-3xl lg:text-4xl font-bold drop-shadow-md">Descubre tu diseño personal natural y cambia tu destino</h3>
                        </div>
                    </div>

                </div>
            </div>

            {/* YouTube Video Modal Popup */}
            <AnimatePresence>
                {isVideoOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-sm"
                        onClick={() => setIsVideoOpen(false)}
                    >
                        {/* Close button */}
                        <button
                            className="absolute top-6 right-6 md:top-10 md:right-10 text-white/70 hover:text-white transition-colors p-2"
                            onClick={() => setIsVideoOpen(false)}
                        >
                            <X size={32} />
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                            className="w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the video itself
                        >
                            <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/Nw7xV0PhnCU?autoplay=1&rel=0&showinfo=0"
                                title="Video de Deglya Camero"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

export default HeroVideoReveal;
