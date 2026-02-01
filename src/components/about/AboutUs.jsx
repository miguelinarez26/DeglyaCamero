import React from 'react';
import Navbar from '../landing/Navbar';
import Footer from '../landing/Footer';
import OurHistory from './OurHistory';
import OurValues from './OurValues';
import OurTeam from './OurTeam';
import AboutSection from './AboutSection';

const AboutUs = () => {
    return (
        <div className="min-h-screen font-body text-deglya-wood bg-[#FAF9F6] overflow-x-hidden relative">
            <Navbar />

            {/* Global Background Effects */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_0%_0%,_rgba(212,226,212,0.4)_0%,_transparent_40%)]"></div>
                <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_100%,_rgba(241,228,195,0.3)_0%,_transparent_40%)]"></div>
            </div>

            <main className="relative z-10 pt-20">
                {/* HERO SECTION REPLACED */}
                <AboutSection />

                <OurHistory />
                <OurValues />
                <OurTeam />
            </main>

            <Footer />
        </div>
    );
};

export default AboutUs;
