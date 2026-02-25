import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    Calendar,
    CreditCard,
    User,
    LogOut,
    Menu,
    X,
    Bell
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { supabase } from '@/lib/backend'; // Or '@/lib/supabase' if preferred
import { useUserRole } from '@/hooks/useUserRole';
import { useUIStore } from '@/lib/uiStore';
import SpecialistBookingPanel from '@/pages/dashboard/components/SpecialistBookingPanel';

const SidebarItem = ({ icon: Icon, label, href, isActive, onClick }) => {
    return (
        <Link
            to={href}
            onClick={onClick}
            className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group",
                isActive
                    ? "bg-white border text-stone-700 font-medium shadow-[0_2px_8px_-2px_rgba(0,0,0,0.05)] border-stone-100"
                    : "text-slate-500 hover:bg-stone-50 hover:text-stone-700"
            )}
        >
            <Icon className={cn("w-6 h-6 transition-transform group-hover:scale-105", isActive ? "text-stone-800" : "text-slate-400")} />
            <span className="hidden lg:block">{label}</span>
        </Link>
    );
};

export default function DashboardLayout({ role = 'patient' }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { profile } = useUserRole();
    const { openSpecialistBooking } = useUIStore();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    const navItems = role === 'specialist'
        ? [
            { icon: LayoutDashboard, label: 'Panel Principal', href: `/dashboard/especialista` },
            { icon: Calendar, label: 'Agenda', href: `/dashboard/especialista/agenda` },
            { icon: User, label: 'Pacientes', href: `/dashboard/especialista/pacientes` },
            { icon: CreditCard, label: 'Finanzas', href: `/dashboard/especialista/finanzas` },
        ]
        : [
            { icon: LayoutDashboard, label: 'Inicio', href: `/dashboard/${role}` },
            { icon: Calendar, label: 'Mis Citas', href: `/dashboard/${role}/citas` },
            { icon: CreditCard, label: 'Pagos', href: `/dashboard/${role}/pagos` },
            { icon: User, label: 'Perfil', href: `/dashboard/${role}/perfil` },
        ];

    return (
        <div className="bg-deglya-surface text-deglya-typography font-body min-h-screen flex">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={cn(
                "fixed lg:static inset-y-0 left-0 z-50 w-20 lg:w-64 bg-white border-r border-gray-100 flex flex-col transition-all duration-300 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)]",
                isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            )}>
                <div className="h-20 flex items-center justify-center lg:justify-start lg:px-8 border-b border-gray-50">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="text-2xl font-display font-bold text-deglya-accent tracking-wide hidden lg:block">
                            Deglya C.
                        </div>
                        <div className="lg:hidden text-2xl font-display font-bold text-deglya-primary">DC</div>
                    </Link>
                </div>

                <nav className="flex-1 py-8 flex flex-col gap-2 px-3 overflow-y-auto">
                    {navItems.map((item) => (
                        <SidebarItem
                            key={item.href}
                            icon={item.icon}
                            label={item.label}
                            href={`${item.href}${location.search}`}
                            isActive={location.pathname === item.href}
                            onClick={() => setIsSidebarOpen(false)}
                        />
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-50">
                    <button onClick={handleLogout} className="flex items-center gap-4 w-full px-4 py-3 text-gray-500 hover:text-red-500 transition-all rounded-xl">
                        <LogOut className="w-6 h-6" />
                        <span className="hidden lg:block font-medium">Cerrar Sesión</span>
                    </button>

                    <div className="mt-4 flex items-center gap-3 px-2">
                        <div className="w-10 h-10 rounded-full border-2 border-deglya-primary overflow-hidden bg-gray-100">
                            {profile?.avatar_url ? (
                                <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-gray-400" />
                                </div>
                            )}
                        </div>
                        <div className="hidden lg:block overflow-hidden">
                            <p className="text-sm font-bold text-deglya-accent truncate">{profile?.full_name || 'Usuario'}</p>
                            <p className="text-xs text-gray-400 truncate">Psicoterapeuta</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-w-0 flex flex-col">
                <header className="flex justify-between items-end p-6 lg:p-10 pb-0">
                    <div>
                        <p className="text-deglya-primary font-medium tracking-widest text-[10px] uppercase mb-1">Bienvenida de nuevo</p>
                        <h1 className="font-display text-3xl md:text-4xl text-deglya-accent italic leading-tight">Panel de Control</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="p-2 rounded-full text-gray-400 hover:bg-gray-100 transition-colors relative">
                            <Bell className="w-6 h-6" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>

                        <Button
                            onClick={openSpecialistBooking}
                            className="bg-yellow-500 hover:bg-yellow-600 text-stone-900 px-6 py-2 rounded-full font-bold shadow-lg shadow-yellow-500/30 transition-all flex items-center gap-2"
                        >
                            <span className="material-icons-outlined text-sm">add</span>
                            <span className="hidden sm:inline">Nueva Cita</span>
                        </Button>

                        <Button variant="ghost" size="icon" className="lg:hidden" onClick={toggleSidebar}>
                            {isSidebarOpen ? <X /> : <Menu />}
                        </Button>
                    </div>
                </header>

                <div className="flex-1 p-6 lg:p-10 pt-8">
                    <Outlet />
                </div>
            </main>

            {/* Specialist Specific Modals */}
            {profile?.role === 'specialist' && <SpecialistBookingPanel />}
        </div>
    );
}
