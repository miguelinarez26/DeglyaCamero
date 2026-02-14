import React from 'react';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import Services from '../components/landing/Services';
import BookSection from '../components/landing/BookSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import ContactForm from '../components/landing/ContactForm';
import Footer from '../components/landing/Footer';

import { motion, useScroll, useTransform } from 'framer-motion';

const Home = () => {
    // Scroll Tracking
    const { scrollYProgress } = useScroll();

    // Brand Palette Inverted: #F9F9F7 (Canvas/Cream) -> #1B6CA8 (Structure/Royal Blue/Book) -> #F9F9F7 (Cream/Testimonials)
    // Updated per user request (2): Cream (0-10%) -> Solid Blue (35-55%) -> Fade to Cream (80%)
    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.25, 0.45, 0.60, 0.85, 1],
        ['#F9F7F2', '#F9F7F2', '#B06540', '#B06540', '#F9F7F2', '#F9F7F2']
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
                <TestimonialsSection />
                <ContactForm />
                {/* Footer has its own solid background, so it handles the bottom visually */}
                <Footer />
            </div>
        </div>
    );
};

export default Home;
