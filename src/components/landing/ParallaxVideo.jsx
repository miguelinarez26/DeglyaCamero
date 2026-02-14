import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxVideo = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Transform: 
    // Scale grows from 0.8 to 1 (full width)
    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
    // BorderRadius goes from 2rem to 0 (flat edges)
    const borderRadius = useTransform(scrollYProgress, [0, 1], ["2rem", "0rem"]);

    return (
        <section ref={containerRef} className="relative h-[200vh] bg-[#F9F7F2]">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ scale, borderRadius }}
                    className="relative w-full h-full max-w-[90%] max-h-[90%] overflow-hidden shadow-2xl z-10"
                >
                    <video
                        className="w-full h-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                    >
                        {/* Reliable Nature Video (Pexels) */}
                        <source src="https://videos.pexels.com/video-files/855564/855564-hd_1920_1080_24fps.mp4" type="video/mp4" />
                        Tu navegador no soporta videos.
                    </video>

                    <div className="absolute inset-0 bg-black/10" />

                    <div className="absolute inset-0 flex items-center justify-center">
                        <h2 className="text-white/80 font-display text-4xl md:text-6xl font-bold tracking-widest uppercase drop-shadow-lg text-center px-4">
                            Descubre tu Esencia
                        </h2>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default ParallaxVideo;
