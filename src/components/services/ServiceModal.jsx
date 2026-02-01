import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceModal = ({ service, onClose }) => {
    if (!service) return null;

    const Icon = service.icon;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                />

                {/* Modal Content */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl overflow-hidden z-[101]"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 z-10 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-md"
                    >
                        <X size={20} />
                    </button>

                    <div className="grid md:grid-cols-2 h-full">
                        {/* Image Side */}
                        <div className="relative h-64 md:h-auto bg-deep-teal">
                            <img
                                src={service.image}
                                alt={service.title}
                                className="w-full h-full object-cover mix-blend-overlay opacity-80"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-deep-teal/90 to-transparent flex flex-col justify-end p-8">
                                <div className="bg-white/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                                    <Icon className="text-gold" size={24} />
                                </div>
                                <h2 className="font-display text-3xl font-bold text-white mb-2">{service.title}</h2>
                                <p className="text-white/80 text-sm font-medium tracking-wide uppercase">{service.category}</p>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="p-8 md:p-10 flex flex-col h-full bg-white">
                            <div className="flex-grow">
                                <h3 className="text-xl font-bold text-deep-teal mb-4">¿En qué consiste?</h3>
                                <p className="text-gray-600 leading-relaxed mb-8">
                                    {service.fullDescription}
                                </p>

                                <h4 className="text-sm font-bold text-deep-teal uppercase tracking-wider mb-4">Lo que incluye:</h4>
                                <ul className="space-y-3 mb-8">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <CheckCircle className="text-gold shrink-0 mt-0.5" size={18} />
                                            <span className="text-gray-700 text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="mt-auto pt-6 border-t border-gray-100 flex items-center justify-between gap-4">
                                <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Inversión</p>
                                    <p className="text-2xl font-bold text-deep-teal font-display">{service.price}</p>
                                </div>
                                <Link
                                    to="/contacto"
                                    onClick={onClose} // In a real app navigate might auto-close or we might keep it open
                                    className="bg-deep-teal hover:bg-gold text-white px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 group"
                                >
                                    {service.cta}
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default ServiceModal;
