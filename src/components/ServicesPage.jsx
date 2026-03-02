import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from './landing/Navbar';
import Footer from './landing/Footer';
import ServiceModal from './services/ServiceModal';
import { ArrowRight, Sparkles, Check, ChevronDown } from 'lucide-react';
import { SERVICES_DATA } from '../data/services';

const ServicesPage = () => {
    const [selectedService, setSelectedService] = useState(null);
    const [filter, setFilter] = useState('all'); // all, personas, empresas

    // Dropdown form state
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedArea, setSelectedArea] = useState("");

    const areaOptions = [
        { value: 'corporativo', label: 'Consultoría para Empresas' },
        { value: 'individual', label: 'Acompañamiento Personal' },
        { value: 'otro', label: 'Otro Enfoque' },
    ];

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
                                className="group cursor-pointer relative flex flex-col h-full bg-[#F4EFE6] rounded-3xl p-6 lg:p-7 shadow-sm transition-all duration-500 overflow-hidden hover:-translate-y-1 hover:shadow-xl"
                            >
                                {/* Hover Gradient Background */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#D96B2F] via-[#DB5E42] to-[#D35355] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"></div>

                                <div className="relative z-10 flex flex-col h-full">
                                    {/* Top Text Area (Title & Subtitle) */}
                                    <div className="mb-4">
                                        <h3 className="text-2xl font-medium font-display text-stone-800 group-hover:text-white transition-colors duration-500">
                                            {service.title}
                                        </h3>
                                        <p className="text-conversion group-hover:text-white transition-colors duration-500 font-bold text-sm mt-1">
                                            {service.price || "Contactar"}
                                        </p>
                                    </div>

                                    {/* Image Box */}
                                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 bg-[#E8E2D6] flex-shrink-0">
                                        <img src={service.image} alt={service.title} className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${service.imagePosition || 'object-center'}`} />
                                    </div>

                                    {/* Features & Description */}
                                    <div className="flex-grow space-y-4 mb-6">
                                        <p className="text-stone-600 group-hover:text-white transition-colors duration-500 text-sm leading-relaxed line-clamp-2">
                                            {service.shortDescription}
                                        </p>
                                        <ul className="space-y-2">
                                            {(service.features || []).slice(0, 3).map((feature, idx) => (
                                                <li key={idx} className="flex items-start text-xs font-semibold text-stone-600 group-hover:text-white transition-colors duration-500">
                                                    <div className="rounded-full mr-2 mt-0.5 text-conversion group-hover:text-white transition-colors duration-500">
                                                        <Check size={14} strokeWidth={3} />
                                                    </div>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Bottom Buttons (CTA) */}
                                    <div className="flex items-center justify-end mt-auto pt-2 gap-2">
                                        {/* Action Button */}
                                        <button
                                            className="py-2.5 px-5 rounded-full border border-stone-800 text-stone-800 text-sm font-medium transition-colors group-hover:border-white group-hover:text-white hover:bg-stone-800 hover:text-white group-hover:hover:bg-white group-hover:hover:text-[#D1554A] whitespace-nowrap"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            {service.cta || "Ver más"}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Banner CTA (Custom Proposal) */}
                <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 rounded-[2.5rem] overflow-hidden bg-[#F4EFE6] shadow-sm hover:shadow-xl transition-shadow duration-500">
                    {/* Left: Image */}
                    <div className="relative min-h-[450px] lg:min-h-full">
                        <img
                            src={import.meta.env.BASE_URL + "images/_AND7822.jpg"}
                            alt="Deglya Camero"
                            className="absolute inset-0 w-full h-full object-cover"
                            style={{ objectPosition: 'center 75%' }}
                        />
                    </div>

                    {/* Right: Form */}
                    <div className="p-10 lg:p-16 flex flex-col justify-center">
                        <div className="text-center mb-10">
                            <h2 className="font-display text-4xl lg:text-4xl font-bold text-stone-800 mb-4 tracking-tight">
                                ¿Necesitas una propuesta personalizada?
                            </h2>
                            <p className="text-stone-600 text-lg">
                                Diseñamos planes de bienestar corporativo y acompañamiento analítico a la medida de tu empresa o necesidades personales.
                            </p>
                        </div>

                        <form className="space-y-4 max-w-lg mx-auto w-full">
                            <div className="w-full">
                                <input
                                    type="text"
                                    placeholder="Tu Nombre / Empresa"
                                    className="w-full px-6 py-4 rounded-full border-[1.5px] border-stone-800 bg-transparent placeholder:text-stone-500 text-stone-800 focus:outline-none focus:border-conversion focus:ring-1 focus:ring-conversion transition-colors"
                                />
                            </div>
                            <div className="w-full">
                                <input
                                    type="tel"
                                    placeholder="Tu Teléfono"
                                    className="w-full px-6 py-4 rounded-full border-[1.5px] border-stone-800 bg-transparent placeholder:text-stone-500 text-stone-800 focus:outline-none focus:border-conversion focus:ring-1 focus:ring-conversion transition-colors"
                                />
                            </div>
                            <div className="w-full relative">
                                <div
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="w-full px-6 py-4 rounded-full border-[1.5px] border-stone-800 bg-transparent text-stone-800 focus:outline-none hover:border-conversion transition-colors cursor-pointer flex justify-between items-center"
                                >
                                    <span className={selectedArea ? "text-stone-800" : "text-stone-500"}>
                                        {selectedArea ? areaOptions.find(o => o.value === selectedArea)?.label : "Área de Interés"}
                                    </span>
                                    <ChevronDown
                                        className={`text-stone-800 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                        size={18}
                                    />
                                </div>

                                {/* Custom Dropdown Menu */}
                                {isDropdownOpen && (
                                    <>
                                        <div
                                            className="fixed inset-0 z-40"
                                            onClick={() => setIsDropdownOpen(false)}
                                        ></div>
                                        <div className="absolute top-full left-0 w-full mt-2 bg-[#F4EFE6] border-[1.5px] border-stone-800 rounded-3xl shadow-xl overflow-hidden z-50 flex flex-col">
                                            {areaOptions.map((option) => (
                                                <div
                                                    key={option.value}
                                                    onClick={() => {
                                                        setSelectedArea(option.value);
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    className="px-6 py-4 cursor-pointer hover:bg-stone-800 text-stone-700 hover:text-white transition-colors border-b border-stone-800/10 last:border-0 font-medium"
                                                >
                                                    {option.label}
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="w-full">
                                <textarea
                                    placeholder="Cuéntanos brevemente sobre tu equipo o desafío actual..."
                                    rows="4"
                                    className="w-full px-6 py-4 rounded-3xl border-[1.5px] border-stone-800 bg-transparent placeholder:text-stone-500 text-stone-800 focus:outline-none focus:border-conversion focus:ring-1 focus:ring-conversion transition-colors resize-none"
                                ></textarea>
                            </div>

                            <div className="pt-2">
                                <button
                                    type="button"
                                    className="w-full btn-wellness text-white font-bold text-lg py-4 rounded-full shadow-lg hover:shadow-conversion/50 focus:outline-none"
                                >
                                    Contactar Especialista
                                </button>
                            </div>
                        </form>
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
