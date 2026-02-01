import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Check, ArrowRight, Menu, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

// --- Shared Components (Duplicated for standalone page consistency) ---
// In a real refactor, these would move to src/components/layout/

const Header = () => (
    <header className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between py-6">
                <div className="flex items-center gap-3">
                    <a href="/" className="flex items-center gap-3 group">
                        <div className="h-8 w-8 text-deglya-teal dark:text-deglya-terracota group-hover:scale-110 transition-transform">
                            <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fill="currentColor" fillRule="evenodd"></path><path clipRule="evenodd" d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z" fill="currentColor" fillRule="evenodd"></path></svg>
                        </div>
                        <h2 className="font-display text-2xl font-semibold leading-tight text-deglya-teal dark:text-white">Deglya Camero</h2>
                    </a>
                </div>
                <nav className="hidden items-center gap-10 lg:flex">
                    <a className="text-sm font-medium hover:text-deglya-teal dark:hover:text-deglya-terracota" href="/#about">Quiénes Somos</a>
                    <a className="text-sm font-medium text-deglya-teal font-bold" href="/servicios">Servicios</a>
                    <a className="text-sm font-medium hover:text-deglya-teal dark:hover:text-deglya-terracota" href="/#kingdom">Reino de lo Posible</a>
                    <a className="text-sm font-medium hover:text-deglya-teal dark:hover:text-deglya-terracota" href="/#portal">Portal</a>
                </nav>
                <div className="hidden items-center gap-4 lg:flex">
                    <button className="flex cursor-pointer items-center justify-center rounded-full bg-deglya-mustard px-6 py-2 text-sm font-bold text-deglya-wood shadow-lg shadow-deglya-mustard/30 transition-shadow duration-300 hover:shadow-xl hover:shadow-deglya-mustard/50">
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

const Footer = () => (
    <footer className="bg-deglya-terracota/10 py-16 dark:bg-deglya-terracota/5 mt-auto">
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
                        <li><a href="/" className="hover:text-deglya-mustard">Inicio</a></li>
                        <li><a href="/servicios" className="hover:text-deglya-mustard">Servicios</a></li>
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


// Mock Data for Services
const servicesData = {
    personas: [
        {
            title: "Psicoterapia Individual",
            description: "Un espacio seguro para explorar tu mundo interno y sanar heridas profundas.",
            features: ["Sesiones de 50 min", "Modalidad Online/Presencial", "Enfoque Integrativo Destino"],
            price: "$80 / sesión",
            cta: "Reservar Cita"
        },
        {
            title: "Coaching de Vida",
            description: "Diseña el futuro que deseas con herramientas prácticas y acompañamiento.",
            features: ["Definición de Metas", "Plan de Acción", "Seguimiento Semanal"],
            price: "$100 / sesión",
            cta: "Iniciar Proceso"
        },
        {
            title: "Talleres de Bienestar",
            description: "Experiencias grupales para reconectar con tu esencia y vitalidad.",
            features: ["Grupos reducidos", "Material incluido", "Comunidad de apoyo"],
            price: "Desde $45",
            cta: "Ver Próximos Eventos"
        }
    ],
    empresas: [
        {
            title: "Liderazgo Consciente",
            description: "Formación para líderes que buscan inspirar y gestionar con empatía.",
            features: ["Evaluación 360", "Mentoring Ejecutivo", "Resultados Medibles"],
            price: "Consultar",
            cta: "Solicitar Propuesta"
        },
        {
            title: "Team Building 'Vital'",
            description: "Actividades diseñada para fortalecer la cohesión y la comunicación.",
            features: ["Indoor/Outdoor", "Dinámicas Gamificadas", "Reporte de Impacto"],
            price: "Consultar",
            cta: "Cotizar Experiencia"
        },
        {
            title: "Bienestar Corporativo",
            description: "Programas integrales de salud mental y emocional para tu equipo.",
            features: ["Charlas y Webinars", "Soporte Psicológico", "Línea de Ayuda"],
            price: "A medida",
            cta: "Hablar con un Asesor"
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
            <Header />

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
                        <Card key={index} className="group relative flex flex-col h-full bg-white border-none shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
                            <div className={cn("absolute top-0 left-0 w-full h-1", activeTab === 'empresas' ? 'bg-deglya-mustard' : 'bg-deglya-teal')}></div>

                            <CardHeader className="pt-8">
                                <h3 className="text-2xl font-bold font-display text-deglya-teal group-hover:text-deglya-mustard transition-colors">
                                    {service.title}
                                </h3>
                            </CardHeader>
                            <CardContent className="flex-grow space-y-6">
                                <p className="text-deglya-wood text-lg leading-relaxed">{service.description}</p>
                                <ul className="space-y-4">
                                    {service.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start text-sm text-deglya-wood/80">
                                            <div className={cn("rounded-full p-1 mr-3 mt-0.5", activeTab === 'empresas' ? 'bg-deglya-mustard/10 text-deglya-mustard' : 'bg-deglya-teal/10 text-deglya-teal')}>
                                                <Check size={14} strokeWidth={3} />
                                            </div>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter className="flex flex-col items-stretch border-t border-gray-100 p-6 bg-gray-50/50 mt-auto gap-4">
                                <div className="text-center pb-2">
                                    <span className="font-display font-bold text-2xl text-deglya-wood">{service.price}</span>
                                </div>
                                <Button
                                    className="w-full"
                                    size="lg"
                                    variant={activeTab === 'empresas' ? 'action' : 'default'}
                                    onClick={() => navigate('/contacto')} // Placeholder action
                                >
                                    {service.cta} <ArrowRight size={16} className="ml-2" />
                                </Button>
                            </CardFooter>
                        </Card>
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
