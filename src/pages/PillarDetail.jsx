import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, CheckCircle2 } from 'lucide-react';
import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';
import { PILLARS_DATA } from '../data/pillars';

const PillarDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pillar, setPillar] = useState(null);

    useEffect(() => {
        if (PILLARS_DATA[id]) {
            setPillar(PILLARS_DATA[id]);
            window.scrollTo(0, 0);
        } else {
            navigate('/servicios');
        }
    }, [id, navigate]);

    if (!pillar) return null;

    return (
        <div className="min-h-screen bg-[#FDFCFB] font-sans selection:bg-[#D1554A] selection:text-white">
            <Navbar />

            <main className="pt-32 pb-24 px-6 lg:px-12 max-w-7xl mx-auto">
                {/* Volver */}
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-stone-500 hover:text-stone-800 transition-colors mb-12 group"
                >
                    <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                    <span className="text-sm font-bold uppercase tracking-widest">Volver</span>
                </button>

                <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left: Content Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-10"
                    >
                        <div>
                            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D1554A]/10 text-[#D1554A] text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-[#D1554A]/20">
                                <Sparkles size={12} />
                                {pillar.tag}
                            </span>
                            <h1 className="font-display text-4xl lg:text-6xl text-stone-900 font-bold mb-6 leading-tight">
                                {pillar.title}
                            </h1>
                            <p className="text-lg text-stone-600 leading-relaxed font-medium italic">
                                "{pillar.description}"
                            </p>
                        </div>

                        {/* Sections List */}
                        <div className="space-y-12">
                            {pillar.sections.map((section, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * idx }}
                                    className="bg-white/50 border border-stone-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <h3 className="text-2xl font-display font-bold text-stone-800 mb-4 flex items-center gap-3">
                                        <span className="text-[#D1554A] font-bold text-3xl opacity-20">{section.id}.</span>
                                        {section.subtitle}
                                    </h3>
                                    <p className="text-stone-600 leading-relaxed text-base">
                                        {section.content}
                                    </p>
                                    {section.links && (
                                        <div className="mt-6 flex flex-wrap gap-3">
                                            {section.links.map((link, lIdx) => (
                                                <a
                                                    key={lIdx}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-stone-100 hover:bg-[#D1554A] text-stone-700 hover:text-white text-xs font-bold transition-all border border-stone-200 hover:border-transparent shadow-sm"
                                                >
                                                    {link.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                    {section.list && (
                                        <ul className="mt-6 space-y-3">
                                            {section.list.map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 text-stone-600 font-medium text-sm">
                                                    <CheckCircle2 size={16} className="text-[#D1554A] mt-1 flex-shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Sticky Image & Contact */}
                    <div className="lg:sticky lg:top-36 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl"
                        >
                            <img
                                src={import.meta.env.BASE_URL + pillar.image}
                                alt={pillar.title}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>
                        </motion.div>

                        {/* CTA Sidebar Card */}
                        <div className="bg-[#2F3E30] rounded-[2.5rem] p-10 text-white shadow-xl relative overflow-hidden group">
                            {/* Abstract Decor */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>

                            <h4 className="text-2xl font-display font-bold mb-4 relative z-10">¿Listo para comenzar?</h4>
                            <p className="text-white/80 mb-8 text-sm leading-relaxed relative z-10">
                                Agenda una consulta inicial para evaluar tu situación y elegir la mejor ruta para tu rediseño personal.
                            </p>
                            <button
                                onClick={() => navigate('/contacto')}
                                className="w-full py-4 rounded-full bg-white text-[#2F3E30] font-bold text-lg hover:shadow-[0_10px_30px_rgba(255,255,255,0.2)] transition-all transform hover:-translate-y-1 relative z-10"
                            >
                                Agendar Consulta
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PillarDetail;
