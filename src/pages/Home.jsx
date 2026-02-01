import React from 'react';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import Services from '../components/landing/Services';
import BookSection from '../components/landing/BookSection';
import ContactForm from '../components/landing/ContactForm';
import Footer from '../components/landing/Footer';

const Home = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark min-h-screen font-body text-text-light dark:text-text-dark transition-colors duration-300">
            <Navbar />
            <Hero />
            <Services />
            <BookSection />
            <ContactForm />
            <Footer />
        </div>
    );
};

export default Home;
