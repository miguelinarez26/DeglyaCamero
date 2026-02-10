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
                                className={`group cursor-pointer relative bg-white rounded-3xl overflow-hidden transition-all duration-500 transform hover:-translate-y-1 h-[450px]
                                    ${service.category === 'personas'
                                        ? 'border-2 border-transparent hover:border-yellow-400/50 hover:shadow-[0_0_20px_rgba(250,204,21,0.3)]'
                                        : 'border-2 border-transparent hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]'}
                                    shadow-sm`}
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-contain object-center px-6 pt-6 pb-32 transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent"></div>
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                                    {/* Top Metadata */}
                                    <div className="absolute top-6 left-6 right-6 flex justify-between items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="bg-structure/5 backdrop-blur-sm p-3 rounded-full text-structure border border-structure/10 shadow-sm">
                                            <Icon size={20} />
                                        </div>
                                        <div className="bg-structure backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-md">
                                            {service.category}
                                        </div>
                                    </div>

                                    {/* Bottom Text */}
                                    <div className="transform transition-all duration-500 translate-y-2 group-hover:translate-y-0 relative z-10">
                                        <h3 className="font-display font-bold text-2xl text-structure mb-2 drop-shadow-sm">
                                            {service.title}
                                        </h3>
                                        <p className="text-stone-600 text-sm leading-relaxed mb-4 line-clamp-3 font-medium">
                                            {service.shortDescription}
                                        </p>

                                        <div className="border-t border-stone-200 pt-4 flex items-center justify-between">
                                            <span className="text-conversion font-bold text-xs uppercase tracking-wider flex items-center gap-2 group-hover:gap-3 transition-all">
                                                Ver detalles
                                                <ArrowRight size={14} className="text-conversion" />
                                            </span>
                                        </div>
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
