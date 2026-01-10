import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, ArrowRight, Check, Star, Brain, Heart, Leaf, Mail, Phone, Calendar } from 'lucide-react';

import StickyHorizontalScroll from '@/components/ui/StickyHorizontalScroll';

// --- Shared Components for this Page ---

const Header = () => {
    const navigate = useNavigate();
    return (
        <header className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="flex items-center justify-between py-6">
                    <div onClick={() => navigate('/')} className="flex items-center gap-3 cursor-pointer">
                        <div className="h-8 w-8 text-deglya-teal dark:text-deglya-terracota">
                            {/* Logo SVG from reference */}
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd"></path>
                                <path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd"></path>
                            </svg>
                        </div>
                        <h2 className="font-display text-2xl font-semibold leading-tight text-deglya-teal dark:text-white">Deglya Camero Group</h2>
                    </div>
                    <nav className="hidden items-center gap-10 lg:flex">
                        <button onClick={() => navigate('/quienes-somos')} className="text-sm font-medium hover:text-deglya-teal dark:hover:text-deglya-terracota">Quiénes Somos</button>
                        <button onClick={() => navigate('/servicios')} className="text-sm font-medium hover:text-deglya-teal dark:hover:text-deglya-terracota">Servicios</button>
                        <button onClick={() => navigate('/reino')} className="text-sm font-medium hover:text-deglya-teal dark:hover:text-deglya-terracota">Reino de lo Posible</button>
                        <button onClick={() => navigate('/portal')} className="text-sm font-medium hover:text-deglya-teal dark:hover:text-deglya-terracota">Portal</button>
                    </nav>
                    <div className="hidden items-center gap-4 lg:flex">
                        <button onClick={() => navigate('/agendar')} className="flex cursor-pointer items-center justify-center rounded-full bg-deglya-mustard px-6 py-2 text-sm font-bold text-white shadow-lg shadow-deglya-mustard/30 transition-shadow duration-300 hover:shadow-xl hover:shadow-deglya-mustard/50">
                            <span>Agendar Cita</span>
                        </button>
                    </div>
                    <button className="lg:hidden text-deglya-teal">
                        <Menu size={32} />
                    </button>
                </div>
            </div>
        </header>
    );
};

const Footer = () => (
    <footer className="bg-deglya-terracota/10 py-16 dark:bg-deglya-terracota/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                <div className="col-span-2 md:col-span-1">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 text-deglya-teal dark:text-deglya-terracota">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd"></path><path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd"></path></svg>
                        </div>
                        <h2 className="font-display text-2xl font-semibold leading-tight text-deglya-teal dark:text-white">Deglya Camero</h2>
                    </div>
                    <p className="mt-4 text-sm text-deglya-wood/90">Un espacio para sanar, crecer y reconectar.</p>
                </div>
                <div>
                    <h3 className="font-bold text-deglya-teal">Navegación</h3>
                    <ul className="mt-4 space-y-2 text-sm text-deglya-wood">
                        <li><a href="#" className="hover:text-deglya-mustard">Inicio</a></li>
                        <li><a href="#" className="hover:text-deglya-mustard">Sobre Mí</a></li>
                        <li><a href="#" className="hover:text-deglya-mustard">Servicios</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-deglya-teal">Legal</h3>
                    <ul className="mt-4 space-y-2 text-sm text-deglya-wood">
                        <li><a href="#" className="hover:text-deglya-mustard">Política de Privacidad</a></li>
                        <li><a href="#" className="hover:text-deglya-mustard">Términos y Condiciones</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold text-deglya-teal">Contacto</h3>
                    <ul className="mt-4 space-y-2 text-sm text-deglya-wood">
                        <li className="flex items-center gap-2"><Mail size={16} /> contacto@deglyacamero.com</li>
                    </ul>
                </div>
            </div>
            <div className="mt-12 border-t border-deglya-terracota/30 pt-8 text-center text-sm text-deglya-wood/60">
                <p>© 2024 Deglya Camero Group. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>
);

// --- Main Page Component ---

export default function Home() {
    const navigate = useNavigate();

    return (
        <div className="relative flex min-h-screen w-full flex-col font-sans text-deglya-wood bg-deglya-cream selection:bg-deglya-mustard selection:text-white">
            <Header />

            <main>
                {/* HERO */}
                <section className="relative min-h-screen overflow-hidden">
                    {/* Background Image Placeholder - Using Deglya Hero Image */}
                    <div className="absolute inset-0 z-0 h-full w-full bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url('/images/deglya-hero.png')` }}>
                    </div>
                    <div className="hero-gradient absolute inset-0 z-0 h-full w-full bg-gradient-to-r from-deglya-cream/90 via-deglya-cream/70 to-transparent"></div>

                    <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-start justify-center px-4 pt-32 pb-16 text-left sm:px-6 lg:px-8">
                        <div className="max-w-3xl animate-in fade-in slide-in-from-left-8 duration-1000">
                            <h1 className="font-display text-6xl font-medium !leading-tight text-deglya-teal md:text-7xl lg:text-8xl">
                                Acompañándote en tu proceso de <span className="text-deglya-mustard">sanación</span>
                            </h1>
                            <p className="mt-6 text-xl text-deglya-wood max-w-xl">
                                Un enfoque terapéutico humanista y profesional para guiarte hacia el bienestar integral y la excelencia corporativa.
                            </p>
                            <div className="mt-10 flex items-center justify-start gap-x-6">
                                <button onClick={() => navigate('/agendar')} className="flex cursor-pointer items-center justify-center rounded-full bg-deglya-mustard px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-deglya-mustard/30 transition-shadow duration-300 hover:shadow-xl hover:shadow-deglya-mustard/40">
                                    <span>Agendar una Cita</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>



                {/* UNIFIED PHILOSOPHY & DISTINCTION SECTION (Sticky Scroll) */}
                < StickyHorizontalScroll
                    className="bg-white"
                    items={
                        [
                            {
                                id: 1,
                                title: "Diagnóstico & Conexión",
                                description: "Identificamos oportunidades de mejora priorizando la empatía pura. Analizamos tu situación actual para diseñar un plan a medida.",
                                imageUrl: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=2070&auto=format&fit=crop",
                                bgColor: "bg-deglya-teal",
                                badge: "PILARES"
                            },
                            {
                                id: 2,
                                title: "Sistema DESTINO",
                                description: "Un método de intervención único que integra múltiples enfoques para rediseñar competencias y transformar planes de vida.",
                                imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
                                bgColor: "bg-deglya-mustard",
                                badge: "METODOLOGÍA"
                            },
                            {
                                id: 3,
                                title: "Especialización EMDR",
                                description: "Expertas certificadas en Trauma Psicológico. Una distinción exclusiva que garantiza un abordaje profundo y efectivo.",
                                imageUrl: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?q=80&w=2069&auto=format&fit=crop",
                                bgColor: "bg-deglya-terracota",
                                badge: "CERTIFICACIÓN"
                            },
                            {
                                id: 4,
                                title: "Equipo de Expertos",
                                description: "Más de 30 años de experiencia acumulada sintetizados en psicoterapia, coaching y gerencia de alto nivel.",
                                imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop",
                                bgColor: "bg-deglya-wood",
                                badge: "EXPERIENCIA"
                            },
                            {
                                id: 5,
                                title: "Reconocimiento Global",
                                description: "Alianzas estratégicas con organizaciones internacionales como AIBAPT y EMDR AL. Construimos legados sostenibles.",
                                imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop",
                                bgColor: "bg-deglya-teal",
                                badge: "ALIANZAS"
                            }
                        ]}
                />

                <div className="text-center py-20 bg-white">
                    <h2 className="font-display text-4xl font-medium text-deglya-teal">Nuestros Mundos</h2>
                    <p className="mt-4 text-xl text-deglya-wood/80 max-w-2xl mx-auto">Selecciona tu camino para descubrir soluciones adaptadas a tus necesidades.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Personas Card */}
                    <div
                        onClick={() => navigate('/servicios?type=personas')}
                        className="group cursor-pointer relative overflow-hidden rounded-2xl aspect-[4/3] shadow-lg transition-transform hover:scale-[1.02]"
                    >
                        <img src="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=2574&auto=format&fit=crop" alt="Personas" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-deglya-teal/90 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8">
                            <h3 className="text-3xl font-display font-bold text-white mb-2">Personas</h3>
                            <p className="text-white/90 mb-4">Psicoterapia, coaching y bienestar personal.</p>
                            <span className="inline-flex items-center text-deglya-mustard font-bold uppercase text-sm tracking-wider group-hover:underline">Explorar <ArrowRight className="ml-2 w-4 h-4" /></span>
                        </div>
                    </div>
                    {/* Empresas Card */}
                    <div
                        onClick={() => navigate('/servicios?type=empresas')}
                        className="group cursor-pointer relative overflow-hidden rounded-2xl aspect-[4/3] shadow-lg transition-transform hover:scale-[1.02]"
                    >
                        <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2301&auto=format&fit=crop" alt="Empresas" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-deglya-wood/90 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 p-8">
                            <h3 className="text-3xl font-display font-bold text-white mb-2">Empresas</h3>

                            <p className="mt-4 text-lg text-deglya-wood">
                                PRE - Venta exclusiva ONLINE. Una guía práctica para desbloquear tu potencial y transformar tu realidad.
                            </p>
                            <div className="mt-8">
                                <a className="inline-block rounded-full bg-deglya-teal px-6 py-3 text-base font-bold text-white shadow-lg transition hover:bg-deglya-teal/90" href="#">
                                    Comprar en <span className="font-serif italic">Amazon &gt;</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>


                {/* VIDEO / WELCOME SECTION */}
                < section className="py-20 bg-deglya-terracota/5 overflow-hidden" >
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video md:aspect-[21/9]">
                            {/* Using user image as video cover/banner */}
                            <img src="/images/welcome.png" alt="Bienvenida Deglya" className="absolute inset-0 h-full w-full object-cover" />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center group cursor-pointer hover:bg-black/30 transition-all">
                                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                                    <div className="w-0 h-0 border-t-[15px] border-t-transparent border-l-[25px] border-l-white border-b-[15px] border-b-transparent ml-2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >

                {/* EL REINO DE LO POSIBLE (BOOK) */}
                < section id="kingdom" className="py-24 bg-deglya-teal text-white relative overflow-hidden" >
                    {/* Background Pattern */}
                    < div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }
                    }></div >

                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="flex flex-col md:flex-row items-center gap-16">
                            <div className="w-full md:w-1/2">
                                <img src="/images/book-banner.png" alt="Libro El Reino de lo Posible" className="w-full rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform hover:-translate-y-2 transition-transform duration-500" />
                            </div>
                            <div className="w-full md:w-1/2 space-y-8">
                                <span className="inline-block px-4 py-1 rounded-full bg-deglya-mustard/20 text-deglya-mustard font-bold text-sm tracking-wider border border-deglya-mustard/50">
                                    BEST SELLER
                                </span>
                                <h2 className="font-display text-5xl font-bold leading-tight">
                                    El Reino de lo <span className="text-deglya-mustard italic">Posible</span>
                                </h2>
                                <p className="text-lg text-white/80 leading-relaxed">
                                    Una obra transformadora que te invita a rediseñar tus competencias y descubrir el potencial ilimitado que reside en ti. Disponible en formatos físico y digital.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <button className="bg-deglya-mustard text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-deglya-mustard/30 hover:shadow-xl hover:bg-yellow-500 transition-all">
                                        Adquirir en Amazon
                                    </button>
                                    <button onClick={() => navigate('/reino')} className="px-8 py-4 rounded-full font-bold border-2 border-white/20 hover:bg-white/10 transition-all flex items-center gap-2">
                                        <Brain size={20} />
                                        Leer Primer Capítulo
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >

                {/* REMOVED PHILOSOPHY SECTION (Merged into Sticky Scroll) */}

                {/* SPECIALISTS SECTION */}
                <section className="bg-deglya-terracota/10 py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto max-w-3xl text-center mb-16">
                            <h2 className="font-display text-4xl font-medium tracking-tight text-deglya-teal sm:text-5xl">Nuestros Especialistas</h2>
                            <p className="mt-6 text-lg leading-8 text-deglya-wood">Un equipo de excelencia.</p>
                        </div>
                        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
                            {/* Degly */}
                            <div className="flex flex-col rounded-2xl bg-white p-8 shadow-xl">
                                <div className="mb-6 flex items-center gap-6">
                                    <div className="h-24 w-24 rounded-full bg-gray-200 overflow-hidden ring-4 ring-deglya-terracota/30">
                                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop" alt="Degly" className="h-full w-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-display font-bold text-deglya-teal">Degly A. Camero</h3>
                                        <p className="text-deglya-mustard font-bold tracking-wide text-sm uppercase">Psicóloga Clínica & Fundadora</p>
                                    </div>
                                </div>
                                <div className="flex-grow space-y-4 text-deglya-wood">
                                    <p>Especialista certificada en EMDR y precursora del sistema de intervención DESTINO.</p>
                                </div>
                                <div className="mt-8 pt-6 border-t border-deglya-terracota/20">
                                    <button className="w-full rounded-full bg-deglya-teal px-6 py-3 text-base font-bold text-white shadow-lg hover:bg-deglya-teal/90 transition-all">
                                        Agendar Cita con Degly
                                    </button>
                                </div>
                            </div>
                            {/* Elena */}
                            <div className="flex flex-col rounded-2xl bg-white p-8 shadow-xl">
                                <div className="mb-6 flex items-center gap-6">
                                    <div className="h-24 w-24 rounded-full bg-gray-200 overflow-hidden ring-4 ring-deglya-terracota/30">
                                        <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2576&auto=format&fit=crop" alt="Elena" className="h-full w-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-display font-bold text-deglya-teal">Dra. Elena Ríos</h3>
                                        <p className="text-deglya-mustard font-bold tracking-wide text-sm uppercase">Terapeuta Familiar</p>
                                    </div>
                                </div>
                                <div className="flex-grow space-y-4 text-deglya-wood">
                                    <p>Experta en dinámicas familiares y terapia sistémica con visión compasiva.</p>
                                </div>
                                <div className="mt-8 pt-6 border-t border-deglya-terracota/20">
                                    <button className="w-full rounded-full bg-deglya-teal px-6 py-3 text-base font-bold text-white shadow-lg hover:bg-deglya-teal/90 transition-all">
                                        Agendar Cita con Elena
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* AI INSIGHTS */}
                <section className="py-24 sm:py-32">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="relative overflow-hidden rounded-xl p-8 md:p-12 lg:grid lg:grid-cols-2 lg:gap-8 lg:p-16">
                            <div className="ai-insights-gradient absolute inset-0 z-0"></div>
                            <div className="relative z-10">
                                <span className="text-sm font-bold uppercase tracking-widest text-white/80">AI-Powered Insights</span>
                                <h2 className="mt-2 font-display text-4xl font-medium tracking-tight text-white sm:text-5xl">Tu Viaje de Bienestar, Personalizado</h2>
                                <p className="mt-6 text-lg leading-8 text-white/90">
                                    Nuestra IA analiza tus patrones para ofrecerte recomendaciones personalizadas.
                                </p>
                                <button className="mt-8 flex items-center gap-2 rounded-full bg-white/20 px-6 py-3 text-white backdrop-blur-sm transition-colors hover:bg-white/30">
                                    <Brain size={20} />
                                    <span>Descubrir Mis Insights</span>
                                </button>
                            </div>
                            <div className="relative z-10 mt-12 flex h-80 items-center justify-center lg:mt-0">
                                {/* Circle Graph Placeholder */}
                                <div className="relative h-64 w-64 bg-white/10 rounded-full flex items-center justify-center border-4 border-white/20">
                                    <div className="text-center text-white">
                                        <span className="text-5xl font-bold">75%</span>
                                        <p className="mt-1 text-sm">Progreso</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PORTAL LOGIN */}
                <section className="py-24 sm:py-32" id="portal">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="grid items-center gap-12 lg:grid-cols-2">
                            <div>
                                <h2 className="font-display text-4xl font-medium tracking-tight text-deglya-teal sm:text-5xl">Mi Refugio: Portal del Paciente</h2>
                                <p className="mt-6 text-lg leading-8 text-deglya-wood">
                                    Accede a tu espacio seguro. Gestiona citas, notas y recursos exclusivos.
                                </p>
                                <div className="mt-8 space-y-4">
                                    <div>
                                        <label className="sr-only" htmlFor="email">Email</label>
                                        <input className="w-full rounded-lg border-deglya-terracota/30 bg-white px-4 py-3 placeholder:text-deglya-wood/50 focus:border-deglya-teal focus:ring-deglya-teal" id="email" placeholder="tu.email@ejemplo.com" type="email" />
                                    </div>
                                    <button className="w-full rounded-full bg-deglya-teal px-8 py-3.5 text-base font-bold text-white shadow-lg transition-all hover:bg-deglya-teal/90">
                                        <span>Acceso Seguro</span>
                                    </button>
                                    <p className="text-center text-xs text-deglya-wood/60">Enlace mágico sin contraseña.</p>
                                </div>
                            </div>
                            {/* Mock Portal Card */}
                            <div className="rounded-xl border border-deglya-terracota/20 bg-white p-8 shadow-2xl">
                                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
                                    <h3 className="font-display text-2xl text-deglya-teal">Panel "Mi Refugio"</h3>
                                    <span className="text-sm font-semibold text-deglya-mustard">Hola, Sofía</span>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-4 rounded-lg bg-deglya-cream p-4">
                                        <div className="bg-deglya-teal text-white p-2 rounded-full"><Calendar size={16} /></div>
                                        <div>
                                            <p className="font-semibold text-deglya-teal">Próxima Sesión</p>
                                            <p className="text-sm text-deglya-wood">Viernes, 12 de Julio - 02:00 PM</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main >

            <Footer />
        </div >
    );
}
