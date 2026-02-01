import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, ChevronLeft, ChevronRight, Clock, DollarSign, Calendar, MapPin, Phone, HelpCircle } from 'lucide-react';

const BookingPage = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col min-h-screen bg-deglya-cream dark:bg-[#1a160c] transition-colors duration-300">
            {/* Navbar Simplified for Booking Flow */}
            <header className="w-full bg-white dark:bg-[#1a160c] border-b border-deglya-terracota/30 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                            <h1 className="text-xl font-bold tracking-tight font-display text-booking-primary dark:text-white">Deglya Camero</h1>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <Link className="text-sm font-medium text-deglya-wood hover:text-booking-primary transition-colors" to="/">Inicio</Link>
                            <span className="text-sm font-medium text-booking-primary">Agendar Cita</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-grow flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-7xl mb-8">
                    <nav className="flex mb-4 text-sm text-deglya-wood/60">
                        <Link className="hover:text-booking-primary" to="/">Inicio</Link>
                        <span className="mx-2">/</span>
                        <span className="text-deglya-wood font-semibold">Agendar Sesión</span>
                    </nav>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-booking-primary dark:text-white leading-tight">Selecciona Fecha y Hora</h2>
                    <p className="text-deglya-wood/80 mt-2 flex items-center gap-2">
                        <MapPin size={16} />
                        Zona Horaria: America/Caracas (VET)
                    </p>
                </div>

                <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    {/* LEFT PANEL: Service Info */}
                    <div className="lg:col-span-3 space-y-6">
                        <div className="bg-white dark:bg-[#2c2618] rounded-xl shadow-sm p-6 border border-deglya-terracota/30">
                            <div className="flex items-center gap-2 mb-4 text-booking-primary">
                                <span className="text-xs font-bold uppercase tracking-wider">Servicio</span>
                            </div>
                            <h3 className="text-xl font-display font-bold text-deglya-wood dark:text-white mb-2">Sesión de Psicoterapia</h3>
                            <div className="flex flex-col gap-2 mt-4 text-sm text-deglya-wood/80 border-t border-gray-100 pt-4">
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-2"><Clock size={16} /> Duración</span>
                                    <span className="font-semibold text-deglya-wood dark:text-white">50 Min</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="flex items-center gap-2"><DollarSign size={16} /> Inversión</span>
                                    <span className="font-semibold text-deglya-wood dark:text-white">$60.00</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-[#2c2618] rounded-xl shadow-sm p-6 border border-deglya-terracota/30">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden border-2 border-booking-primary/30">
                                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop" alt="Degly" className="h-full w-full object-cover" />
                                </div>
                                <div>
                                    <p className="font-bold text-deglya-wood dark:text-white text-lg leading-tight">Deglya Camero</p>
                                    <p className="text-booking-primary text-sm font-medium">Psicóloga Clínica</p>
                                </div>
                            </div>
                            <p className="text-sm text-deglya-wood/90 leading-relaxed italic font-serif">
                                "Juntos encontraremos claridad y diseñaremos un plan de acción para tu bienestar."
                            </p>
                        </div>
                    </div>

                    {/* CENTER PANEL: Calendar (Static Prototype) */}
                    <div className="lg:col-span-6">
                        <div className="bg-white dark:bg-[#2c2618] rounded-xl shadow-md p-6 lg:p-8 border border-deglya-terracota/30 min-h-[500px]">
                            <div className="flex items-center justify-between mb-8">
                                <button className="p-2 hover:bg-gray-100 rounded-full text-deglya-wood transition-colors">
                                    <ChevronLeft size={24} />
                                </button>
                                <h3 className="text-xl font-bold text-deglya-wood dark:text-white font-display">Octubre 2023</h3>
                                <button className="p-2 hover:bg-gray-100 rounded-full text-deglya-wood transition-colors">
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                            <div className="grid grid-cols-7 mb-4 text-center">
                                {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                                    <div key={day} className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{day}</div>
                                ))}
                            </div>
                            <div className="grid grid-cols-7 gap-y-4 gap-x-2">
                                {[...Array(31)].map((_, i) => {
                                    const day = i + 1;
                                    const isSelected = day === 24;
                                    const isToday = day === 14;
                                    return (
                                        <div key={day} className="aspect-square flex items-center justify-center">
                                            <button className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors
                                                ${isSelected ? 'bg-booking-primary text-white font-bold shadow-lg shadow-booking-primary/30' :
                                                    isToday ? 'border border-booking-primary text-booking-primary font-bold' :
                                                        'text-deglya-wood hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700'
                                                }`}>
                                                {day}
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL: Time Selection */}
                    <div className="lg:col-span-3 flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
                        <div className="bg-white dark:bg-[#2c2618] rounded-xl shadow-sm border border-deglya-terracota/30 flex flex-col h-full min-h-[500px] overflow-hidden">
                            <div className="p-6 border-b border-gray-100">
                                <h4 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-1">Disponibilidad</h4>
                                <p className="text-xl font-display font-bold text-deglya-wood dark:text-white">Mar, 24 Oct</p>
                            </div>
                            <div className="flex-grow p-6 overflow-y-auto space-y-3">
                                <div className="mb-2 text-xs font-semibold text-gray-400">Mañana</div>
                                <button className="w-full py-3 px-4 rounded-lg border border-gray-200 hover:border-booking-primary hover:text-booking-primary bg-white transition-all text-sm font-medium flex justify-between group">
                                    <span>09:00 AM</span>
                                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                                <div className="mt-4 mb-2 text-xs font-semibold text-gray-400">Tarde</div>
                                <button className="w-full py-3 px-4 rounded-lg bg-booking-primary/10 border border-booking-primary text-booking-primary font-bold flex justify-between shadow-inner transition-all">
                                    <span>01:00 PM</span>
                                    <CheckCircle size={16} className="fill-current" />
                                </button>
                                <button className="w-full py-3 px-4 rounded-lg border border-gray-200 hover:border-booking-primary hover:text-booking-primary bg-white transition-all text-sm font-medium flex justify-between group">
                                    <span>03:00 PM</span>
                                    <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                            </div>
                            <div className="p-6 bg-gray-50 border-t border-gray-100">
                                <button onClick={() => navigate('/checkout')} className="w-full bg-booking-primary hover:bg-booking-primary/90 text-white font-bold py-3.5 px-4 rounded-lg shadow-md transition-all flex items-center justify-center gap-2">
                                    Siguiente
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BookingPage;
