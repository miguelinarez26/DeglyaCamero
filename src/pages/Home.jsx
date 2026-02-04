import React from 'react';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import Services from '../components/landing/Services';
import BookSection from '../components/landing/BookSection';
import ContactForm from '../components/landing/ContactForm';
import Footer from '../components/landing/Footer';

import { motion, useScroll, useTransform } from 'framer-motion';

const Home = () => {
    // Scroll Tracking
    const { scrollYProgress } = useScroll();

    // Brand Palette Inverted: #F9F9F7 (Canvas/Cream) -> #1B6CA8 (Structure/Teal)
    // Starts Cream (Hero) -> Fades into Teal (Footer area)
    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.4, 0.9],
        ['#F9F9F7', '#F9F9F7', '#1B6CA8']
    );

    return (
        <div className="relative min-h-screen font-body transition-colors duration-300">
            {/* MECHANISM: Fixed Immersive Background */}
            <motion.div
                style={{ backgroundColor }}
                className="fixed inset-0 w-full h-full -z-50 will-change-[background-color]"
            />

            <div className="relative z-10">
                <Navbar />
                <Hero />
                <Services />
                <BookSection />
                <ContactForm />
                {/* Footer has its own solid background, so it handles the bottom visually */}
                <Footer />
            </div>
        </div>
    );
};

export default Home;
