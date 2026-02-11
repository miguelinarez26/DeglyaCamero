import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
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
    ArrowRight,
    Flower2,
    X,
    Lock,
    Layers,
    Video
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
    meditation: Flower2,
    PauseCircle: PauseCircle,
    PenTool: PenTool,
    Sparkles: Sparkles,
    Video: Video
};


const VaultCard = ({ resource, onClick }) => {
    const Icon = IconMap[resource.iconName] || IconMap[resource.type] || FileText;

    return (
        <div
            onClick={onClick}
            className="group relative w-full aspect-[4/5] cursor-pointer perspective-1000"
        >
            {/* Stack Effect - Bottom Card */}
            <div className="absolute inset-0 bg-stone-200 rounded-3xl transform scale-90 translate-y-4 opacity-0 group-hover:opacity-100 group-hover:rotate-6 transition-all duration-500 ease-out" />

            {/* Stack Effect - Middle Card */}
            <div className="absolute inset-0 bg-stone-300 rounded-3xl transform scale-95 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:-rotate-3 transition-all duration-500 ease-out delay-75" />

            {/* Main Card */}
            <div className="relative h-full w-full bg-[#EAE8E3] rounded-3xl border border-white/50 p-8 flex flex-col justify-between transition-transform duration-500 group-hover:-translate-y-2 shadow-sm hover:shadow-xl overflow-hidden">


                {/* Decorative BG Icon */}
                <div className="absolute -bottom-8 -right-8 text-stone-900/10 transform rotate-12 scale-150 transition-transform duration-700 group-hover:scale-175 pointer-events-none group-hover:text-yellow-500/20">
                    <Icon size={180} strokeWidth={1} />
                </div>

                <div className="relative z-10">
                    <div className="w-12 h-12 bg-stone-900/5 rounded-2xl flex items-center justify-center text-stone-700 mb-6 group-hover:bg-yellow-400 group-hover:text-stone-900 transition-colors duration-300">
                        <Icon size={24} />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-stone-900 leading-tight mb-2">
                        {resource.title}
                    </h3>
                    <p className="text-sm text-stone-600 font-medium opacity-80 mb-4">
                        {resource.count}
                    </p>
                </div>

                <div className="relative z-10 mt-auto">
                    <div className="flex items-center gap-2 text-stone-500 text-xs font-bold uppercase tracking-widest group-hover:text-stone-900 transition-colors">
                        <Layers size={14} />
                        <span>Ver Colección</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const VaultModal = ({ category, onClose }) => {
    if (!category) return null;
    const Icon = IconMap[category.iconName] || FileText;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-stone-900/40 backdrop-blur-md"
            />
            <motion.div
                layoutId={`card-${category.id}`}
                className="relative bg-[#F9F9F7] w-full max-w-lg rounded-3xl shadow-2xl border border-white/50 overflow-hidden max-h-[80vh] flex flex-col"
            >
                <div className="p-8 pb-0">
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center text-stone-900 shadow-sm">
                            <Icon size={28} />
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 bg-stone-200 hover:bg-stone-300 rounded-full text-stone-600 transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <h3 className="font-display text-3xl font-bold text-stone-900 mb-2">{category.title}</h3>
                    <p className="text-stone-600 leading-relaxed">{category.description}</p>
                </div>

                <div className="p-8 overflow-y-auto custom-scrollbar">
                    <div className="space-y-3">
                        {/* Placeholder Items matching the count */}
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex items-center justify-between p-4 bg-white/50 rounded-xl border border-stone-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                                        <Lock size={14} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-stone-700 font-bold text-sm">Recurso Premium {i + 1}</span>
                                        <span className="text-xs text-stone-400">Exclusivo para lectores</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-stone-200">
                        <button className="w-full py-3 bg-stone-900 text-white rounded-xl font-bold text-sm hover:bg-stone-800 transition-colors flex items-center justify-center gap-2">
                            Adquirir Libro para Desbloquear
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const TestimonialCard = ({ author, text, role }) => {
    return (
        <div className="flex flex-col justify-between rounded-xl border bg-white/90 backdrop-blur-sm p-6 shadow-sm hover:shadow-md transition-all duration-300 w-[350px] md:w-[400px] h-[220px] shrink-0 border-stone-200/50">
            <div className="flex gap-1 text-yellow-500 mb-4">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" className="text-yellow-400" />
                ))}
            </div>
            <p className="text-stone-700 text-base italic leading-relaxed line-clamp-4 mb-4">
                "{text}"
            </p>
            <div className="flex flex-col mt-auto">
                <span className="font-bold text-stone-900 text-sm">{author}</span>
                <span className="text-xs text-stone-500 font-medium uppercase tracking-wider">{role}</span>
            </div>
        </div>
    );
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

    const [selectedCategory, setSelectedCategory] = React.useState(null);

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

            {/* Modal Layer */}
            {selectedCategory && (
                <VaultModal
                    category={selectedCategory}
                    onClose={() => setSelectedCategory(null)}
                />
            )}

            {/* MECHANISM: Fixed Background Layer */}
            <motion.div
                style={{ backgroundColor }}
                className="fixed inset-0 w-full h-full -z-50 will-change-[background-color]"
            />

            {/* Content Container (dynamically colored text) */}
            <motion.div style={{ color: textColor }} className="relative z-10 font-sans">

                {/* === HERO SECTION === */}
                <header className="relative pt-24 pb-12 lg:pt-24 lg:pb-20 px-6 overflow-hidden min-h-screen flex items-start">
                    {/* Background Decor */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <div className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-[100px]"></div>
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
                        {/* Text Column */}
                        <div className="space-y-6 text-center lg:text-left animate-in fade-in slide-in-from-bottom-10 duration-1000">

                            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight drop-shadow-lg">
                                El Reino de <br />
                                <span className="text-white">lo Posible</span>
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
                                    Entrar al Laboratorio
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
                                    <div key={lesson.id} className="bg-white/90 backdrop-blur-md border border-white/50 p-8 rounded-3xl hover:-translate-y-2 transition-all duration-300 group shadow-lg">
                                        <div className="w-14 h-14 bg-stone-100 rounded-2xl flex items-center justify-center text-stone-900 mb-6 group-hover:scale-110 transition-transform shadow-sm">
                                            <Icon size={28} />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-3 font-display text-stone-900">{lesson.title}</h3>
                                        <p className="leading-relaxed text-sm text-stone-700 font-medium">
                                            {lesson.text}
                                        </p>
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
                            <h2 className="font-display text-4xl md:text-6xl font-bold mb-6 drop-shadow-sm">Laboratorio de Consciencia</h2>
                            <motion.p style={{ color: muteTextColor }} className="text-xl max-w-2xl mx-auto">
                                Material complementario diseñado para profundizar tu experiencia y llevar la teoría a la práctica.
                            </motion.p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {BOOK_RESOURCES.map((resource) => (
                                <VaultCard
                                    key={resource.id}
                                    resource={resource}
                                    onClick={() => setSelectedCategory(resource)}
                                />
                            ))}
                        </div>
                    </div>
                </section>

                {/* === REVIEWS === */}
                <section className="py-24 relative overflow-hidden">
                    <div
                        className="relative flex w-full flex-col items-center justify-center overflow-hidden"
                        style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
                    >
                        <div className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row [--duration:50s]">
                            {/* First Marquee Set */}
                            <div className="flex shrink-0 items-center [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
                                {REVIEWS.map((review, i) => (
                                    <TestimonialCard
                                        key={`a-${review.id}`}
                                        {...review}
                                    />
                                ))}
                            </div>

                            {/* Second Marquee Set (Clone for Loop) */}
                            <div className="flex shrink-0 items-center [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]" aria-hidden="true">
                                {REVIEWS.map((review, i) => (
                                    <TestimonialCard
                                        key={`b-${review.id}`}
                                        {...review}
                                    />
                                ))}
                            </div>
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
