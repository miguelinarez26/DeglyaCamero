import React from 'react';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import Services from '../components/landing/Services';
import BookSection from '../components/landing/BookSection';
import TestimonialsSection from '../components/landing/TestimonialsSection';
import ContactForm from '../components/landing/ContactForm';
import Footer from '../components/landing/Footer';
import HeroVideoReveal from '../components/landing/HeroVideoReveal';

import { motion, useScroll, useTransform } from 'framer-motion';

const Home = () => {
    // Scroll Tracking
    const { scrollYProgress } = useScroll();

    // Brand Palette Inverted: #F9F9F7 (Canvas/Cream) -> #1B6CA8 (Structure/Royal Blue/Book) -> #F9F9F7 (Cream/Testimonials)
    // Updated for Slider/Video addition: Book section is now much lower (approx 60-80% of page)
    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.55, 0.65, 0.80, 0.9, 1],
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
                <HeroVideoReveal />

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
