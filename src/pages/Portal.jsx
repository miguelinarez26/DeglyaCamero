import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, FileText, Video, Settings, LogOut, Download, Clock, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

// --- Shared Components ---

const Sidebar = ({ active, setActive, onLogout }) => {
    const navItems = [
        { id: 'dashboard', label: 'Mi Tablero', icon: <User size={20} /> },
        { id: 'citas', label: 'Mis Citas', icon: <Calendar size={20} /> },
        { id: 'recursos', label: 'Recursos', icon: <FileText size={20} /> },
        { id: 'videos', label: 'Videos', icon: <Video size={20} /> },
        { id: 'ajustes', label: 'Ajustes', icon: <Settings size={20} /> },
    ];

    return (
        <aside className="w-64 bg-white border-r border-gray-100 hidden md:flex flex-col h-screen fixed left-0 top-0 z-10">
            <div className="p-8 border-b border-gray-50 flex items-center gap-2">
                <div className="h-8 w-8 text-deglya-teal bg-deglya-cream rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 48 48"><path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fillRule="evenodd"></path></svg>
                </div>
                <span className="font-display font-bold text-deglya-teal text-lg">Mi Refugio</span>
            </div>

            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActive(item.id)}
                        className={cn(
                            "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                            active === item.id
                                ? "bg-deglya-cream text-deglya-teal"
                                : "text-deglya-wood/70 hover:bg-gray-50 hover:text-deglya-teal"
                        )}
                    >
                        {item.icon}
                        {item.label}
                    </button>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-50">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                >
                    <LogOut size={20} />
                    Cerrar Sesión
                </button>
            </div>
        </aside>
    );
};

// --- Main Portal ---

export default function Portal() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const navigate = useNavigate();

    const handleLogout = () => {
        // Mock logout
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-deglya-cream font-sans flex text-deglya-wood">
            <Sidebar active={activeTab} setActive={setActiveTab} onLogout={handleLogout} />

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8 overflow-y-auto">
                {/* Header Mobile */}
                <div className="md:hidden flex justify-between items-center mb-6">
                    <span className="font-display font-bold text-deglya-teal text-lg">Mi Refugio</span>
                    <Button size="sm" variant="ghost"><Menu /></Button>
                </div>

                {/* Top Bar (Desktop) */}
                <div className="hidden md:flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-display font-bold text-deglya-teal">
                        Hola, Sofía
                    </h1>
                    <div className="flex items-center gap-4">
                        <Button size="icon" variant="ghost" className="relative text-deglya-wood">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-deglya-mustard rounded-full"></span>
                        </Button>
                        <div className="flex items-center gap-3 bg-white p-2 pr-4 rounded-full border border-gray-100 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop" className="w-full h-full object-cover" alt="Profile" />
                            </div>
                            <span className="text-sm font-bold text-deglya-teal">Sofía R.</span>
                        </div>
                    </div>
                </div>

                {/* Dashboard Widgets */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Next Appointment Card */}
                    <Card className="lg:col-span-2 border-none shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
                        <div className="h-2 bg-gradient-to-r from-deglya-teal to-deglya-mustard"></div>
                        <CardContent className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-deglya-wood mb-1">Tu Próxima Cita</h3>
                                    <p className="text-gray-500 text-sm">Faltan 3 días para tu próxima sesión.</p>
                                </div>
                                <div className="bg-deglya-cream text-deglya-teal px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Confirmada</div>
                            </div>

                            <div className="flex flex-col md:flex-row gap-6 items-center bg-gray-50 rounded-xl p-6 border border-gray-100">
                                <div className="bg-white p-4 rounded-lg shadow-sm text-center min-w-[100px]">
                                    <span className="block text-xs font-bold text-gray-400 uppercase">JUL</span>
                                    <span className="block text-3xl font-display font-bold text-deglya-teal">12</span>
                                    <span className="block text-sm text-gray-500">Viernes</span>
                                </div>
                                <div className="flex-1 space-y-2 text-center md:text-left">
                                    <h4 className="text-lg font-bold text-deglya-wood">Sesión de Terapia Individual</h4>
                                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600">
                                        <span className="flex items-center gap-1"><Clock size={14} className="text-deglya-mustard" /> 02:00 PM - 02:50 PM</span>
                                        <span className="flex items-center gap-1"><User size={14} className="text-deglya-mustard" /> con Degly A. Camero</span>
                                    </div>
                                </div>
                                <Button>Iniciar Detalles</Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Stats or Actions */}
                    <div className="space-y-6">
                        <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.05)] bg-deglya-teal text-white">
                            <CardContent className="p-6">
                                <h3 className="font-bold text-lg mb-2">Progreso de Bienestar</h3>
                                <div className="flex items-end gap-2 mb-4">
                                    <span className="text-4xl font-display font-bold">75%</span>
                                    <span className="text-white/70 text-sm mb-1">completado</span>
                                </div>
                                <div className="w-full bg-black/20 rounded-full h-2">
                                    <div className="bg-deglya-mustard h-2 rounded-full" style={{ width: '75%' }}></div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.05)] bg-white cursor-pointer hover:shadow-lg transition-shadow">
                            <CardContent className="p-6 flex items-center justify-between">
                                <div>
                                    <h3 className="font-bold text-deglya-wood">Agendar Nueva</h3>
                                    <p className="text-sm text-gray-500">Programa una sesión extra</p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-deglya-cream flex items-center justify-center text-deglya-teal">
                                    <Calendar size={20} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Resources Grid */}
                <h3 className="text-xl font-bold font-display text-deglya-teal mt-12 mb-6">Recursos Recomendados</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((item) => (
                        <Card key={item} className="border-none shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-transform cursor-pointer">
                            <div className="h-32 bg-gray-100 relative">
                                <img src={`https://images.unsplash.com/photo-${item === 1 ? '1544367563-121542942872' : item === 2 ? '1506126613408-eca07ce68773' : '1515023115689-582473508d1b'}?q=80&w=2574&auto=format&fit=crop`} className="w-full h-full object-cover" alt="Resource" />
                                <div className="absolute top-3 right-3 bg-white p-1 rounded-md shadow-sm">
                                    {item === 2 ? <Video size={16} className="text-deglya-mustard" /> : <FileText size={16} className="text-deglya-teal" />}
                                </div>
                            </div>
                            <CardContent className="p-5">
                                <h4 className="font-bold text-deglya-wood mb-2 text-sm line-clamp-1">Guía Práctica para la Ansiedad</h4>
                                <p className="text-xs text-gray-500 mb-4 line-clamp-2">Una serie de ejercicios diarios para ayudarte a gestionar...</p>
                                <Button variant="link" size="sm" className="p-0 text-deglya-teal h-auto">Descargar <Download size={14} className="ml-1" /></Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>

            </main>
        </div>
    );
}
