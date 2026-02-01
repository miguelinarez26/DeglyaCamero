import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    Download,
    Headphones,
    FileText,
    Image as ImageIcon,
    Play,
    Star,
    PauseCircle,
    PenTool,
    Sparkles,
    BookOpen,
    ArrowDown
} from 'lucide-react';
import Navbar from './landing/Navbar';
import Footer from './landing/Footer';
import { BOOK_RESOURCES, LESSONS, REVIEWS } from '../data/bookData';

// Helper to resolve icons dynamically
const IconMap = {
    audio: Headphones,
    pdf: FileText,
    wallpaper: ImageIcon,
    PauseCircle: PauseCircle,
    PenTool: PenTool,
    Sparkles: Sparkles
};

const BookPage = () => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"]
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 0.5], [100, 0]);

    return (
        <div className="min-h-screen bg-booking-primary font-sans text-gray-100 selection:bg-gold selection:text-white overflow-x-hidden">
            <Navbar />

            {/* HERO SECTION */}
            <header className="relative pt-32 pb-20 lg:py-40 px-6 overflow-hidden">
                {/* Background Decor */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(13,148,136,0.3)_0%,transparent_50%)]"></div>
                    <div className="absolute top-20 right-20 w-72 h-72 bg-gold/10 rounded-full blur-[100px]"></div>
                </div>

                <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

                    {/* Text Column */}
                    <div className="space-y-8 text-center lg:text-left animate-in fade-in slide-in-from-bottom-10 duration-1000">
                        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-gold font-bold text-xs uppercase tracking-wider">
                            <Star size={14} fill="currentColor" />
                            <span>Best Seller</span>
                        </div>

                        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                            El Reino de <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-white">lo Posible</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto lg:mx-0 leading-relaxed font-body">
                            Has dado el primer paso. Este libro no es solo lectura, es una llave para desbloquear tu potencial latente y rediseñar tu realidad desde la consciencia.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
                            <a href="#" className="w-full sm:w-auto px-8 py-4 bg-gold hover:bg-gold/90 text-white font-bold rounded-full shadow-lg shadow-gold/20 transition-all transform hover:scale-105 flex items-center justify-center gap-2">
                                <BookOpen size={20} />
                                Comprar en Amazon
                            </a>
                            <a href="#vault" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/30 text-white hover:bg-white/10 font-bold rounded-full transition-all flex items-center justify-center gap-2">
                                <Download size={20} />
                                Ir a la Bóveda
                            </a>
                        </div>
                    </div>

                    {/* 3D Book Mockup */}
                    <div className="relative flex justify-center perspective-[1500px] hover:scale-105 transition-transform duration-500">
                        <div className="relative w-64 h-96 md:w-80 md:h-[480px] bg-[#1a1a1a] rounded-r-lg shadow-2xl transform-style-3d rotate-y-[-15deg] hover:rotate-y-[0deg] transition-all duration-700 ease-out group">
                            {/* Front Cover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-booking-primary to-[#1a1640] rounded-r-lg flex flex-col items-center justify-between p-8 border-l-4 border-gray-800 shadow-inner">
                                <div className="text-center space-y-2 mt-8">
                                    <p className="text-gold text-xs uppercase tracking-[0.2em]">Deglya Camero</p>
                                    <h2 className="font-display text-3xl font-bold text-white leading-tight">El Reino<br />de lo<br />Posible</h2>
                                </div>
                                <div className="text-center">
                                    <p className="text-[10px] text-gray-400 uppercase tracking-wider">Una guía para la transformación</p>
                                </div>
                                {/* Shine Effect */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-r-lg"></div>
                            </div>
                            {/* Spine */}
                            <div className="absolute top-0 bottom-0 left-0 w-12 bg-gray-900 origin-left rotate-y-90 translate-x-[-24px] rounded-l-sm flex items-center justify-center">
                                <span className="text-gold text-xs font-bold tracking-widest rotate-90 whitespace-nowrap">EL REINO DE LO POSIBLE</span>
                            </div>
                            {/* Pages */}
                            <div className="absolute top-2 bottom-2 right-2 w-10 bg-white transform translate-z-[-20px] rounded-r-sm shadow-md"></div>
                            {/* Shadow */}
                            <div className="absolute -bottom-10 left-10 w-full h-8 bg-black/50 blur-xl transform rotate-x-[60deg]"></div>
                        </div>
                    </div>

                </div>
            </header>

            {/* LESSONS SNEAK PEEK */}
            <section className="py-20 bg-white/5 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4">La Esencia del Viaje</h2>
                        <div className="w-24 h-1 bg-gold mx-auto rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {LESSONS.map((lesson) => {
                            const Icon = IconMap[lesson.iconName];
                            return (
                                <div key={lesson.id} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors group">
                                    <div className="w-12 h-12 bg-booking-secondary/20 rounded-xl flex items-center justify-center text-booking-secondary mb-6 group-hover:scale-110 transition-transform">
                                        <Icon size={24} />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 font-display">{lesson.title}</h3>
                                    <p className="text-gray-400 leading-relaxed text-sm">
                                        {lesson.text}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* THE VAULT (Resource Section) */}
            <section id="vault" className="py-24 relative" ref={targetRef}>
                <div className="absolute inset-0 bg-gradient-to-b from-booking-primary to-[#231e61]"></div>

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold text-booking-primary font-bold text-xs uppercase rounded-full mb-6">
                            <Sparkles size={12} fill="currentColor" />
                            <span>Exclusivo para Lectores</span>
                        </div>
                        <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Bóveda de Recursos</h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Material complementario diseñado para profundizar tu experiencia y llevar la teoría a la práctica.
                        </p>
                    </div>

                    <motion.div
                        style={{ opacity, y }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {BOOK_RESOURCES.map((resource) => {
                            const Icon = IconMap[resource.type] || FileText;
                            return (
                                <div key={resource.id} className="bg-white rounded-3xl p-6 shadow-xl hover:-translate-y-2 transition-transform duration-300 group cursor-pointer relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gold to-booking-secondary"></div>

                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-booking-primary group-hover:bg-booking-primary group-hover:text-white transition-colors duration-300">
                                            <Icon size={24} />
                                        </div>
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider bg-gray-100 px-2 py-1 rounded-md">
                                            {resource.type}
                                        </span>
                                    </div>

                                    <h3 className="font-display font-bold text-xl text-gray-900 mb-2 leading-tight">
                                        {resource.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 mb-6 line-clamp-2">
                                        {resource.description}
                                    </p>

                                    <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                                        <span className="text-xs font-semibold text-gray-400">{resource.size}</span>
                                        <button className="w-10 h-10 rounded-full bg-cream text-gold flex items-center justify-center hover:bg-gold hover:text-white transition-all shadow-sm">
                                            <Download size={18} />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>

            {/* REVIEWS */}
            <section className="py-20 bg-white text-booking-primary">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-center font-display text-3xl font-bold mb-16">Lo que dicen los lectores</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {REVIEWS.map((review) => (
                            <div key={review.id} className="bg-cream/50 p-8 rounded-2xl relative">
                                <Sparkles className="absolute top-6 right-6 text-gold/30" size={40} />
                                <div className="flex gap-1 text-gold mb-4">
                                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                </div>
                                <p className="text-deglya-wood text-lg italic mb-6 leading-relaxed">
                                    "{review.text}"
                                </p>
                                <div>
                                    <p className="font-bold text-booking-primary">{review.author}</p>
                                    <p className="text-sm text-gray-500 uppercase tracking-wider">{review.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default BookPage;
