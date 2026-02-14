import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import HeroSlider from './HeroSlider';

const HeroVideoReveal = () => {
    // We use the scroll of the *entire* section
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        // The animation runs while this container is in view
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
                {/* Overlay gradient to ensure text readability of the upcoming white section if needed? No, solid white covers it. */}
                <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none" />
            </div>

            {/* 2. SCROLLING FOREGROUND (White Video Section) */}
            {/* This starts "below" the fold and slides UP over the sticky hero */}
            {/* NO NEGATIVE MARGIN: Starts clean below the hero */}
            <div className="relative z-10 bg-[#F9F7F2] rounded-t-[3rem] -mt-0 pb-24 shadow-[0_-20px_60px_-15px_rgba(0,0,0,0.3)]">

                {/* Content Container */}
                <div className="container mx-auto px-6 pt-20 md:pt-32 flex flex-col items-center">

                    {/* Typography Header */}
                    <div className="text-center mb-16 max-w-4xl">
                        <span className="text-sm font-bold tracking-[0.3em] text-[#D4A373] uppercase mb-4 block animate-fadeIn">
                            Tu Viaje Empieza Aquí
                        </span>
                        <h2 className="text-[#2F3E30] font-display text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight animate-slideUp">
                            Transforma tu vida desde <br />
                            <span className="italic font-light text-[#B06540]">la raíz del ser</span>
                        </h2>
                    </div>

                    {/* The Video "Card" */}
                    <div className="w-full max-w-6xl aspect-video rounded-[2rem] overflow-hidden shadow-2xl bg-black relative group border border-stone-200">
                        <video
                            className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-700"
                            autoPlay
                            muted
                            loop
                            playsInline
                        >
                            <source src="https://videos.pexels.com/video-files/855564/855564-hd_1920_1080_24fps.mp4" type="video/mp4" />
                        </video>

                        {/* Elegant Play Button Center */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-lg group-hover:scale-110 transition-transform duration-500">
                                <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[22px] border-l-white border-b-[12px] border-b-transparent ml-2 opacity-90" />
                            </div>
                        </div>

                        {/* Title Overlay in Video */}
                        <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 pointer-events-none">
                            <p className="text-white/80 text-sm tracking-widest uppercase mb-1">Video Manifiesto</p>
                            <h3 className="text-white font-display text-2xl md:text-3xl drop-shadow-lg">Descubre tu Esencia</h3>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
};

export default HeroVideoReveal;
