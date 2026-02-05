import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './landing/Navbar';
import Footer from './landing/Footer';
import ServiceModal from './services/ServiceModal';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SERVICES_DATA } from '../data/services';

const ServicesPage = () => {
    const [selectedService, setSelectedService] = useState(null);
    const [filter, setFilter] = useState('all'); // all, personas, empresas

    const filteredServices = SERVICES_DATA.filter(service =>
        filter === 'all' ? true : service.category === filter
    );

    return (
        <div className="min-h-screen bg-canvas font-sans selection:bg-conversion selection:text-stone-900">
            <Navbar />

            <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-bottom-5 duration-700">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-conversion/10 text-conversion text-xs font-bold uppercase tracking-wider mb-6">
                        <Sparkles size={14} />
                        <span>Catálogo de Servicios</span>
                    </div>
                    <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-structure mb-6">
                        Soluciones para el <span className="italic text-conversion">Bienestar</span>
                    </h1>
                    <p className="text-lg text-accent/80 leading-relaxed font-body">
                        Explora nuestras soluciones integrales diseñadas para potenciar el crecimiento personal y el éxito organizacional a través de la psicología y el coaching.
                    </p>

                    {/* Filter Tabs */}
                    <div className="mt-10 inline-flex p-1 bg-white rounded-full shadow-sm border border-stone-200">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${filter === 'all' ? 'bg-structure text-white shadow-md' : 'text-stone-500 hover:text-structure'}`}
                        >
                            Todos
                        </button>
                        <button
                            onClick={() => setFilter('personas')}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${filter === 'personas' ? 'bg-structure text-white shadow-md' : 'text-stone-500 hover:text-structure'}`}
                        >
                            Personas
                        </button>
                        <button
                            onClick={() => setFilter('empresas')}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${filter === 'empresas' ? 'bg-structure text-white shadow-md' : 'text-stone-500 hover:text-structure'}`}
                        >
                            Empresas
                        </button>
                    </div>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredServices.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <motion.div
                                key={service.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => setSelectedService(service)}
                                className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-stone-100 hover:border-conversion/30 transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full"
                            >
                                <div className={`h-48 overflow-hidden relative ${service.category === 'empresas' ? 'bg-structure' : 'bg-conversion'}`}>
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover opacity-80 mix-blend-overlay group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className={`absolute inset-0 bg-gradient-to-t ${service.category === 'empresas' ? 'from-structure/90' : 'from-conversion/90'} to-transparent opacity-90`}></div>
                                    <div className="absolute bottom-4 left-6 text-white">
                                        <Icon size={32} />
                                    </div>
                                    {/* Category pill */}
                                    <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider border border-white/30">
                                        {service.category}
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-grow">
                                    <h3 className="font-display font-bold text-xl text-structure mb-3 group-hover:text-conversion transition-colors">
                                        {service.title}
                                    </h3>
                                    <p className="text-sm text-stone-600 leading-relaxed mb-6 flex-grow">
                                        {service.shortDescription}
                                    </p>
                                    <div className="mt-auto flex items-center justify-between border-t border-stone-100 pt-4">
                                        <span className="text-conversion font-bold text-xs uppercase tracking-wider flex items-center gap-1 group-hover:gap-2 transition-all">
                                            Ver detalles <ArrowRight size={14} />
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Banner CTA */}
                <div className="mt-20 bg-structure rounded-3xl p-8 md:p-12 relative overflow-hidden text-center text-white shadow-2xl">
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <h2 className="font-display text-3xl font-bold">¿Necesitas una propuesta personalizada?</h2>
                        <p className="text-white/80 text-lg">
                            Diseñamos planes de bienestar corporativo y acompañamiento personal a la medida de tus necesidades.
                        </p>
                        <a href="#contacto" className="inline-block bg-conversion hover:bg-conversion/90 text-stone-900 px-8 py-3 rounded-full font-bold transition-all shadow-lg hover:shadow-conversion/50 transform hover:scale-105">
                            Contactar Especialista
                        </a>
                    </div>
                </div>

            </main>

            <Footer />

            {/* Modal */}
            {selectedService && (
                <ServiceModal
                    service={selectedService}
                    onClose={() => setSelectedService(null)}
                />
            )}
        </div>
    );
};

export default ServicesPage;
