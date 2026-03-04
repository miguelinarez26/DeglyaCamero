import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Check, ArrowRight, Menu, Mail, Facebook, Twitter, Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Shared Components (Duplicated for standalone page consistency) ---
// In a real refactor, these would move to src/components/layout/

import Navbar from '../components/landing/Navbar';
import Footer from '../components/landing/Footer';


// Mock Data for Services
const servicesData = {
    personas: [
        {
            title: "Psicoterapia Individual",
            description: "Un espacio seguro para explorar tu mundo interno y sanar heridas profundas.",
            features: ["Sesiones de 50 min", "Modalidad Online/Presencial", "Enfoque Integrativo Destino"],
            price: "$80 / sesión",
            cta: "Reservar Cita",
            img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1000&auto=format&fit=crop"
        },
        {
            title: "Coaching de Vida",
            description: "Diseña el futuro que deseas con herramientas prácticas y acompañamiento.",
            features: ["Definición de Metas", "Plan de Acción", "Seguimiento Semanal"],
            price: "$100 / sesión",
            cta: "Iniciar Proceso",
            img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop"
        },
        {
            title: "Talleres de Bienestar",
            description: "Experiencias grupales para reconectar con tu esencia y vitalidad.",
            features: ["Grupos reducidos", "Material incluido", "Comunidad de apoyo"],
            price: "Desde $45",
            cta: "Ver Próximos Eventos",
            img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1000&auto=format&fit=crop"
        }
    ],
    empresas: [
        {
            title: "Liderazgo Consciente",
            description: "Formación para líderes que buscan inspirar y gestionar con empatía.",
            features: ["Evaluación 360", "Mentoring Ejecutivo", "Resultados Medibles"],
            price: "Consultar",
            cta: "Solicitar Propuesta",
            img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop"
        },
        {
            title: "Team Building 'Vital'",
            description: "Actividades diseñada para fortalecer la cohesión y la comunicación.",
            features: ["Indoor/Outdoor", "Dinámicas Gamificadas", "Reporte de Impacto"],
            price: "Consultar",
            cta: "Cotizar Experiencia",
            img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1000&auto=format&fit=crop"
        },
        {
            title: "Bienestar Corporativo",
            description: "Programas integrales de salud mental y emocional para tu equipo.",
            features: ["Charlas y Webinars", "Soporte Psicológico", "Línea de Ayuda"],
            price: "A medida",
            cta: "Hablar con un Asesor",
            img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop"
        }
    ]
};

export default function Services() {
    const [searchParams, setSearchParams] = useSearchParams();
    const typeParam = searchParams.get('type');
    const [activeTab, setActiveTab] = useState(typeParam === 'empresas' ? 'empresas' : 'personas');
    const navigate = useNavigate();

    useEffect(() => {
        if (typeParam && (typeParam === 'empresas' || typeParam === 'personas')) {
            setActiveTab(typeParam);
        }
    }, [typeParam]);

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        setSearchParams({ type: tab });
    };

    return (
        <div className="flex min-h-screen flex-col bg-deglya-cream font-sans selection:bg-deglya-mustard selection:text-white">
            <Navbar />

            <main className="flex-grow pt-32 pb-24 px-6">
                {/* Header Section */}
                <div className="max-w-6xl mx-auto text-center space-y-6 mb-16 relative">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-deglya-mustard/20 rounded-full"></div>

                    <h1 className="text-4xl md:text-6xl font-display font-medium text-deglya-teal">
                        Nuestros Servicios
                    </h1>
                    <p className="text-deglya-wood max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
                        Soluciones diseñadas con <span className="font-bold text-deglya-mustard">precisión científica</span> y <span className="font-bold text-deglya-mustard">calidez humana</span> para cada etapa de tu camino.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-16">
                    <div className="bg-white/50 backdrop-blur-sm p-2 rounded-full shadow-lg border border-white/60 inline-flex">
                        <button
                            onClick={() => handleTabChange('personas')}
                            className={cn(
                                "px-8 py-3 rounded-full text-base font-bold transition-all duration-300 tracking-wide",
                                activeTab === 'personas'
                                    ? "bg-deglya-teal text-white shadow-md transform scale-105"
                                    : "text-deglya-wood hover:text-deglya-teal hover:bg-white/50"
                            )}
                        >
                            PERSONAS
                        </button>
                        <button
                            onClick={() => handleTabChange('empresas')}
                            className={cn(
                                "px-8 py-3 rounded-full text-base font-bold transition-all duration-300 tracking-wide",
                                activeTab === 'empresas'
                                    ? "bg-deglya-mustard text-deglya-wood shadow-md transform scale-105"
                                    : "text-deglya-wood hover:text-deglya-mustard hover:bg-white/50"
                            )}
                        >
                            EMPRESAS
                        </button>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {servicesData[activeTab].map((service, index) => (
                        <div key={index} className="group relative flex flex-col h-full bg-[#F4EFE6] rounded-3xl p-6 lg:p-7 shadow-sm transition-all duration-500 overflow-hidden hover:-translate-y-1 hover:shadow-xl">
                            {/* Hover Gradient Background */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#D96B2F] via-[#DB5E42] to-[#D35355] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"></div>

                            <div className="relative z-10 flex flex-col h-full">
                                {/* Top Text Area (Title & Subtitle) */}
                                <div className="mb-4">
                                    <h3 className="text-2xl font-medium font-display text-stone-800 group-hover:text-white transition-colors duration-500">
                                        {service.title}
                                    </h3>
                                    <p className="text-conversion group-hover:text-white transition-colors duration-500 font-bold text-sm mt-1">
                                        {service.price}
                                    </p>
                                </div>

                                {/* Image Box */}
                                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden mb-5 flex-shrink-0">
                                    <img src={service.img} alt={service.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                </div>

                                {/* Features & Description */}
                                <div className="flex-grow space-y-4 mb-6">
                                    <p className="text-stone-600 group-hover:text-white transition-colors duration-500 text-sm leading-relaxed">
                                        {service.description}
                                    </p>
                                    <ul className="space-y-2">
                                        {service.features.map((feature, idx) => (
                                            <li key={idx} className="flex items-start text-xs font-semibold text-stone-600 group-hover:text-white transition-colors duration-500">
                                                <div className="rounded-full mr-2 mt-0.5 text-conversion group-hover:text-white transition-colors duration-500">
                                                    <Check size={14} strokeWidth={3} />
                                                </div>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Bottom Buttons (Social & CTA) */}
                                <div className="flex items-center justify-between mt-auto pt-2 gap-2">
                                    {/* Circular Social Buttons */}
                                    <div className="flex gap-2">
                                        <button className="w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center transition-colors group-hover:border-white group-hover:text-white text-stone-800 group-hover:hover:bg-white group-hover:hover:text-[#D1554A] hover:bg-stone-800 hover:text-white" aria-label="Facebook">
                                            <Facebook size={16} fill="currentColor" className="opacity-80" />
                                        </button>
                                        <button className="w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center transition-colors group-hover:border-white group-hover:text-white text-stone-800 group-hover:hover:bg-white group-hover:hover:text-[#D1554A] hover:bg-stone-800 hover:text-white" aria-label="Twitter">
                                            <Twitter size={16} fill="currentColor" strokeWidth={0} className="opacity-80" />
                                        </button>
                                        <button className="w-10 h-10 rounded-full border border-stone-300 flex items-center justify-center transition-colors group-hover:border-white group-hover:text-white text-stone-800 group-hover:hover:bg-white group-hover:hover:text-[#D1554A] hover:bg-stone-800 hover:text-white" aria-label="LinkedIn">
                                            <Linkedin size={16} fill="currentColor" className="opacity-80" />
                                        </button>
                                    </div>

                                    {/* Action Button */}
                                    <button
                                        onClick={() => navigate('/contacto')}
                                        className="py-2.5 px-5 rounded-full border border-stone-800 text-stone-800 text-sm font-medium transition-colors group-hover:border-white group-hover:text-white hover:bg-stone-800 hover:text-white group-hover:hover:bg-white group-hover:hover:text-[#D1554A] whitespace-nowrap"
                                    >
                                        {service.cta}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="max-w-4xl mx-auto mt-24 text-center relative overflow-hidden bg-white rounded-[2rem] p-12 shadow-2xl border border-gray-100">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-deglya-teal via-deglya-mustard to-deglya-teal"></div>
                    <h3 className="text-3xl font-bold font-display text-deglya-teal mb-6">¿No encuentras lo que buscas?</h3>
                    <p className="text-deglya-wood mb-10 max-w-xl mx-auto text-lg">
                        Entendemos que cada situación es única. Diseñamos planes a medida para ti o tu organización.
                    </p>
                    <Button variant="outline" size="lg" className="border-2 hover:bg-deglya-cream text-lg px-8 py-6">
                        Contactar Especialista
                    </Button>
                </div>

            </main>
            <Footer />
        </div>
    );
}
