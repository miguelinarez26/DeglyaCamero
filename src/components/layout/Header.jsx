import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { Button } from '../ui/Button';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="flex items-center justify-between py-6">
                    <Link to="/">
                        <Logo />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center gap-10 lg:flex">
                        <Link className="text-lg font-medium hover:text-primary dark:hover:text-sand transition-colors" to="/">Filosofía</Link>
                        <Link className="text-lg font-medium hover:text-primary dark:hover:text-sand transition-colors" to="/">Programas</Link>
                        <Link className="text-lg font-medium hover:text-primary dark:hover:text-sand transition-colors" to="/">Recursos</Link>
                        <Link className="text-lg font-medium hover:text-primary dark:hover:text-sand transition-colors" to="/">Contacto</Link>
                    </nav>

                    <div className="hidden items-center gap-4 lg:flex">
                        <Button>Agendar Cita</Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2 text-primary dark:text-sand"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className="absolute top-24 left-0 right-0 bg-white/95 dark:bg-background-dark/95 backdrop-blur-lg p-6 shadow-xl rounded-b-2xl lg:hidden border-t border-sand/20">
                        <nav className="flex flex-col gap-6 text-center">
                            <Link className="text-xl font-medium text-text-light dark:text-text-dark" to="/" onClick={() => setIsMenuOpen(false)}>Filosofía</Link>
                            <Link className="text-xl font-medium text-text-light dark:text-text-dark" to="/" onClick={() => setIsMenuOpen(false)}>Programas</Link>
                            <Link className="text-xl font-medium text-text-light dark:text-text-dark" to="/" onClick={() => setIsMenuOpen(false)}>Recursos</Link>
                            <Link className="text-xl font-medium text-text-light dark:text-text-dark" to="/" onClick={() => setIsMenuOpen(false)}>Contacto</Link>
                            <Button className="w-full" onClick={() => setIsMenuOpen(false)}>Agendar Cita</Button>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};
