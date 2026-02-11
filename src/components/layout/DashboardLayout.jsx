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

const SidebarItem = ({ icon: Icon, label, href, isActive, onClick }) => {
    return (
        <Link
            to={href}
            onClick={onClick}
            className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive
                    ? "bg-deglya-gold/10 text-deglya-gold font-medium"
                    : "text-stone-400 hover:bg-white/5 hover:text-white"
            )}
        >
            <Icon className={cn("w-5 h-5", isActive ? "text-deglya-gold" : "text-stone-400 group-hover:text-white")} />
            <span>{label}</span>
            {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-deglya-gold shadow-glow-gold" />
            )}
        </Link>
    );
};

export default function DashboardLayout({ role = 'patient' }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { profile } = useUserRole();

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    const navItems = [
        { icon: LayoutDashboard, label: 'Inicio', href: `/dashboard/${role}` },
        { icon: Calendar, label: 'Mis Citas', href: `/dashboard/${role}/citas` },
        { icon: CreditCard, label: 'Pagos', href: `/dashboard/${role}/pagos` },
        { icon: User, label: 'Perfil', href: `/dashboard/${role}/perfil` },
    ];

    return (
        <div className="min-h-screen bg-stone-50 flex">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed lg:static inset-y-0 left-0 z-50 w-72 bg-deglya-charcoal text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 flex flex-col",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                )}
            >
                {/* Logo Area */}
                <div className="p-8 pb-4">
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-deglya-gold to-yellow-600 flex items-center justify-center">
                            <span className="font-display font-bold text-deglya-charcoal text-lg">D</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-display font-bold text-lg leading-none tracking-wide">DEGLYA</span>
                            <span className="text-[10px] text-stone-400 uppercase tracking-widest">Camero</span>
                        </div>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                    <div className="px-4 mb-2 text-xs font-semibold text-stone-500 uppercase tracking-wider">
                        Menu Principal
                    </div>
                    {navItems.map((item) => (
                        <SidebarItem
                            key={item.href}
                            icon={item.icon}
                            label={item.label}
                            href={item.href}
                            isActive={location.pathname === item.href}
                            onClick={() => setIsSidebarOpen(false)}
                        />
                    ))}
                </nav>

                {/* User Profile Summary Bottom */}
                <div className="p-4 border-t border-white/5 bg-black/20">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-stone-700 overflow-hidden flex items-center justify-center border border-white/10">
                            {profile?.avatar_url ? (
                                <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-5 h-5 text-stone-400" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                                {profile?.full_name || 'Usuario'}
                            </p>
                            <p className="text-xs text-stone-400 truncate">
                                {profile?.email || 'Cargando...'}
                            </p>
                        </div>
                    </div>

                    <Button
                        variant="ghost"
                        className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        onClick={handleLogout}
                    >
                        <LogOut className="w-4 h-4 mr-2" />
                        Cerrar Sesión
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-stone-200 flex items-center justify-between px-4 lg:px-8">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden"
                            onClick={toggleSidebar}
                        >
                            <Menu className="w-6 h-6 text-stone-600" />
                        </Button>
                        <h1 className="text-xl font-display font-semibold text-stone-800 hidden md:block">
                            Panel de {role === 'patient' ? 'Paciente' : 'Control'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" className="relative text-stone-500 hover:text-deglya-teal">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 border-2 border-white" />
                        </Button>
                    </div>
                </header>

                {/* Page Content */}
                <div className="flex-1 overflow-auto p-4 lg:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
