import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    Download,
    Headphones,
    FileText,
    Image as ImageIcon,
    Sparkles,
    BookOpen,
    Star,
    PauseCircle,
    PenTool,
    ArrowRight
} from 'lucide-react';
import Navbar from './landing/Navbar';
import Footer from './landing/Footer';
import { BOOK_RESOURCES, LESSONS, REVIEWS } from '../data/bookData';
import bookCover3D from '../assets/brand/book-cover-3d.png';

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
    // Scroll Tracking
    const { scrollYProgress } = useScroll();

    // 1. La Verdad Visual (Paleta Estricta Reino)
    // #009ADE (Top) -> #B7C9CF (Mid) -> #FEF3E1 (Bottom)
    const backgroundColor = useTransform(
        scrollYProgress,
        [0, 0.4, 0.8],
        ['#009ADE', '#B7C9CF', '#FEF3E1']
    );

    // Typography Correction: White on Blue, Dark on Cream
    const textColor = useTransform(
        scrollYProgress,
        [0, 0.3, 0.6],
        ['#FFFFFF', '#FFFFFF', '#1e293b'] // White -> White -> Slate-800
    );

    // Specific text colors for lighter sections
    const muteTextColor = useTransform(
        scrollYProgress,
        [0, 0.5],
        ['rgba(255,255,255,0.7)', 'rgba(30, 41, 59, 0.7)']
    );

    const targetRef = useRef(null);

    return (
        <div className="relative min-h-[300vh] font-sans overflow-x-hidden">
            <Navbar />

            {/* MECHANISM: Fixed Background Layer */}
            <motion.div
                style={{ backgroundColor }}
                className="fixed inset-0 w-full h-full -z-50 will-change-[background-color]"
            />

            {/* Content Container (dynamically colored text) */}
            <motion.div style={{ color: textColor }} className="relative z-10 font-sans">

                {/* === HERO SECTION === */}
                <header className="relative pt-32 pb-20 lg:py-40 px-6 overflow-hidden min-h-screen flex items-center">
                    {/* Background Decor */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-[100px]"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                        {/* Text Column */}
                        <div className="space-y-8 text-center lg:text-left animate-in fade-in slide-in-from-bottom-10 duration-1000">
                            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-white font-bold text-xs uppercase tracking-wider">
                                <Star size={14} fill="currentColor" className="text-yellow-400" />
                                <span>Best Seller</span>
                            </div>

                            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-lg">
                                El Reino de <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-white">lo Posible</span>
                            </h1>

                            <motion.p style={{ color: muteTextColor }} className="text-lg md:text-xl max-w-xl mx-auto lg:mx-0 leading-relaxed font-body">
                                Has dado el primer paso. Este libro no es solo lectura, es una llave para desbloquear tu potencial latente y rediseñar tu realidad desde la consciencia.
                            </motion.p>

                            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
                                <a href="#" className="w-full sm:w-auto px-8 py-4 bg-yellow-500 hover:bg-yellow-400 text-stone-900 font-bold rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-2">
                                    <BookOpen size={20} />
                                    Comprar en Amazon
                                </a>
                                <a href="#vault" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-current text-current hover:bg-white/10 font-bold rounded-full transition-all flex items-center justify-center gap-2">
                                    <Download size={20} />
                                    Ir a la Bóveda
                                </a>
                            </div>
                        </div>

                        {/* 3D Book Mockup */}
                        <div className="relative flex justify-center perspective-[1500px] hover:scale-105 transition-transform duration-500">
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                src={bookCover3D}
                                alt="El Reino de lo Posible"
                                className="relative w-64 lg:w-96 h-auto object-contain z-10 drop-shadow-2xl"
                            />
                        </div>
                    </div>
                </header>

                {/* === LESSONS SNEAK PEEK === */}
                <section className="py-32 relative text-current">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 drop-shadow-sm">La Esencia del Viaje</h2>
                            <div className="w-24 h-1 bg-current mx-auto rounded-full opacity-50"></div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {LESSONS.map((lesson) => {
                                const Icon = IconMap[lesson.iconName];
                                return (
                                    <div key={lesson.id} className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl hover:bg-white/20 transition-all group">
                                        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-current mb-6 group-hover:scale-110 transition-transform shadow-inner">
                                            <Icon size={28} />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-3 font-display">{lesson.title}</h3>
                                        <motion.p style={{ color: muteTextColor }} className="leading-relaxed text-sm">
                                            {lesson.text}
                                        </motion.p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* === THE VAULT === */}
                <section id="vault" className="py-32 relative" ref={targetRef}>
                    <div className="relative z-10 max-w-7xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400 text-stone-900 font-bold text-xs uppercase rounded-full mb-6 shadow-lg">
                                <Sparkles size={12} fill="currentColor" />
                                <span>Exclusivo para Lectores</span>
                            </div>
                            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 drop-shadow-sm">Bóveda de Recursos</h2>
                            <motion.p style={{ color: muteTextColor }} className="text-xl max-w-2xl mx-auto">
                                Material complementario diseñado para profundizar tu experiencia y llevar la teoría a la práctica.
                            </motion.p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {BOOK_RESOURCES.map((resource) => {
                                const Icon = IconMap[resource.type] || FileText;
                                return (
                                    <div key={resource.id} className="bg-white/80 dark:bg-stone-800/80 backdrop-blur text-stone-800 dark:text-gray-100 rounded-3xl p-8 shadow-xl hover:-translate-y-2 transition-transform duration-300 group cursor-pointer relative overflow-hidden border border-white/50">
                                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-yellow-400 to-orange-400"></div>

                                        <div className="flex justify-between items-start mb-6">
                                            <div className="w-12 h-12 rounded-2xl bg-stone-100 dark:bg-stone-700 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                                <Icon size={24} />
                                            </div>
                                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-gray-100 dark:bg-stone-700 px-2 py-1 rounded-md">
                                                {resource.type}
                                            </span>
                                        </div>

                                        <h3 className="font-display font-bold text-xl mb-3 leading-tight">
                                            {resource.title}
                                        </h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 line-clamp-2">
                                            {resource.description}
                                        </p>

                                        <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-xs font-semibold text-gray-400">{resource.size}</span>
                                            <button className="w-8 h-8 rounded-full bg-stone-100 text-stone-600 flex items-center justify-center hover:bg-yellow-400 hover:text-stone-900 transition-all">
                                                <Download size={14} />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* === REVIEWS === */}
                <section className="py-24 relative">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="grid md:grid-cols-3 gap-8">
                            {REVIEWS.map((review) => (
                                <div key={review.id} className="bg-white/40 backdrop-blur border border-white/50 p-8 rounded-2xl relative shadow-sm">
                                    <div className="flex gap-1 text-yellow-500 mb-4">
                                        {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                                    </div>
                                    <p className="text-stone-800 text-lg italic mb-6 leading-relaxed">
                                        "{review.text}"
                                    </p>
                                    <div>
                                        <p className="font-bold text-stone-900">{review.author}</p>
                                        <p className="text-xs text-stone-500 uppercase tracking-wider">{review.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

            </motion.div>

            <div className="relative z-10 bg-white">
                <Footer />
            </div>
        </div>
    );
};

export default BookPage;
