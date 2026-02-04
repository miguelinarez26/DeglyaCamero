import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navClasses = `fixed top-6 left-0 right-0 z-50 flex justify-center px-4 transition-all duration-300`;
    // Updated to Structure (Teal) as per "Fondos oscuros/Headers" rule
    const containerClasses = `flex items-center justify-between gap-8 max-w-4xl w-full rounded-full px-6 py-3 transition-all duration-500 ${isScrolled
        ? 'bg-structure/95 backdrop-blur-md shadow-md border border-structure/50'
        : 'bg-structure/85 backdrop-blur-sm shadow-sm border border-transparent'
        }`;

    return (
        <nav className={navClasses}>
            <div className={containerClasses}>
                <Link to="/" className="font-display font-bold text-xl text-white tracking-wide">
                    Deglya Camero
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-6 text-sm font-bold text-white/90">
                    <Link to="/" className="hover:text-white transition-colors">Inicio</Link>
                    <Link to="/about" className="hover:text-white transition-colors">Sobre Mí</Link>
                    <Link to="/servicios" className="hover:text-white transition-colors">Servicios</Link>
                    <Link to="/reino" className="hover:text-white transition-colors">El Reino</Link>
                </div>

                <div className="hidden md:block">
                    <Link
                        to="/booking"
                        // Conversion Button: Yellow background + Stone-900 text
                        className="bg-conversion hover:bg-conversion/90 text-stone-900 px-5 py-2 rounded-full text-sm font-bold transition-transform transform hover:scale-105 shadow-md block"
                    >
                        Agendar Cita
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="absolute top-20 w-[90%] max-w-md bg-white shadow-xl rounded-2xl p-6 flex flex-col gap-4 md:hidden border border-stone-100 animate-in fade-in slide-in-from-top-5">
                    <Link to="/" className="text-lg font-bold text-accent hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Inicio</Link>
                    <Link to="/about" className="text-lg font-medium text-accent hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Sobre Mí</Link>
                    <Link to="/servicios" className="text-lg font-medium text-accent hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>Servicios</Link>
                    <Link to="/reino" className="text-lg font-medium text-accent hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>El Reino</Link>
                    <Link
                        to="/booking"
                        className="bg-conversion text-stone-900 px-5 py-3 rounded-xl text-center font-bold"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Agendar Cita
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
