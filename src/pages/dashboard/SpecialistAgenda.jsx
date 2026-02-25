import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, Plus, Video, MapPin, Search } from 'lucide-react';
import { useUIStore } from '@/lib/uiStore';

export default function SpecialistAgenda() {
    const [currentDate, setCurrentDate] = useState(new Date(2023, 9, 25)); // Mock: Oct 25, 2023
    const [viewMode, setViewMode] = useState('Semana');
    const { openSpecialistBooking } = useUIStore();

    // Mock Appointments Data
    const appointments = [
        { id: 1, title: 'Sesión Terapéutica', patient: 'Carlos Rodriguez', time: '09:00 - 10:00', type: 'online', status: 'confirmed', category: 'therapy' },
        { id: 2, title: 'Coaching Ejecutivo', patient: 'Ana Torres', time: '09:00 - 10:30', type: 'in-person', location: 'Consultorio A', status: 'confirmed', category: 'coaching' },
        { id: 3, title: 'Sesión de Pareja', patient: 'Sofia & Luis', time: '11:00 - 12:30', type: 'online', status: 'confirmed', category: 'therapy' },
        { id: 4, title: 'Consulta Inicial', patient: 'Javier Mendez', time: '11:00 - 11:45', type: 'in-person', location: 'Consultorio B', status: 'pending', category: 'initial' },
        { id: 5, title: 'Consultoría Corporativa', patient: 'Patricia Leal', time: '15:00 - 16:30', type: 'online', status: 'confirmed', category: 'corporate' },
        { id: 6, title: 'Revisión de Caso', patient: 'Interno', time: '17:00 - 18:00', type: 'internal', status: 'confirmed', category: 'admin' },
    ];

    const timeSlots = Array.from({ length: 11 }, (_, i) => i + 8); // 8:00 to 18:00

    const getCategoryStyles = (category) => {
        switch (category) {
            case 'therapy': return "bg-yellow-50 border-yellow-500 text-yellow-800";
            case 'coaching': return "bg-teal-50 border-teal-600 text-teal-800";
            case 'initial': return "bg-stone-100 border-teal-800 text-teal-900";
            case 'corporate': return "bg-amber-50 border-amber-500 text-amber-800";
            case 'admin': return "bg-gray-100 border-gray-400 text-gray-700";
            default: return "bg-stone-50 border-stone-300 text-stone-700";
        }
    };

    return (
        <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-700 pb-20 h-[calc(100vh-100px)] flex flex-col">

            {/* Header / Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-stone-100 shrink-0">
                <div className="flex items-center gap-6">
                    <div>
                        <h2 className="font-display text-2xl text-teal-800">Agenda Semanal</h2>
                        <p className="text-stone-500 text-sm mt-1">Octubre 2023</p>
                    </div>

                    <div className="flex w-full sm:w-auto items-center gap-1 md:gap-2 bg-stone-50/80 p-1.5 rounded-2xl border border-stone-100 shadow-sm relative overflow-x-auto">
                        <button
                            onClick={() => setViewMode('Semana')}
                            className={cn("px-5 py-2 text-sm rounded-xl transition-all duration-300 relative z-10", viewMode === 'Semana' ? "font-bold shadow-sm border border-stone-100/50 text-teal-800 bg-white" : "font-medium text-stone-500 hover:text-teal-800")}
                        >
                            Semana
                        </button>
                        <button
                            onClick={() => setViewMode('Día')}
                            className={cn("px-5 py-2 text-sm rounded-xl transition-all duration-300 relative z-10", viewMode === 'Día' ? "font-bold shadow-sm border border-stone-100/50 text-teal-800 bg-white" : "font-medium text-stone-500 hover:text-teal-800")}
                        >
                            Día
                        </button>
                        <button
                            onClick={() => setViewMode('Mes')}
                            className={cn("px-5 py-2 text-sm rounded-xl transition-all duration-300 relative z-10", viewMode === 'Mes' ? "font-bold shadow-sm border border-stone-100/50 text-teal-800 bg-white" : "font-medium text-stone-500 hover:text-teal-800")}
                        >
                            Mes
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={openSpecialistBooking}
                        className="bg-yellow-500 hover:bg-yellow-600 text-stone-900 px-6 py-2.5 rounded-full font-bold shadow-lg shadow-yellow-500/30 transition-all text-sm flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        <span className="hidden sm:inline">Nueva Cita</span>
                    </button>
                </div>
            </div>

            {/* Calendar Main Area */}
            <div className="flex-1 bg-white rounded-2xl shadow-sm border border-stone-100 overflow-hidden flex flex-col min-h-0">

                {viewMode === 'Semana' && (
                    <>
                        {/* Days Header */}
                        <div className="overflow-x-auto border-b border-stone-100 bg-stone-50/50 shrink-0">
                            <div className="grid grid-cols-6 min-w-[800px] lg:min-w-full">
                                <div className="p-4 border-r border-stone-100 flex items-end justify-end text-xs text-stone-400 font-medium">GMT-4</div>
                                {['Lun 23', 'Mar 24', 'Mie 25', 'Jue 26', 'Vie 27'].map((day, idx) => {
                                    const isToday = idx === 2; // Mocking Wednesday as today
                                    return (
                                        <div key={day} className={cn(
                                            "p-4 text-center border-r border-stone-100 last:border-0",
                                            isToday ? "bg-yellow-50/50" : ""
                                        )}>
                                            <p className={cn("text-xs uppercase mb-1 font-bold", isToday ? "text-yellow-600" : "text-stone-400")}>{day.split(' ')[0]}</p>
                                            <p className={cn("text-xl font-display", isToday ? "text-yellow-600 font-bold" : "text-teal-800")}>{day.split(' ')[1]}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Time Grid (Scrollable) */}
                        <div className="flex-1 overflow-y-auto overflow-x-auto relative scroll-smooth calendar-grid">
                            <div className="min-w-[800px] lg:min-w-full relative">

                                {/* Current Time Indicator Line (Mocked at 10:15) */}
                                <div className="absolute left-0 right-0 border-t-2 border-yellow-500 z-20 pointer-events-none flex items-center" style={{ top: '225px' }}>
                                    <div className="w-2 h-2 rounded-full bg-yellow-500 -ml-1"></div>
                                    <div className="bg-yellow-500 text-[10px] text-white px-1.5 py-0.5 rounded ml-1 font-bold shadow-sm">10:15</div>
                                </div>

                                {timeSlots.map((hour) => (
                                    <div key={hour} className="grid grid-cols-6 border-b border-stone-100 min-h-[100px] group">
                                        {/* Time Label */}
                                        <div className="p-2 border-r border-stone-100 flex justify-end">
                                            <span className="text-xs text-stone-400 font-medium group-hover:text-teal-600 transition-colors">
                                                {hour.toString().padStart(2, '0')}:00
                                            </span>
                                        </div>

                                        {/* Columns per day */}
                                        <div className="border-r border-stone-100 p-1 relative"></div>
                                        <div className="border-r border-stone-100 p-1 relative"></div>
                                        <div className="border-r border-stone-100 p-1 relative bg-yellow-50/20">
                                            {/* Wednesday Events */}
                                            {hour === 9 && (
                                                <div className="absolute inset-x-1 top-1 bottom-1">
                                                    {/* Mocking overlapping events for UI richness */}
                                                    <div className="flex gap-1 h-full">
                                                        <div className="flex-1 rounded-xl p-2.5 border-l-4 bg-yellow-50 border-yellow-500 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col relative overflow-hidden group/event">
                                                            <p className="text-[10px] font-bold text-yellow-800 uppercase tracking-wider mb-0.5">Sesión Terapéutica</p>
                                                            <p className="text-sm font-bold text-teal-900 truncate">Carlos Rodriguez</p>
                                                            <div className="mt-auto flex items-center justify-between text-xs text-yellow-700/80">
                                                                <span>09:00 - 10:00</span>
                                                                <Video className="w-3.5 h-3.5" />
                                                            </div>
                                                        </div>
                                                        <div className="flex-1 rounded-xl p-2.5 border-l-4 bg-teal-50 border-teal-600 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col relative overflow-hidden">
                                                            <p className="text-[10px] font-bold text-teal-700 uppercase tracking-wider mb-0.5">Coaching</p>
                                                            <p className="text-sm font-bold text-teal-900 truncate">Ana Torres</p>
                                                            <div className="mt-auto flex items-center justify-between text-xs text-teal-700/80">
                                                                <span>09:00 - 10:30</span>
                                                                <MapPin className="w-3.5 h-3.5" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {hour === 11 && (
                                                <div className="absolute inset-x-1 top-1 h-[140px] z-10">
                                                    <div className="w-full h-full rounded-xl p-3 border-l-4 bg-stone-100 border-teal-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col relative overflow-hidden group/event">
                                                        <div className="flex justify-between items-start mb-1">
                                                            <p className="text-[10px] font-bold text-teal-800 uppercase tracking-wider">Consulta Inicial</p>
                                                            <span className="relative flex h-2 w-2">
                                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                                                            </span>
                                                        </div>
                                                        <p className="text-sm font-bold text-teal-950">Javier Mendez</p>
                                                        <p className="text-xs text-stone-500 mt-1 line-clamp-2">Paciente derivado. Requiere evaluación para ansiedad severa.</p>
                                                        <div className="mt-auto flex items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-200">
                                                            <span>11:00 - 11:45</span>
                                                            <MapPin className="w-3.5 h-3.5" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {hour === 15 && (
                                                <div className="absolute inset-x-1 top-1 h-[140px] z-10">
                                                    <div className="w-[85%] ml-auto h-full rounded-xl p-3 border-l-4 bg-teal-700 border-teal-900 text-white shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer flex flex-col relative overflow-hidden">
                                                        <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-xl -mr-4 -mt-4"></div>
                                                        <p className="text-[10px] font-bold text-teal-200 uppercase tracking-wider mb-1 relative z-10">Consultoría Corp.</p>
                                                        <p className="text-base font-display italic text-white relative z-10">Patricia Leal</p>
                                                        <div className="mt-auto flex items-center justify-between text-xs text-teal-100 relative z-10">
                                                            <span>15:00 - 16:30</span>
                                                            <Video className="w-3.5 h-3.5" />
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="border-r border-stone-100 p-1 relative"></div>
                                        <div className="p-1 relative"></div>
                                    </div>
                                ))}
                            </div>
                        </>
                )}

                        {viewMode === 'Día' && (
                            <>
                                {/* Days Header */}
                                <div className="grid border-b border-stone-100 bg-stone-50/50 shrink-0" style={{ gridTemplateColumns: '80px 1fr' }}>
                                    <div className="p-4 border-r border-stone-100 flex items-end justify-end text-xs text-stone-400 font-medium">GMT-4</div>
                                    <div className="p-4 text-center bg-yellow-50/50">
                                        <p className="text-xs uppercase mb-1 font-bold text-yellow-600">Mie</p>
                                        <p className="text-xl font-display text-yellow-600 font-bold">25</p>
                                    </div>
                                </div>

                                {/* Time Grid */}
                                <div className="flex-1 overflow-y-auto relative scroll-smooth calendar-grid animate-in fade-in duration-500">
                                    <div className="absolute left-0 right-0 border-t-2 border-yellow-500 z-20 pointer-events-none flex items-center" style={{ top: '225px' }}>
                                        <div className="w-2 h-2 rounded-full bg-yellow-500 -ml-1"></div>
                                        <div className="bg-yellow-500 text-[10px] text-white px-1.5 py-0.5 rounded ml-1 font-bold shadow-sm">10:15</div>
                                    </div>

                                    {timeSlots.map((hour) => (
                                        <div key={hour} className="grid border-b border-stone-100 min-h-[100px] group" style={{ gridTemplateColumns: '80px 1fr' }}>
                                            <div className="p-2 border-r border-stone-100 flex justify-end">
                                                <span className="text-xs text-stone-400 font-medium group-hover:text-teal-600 transition-colors">
                                                    {hour.toString().padStart(2, '0')}:00
                                                </span>
                                            </div>
                                            <div className="p-2 relative bg-yellow-50/10">
                                                {hour === 9 && (
                                                    <div className="absolute inset-x-2 top-1 bottom-1">
                                                        <div className="flex gap-2 h-full">
                                                            <div className="flex-1 rounded-xl p-3 border-l-4 bg-yellow-50 border-yellow-500 shadow-sm flex flex-col relative overflow-hidden">
                                                                <p className="text-xs font-bold text-yellow-800 uppercase tracking-wider mb-1">Sesión Terapéutica</p>
                                                                <p className="text-base font-bold text-teal-900">Carlos Rodriguez</p>
                                                                <div className="mt-auto flex items-center justify-between text-sm text-yellow-700/80">
                                                                    <span>09:00 - 10:00</span>
                                                                    <Video className="w-4 h-4" />
                                                                </div>
                                                            </div>
                                                            <div className="flex-1 rounded-xl p-3 border-l-4 bg-teal-50 border-teal-600 shadow-sm flex flex-col relative overflow-hidden">
                                                                <p className="text-xs font-bold text-teal-700 uppercase tracking-wider mb-1">Coaching Ejecutivo</p>
                                                                <p className="text-base font-bold text-teal-900">Ana Torres</p>
                                                                <div className="mt-auto flex items-center justify-between text-sm text-teal-700/80">
                                                                    <span>09:00 - 10:30</span>
                                                                    <MapPin className="w-4 h-4" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {hour === 11 && (
                                                    <div className="absolute inset-x-2 top-1 h-[140px] z-10">
                                                        <div className="w-1/2 h-full rounded-xl p-3 border-l-4 bg-stone-100 border-teal-800 shadow-sm flex flex-col relative overflow-hidden group/event">
                                                            <div className="flex justify-between items-start mb-1">
                                                                <p className="text-[10px] font-bold text-teal-800 uppercase tracking-wider">Consulta Inicial</p>
                                                                <span className="relative flex h-2 w-2">
                                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                                                                </span>
                                                            </div>
                                                            <p className="text-base font-bold text-teal-950">Javier Mendez</p>
                                                            <p className="text-sm text-stone-500 mt-1 line-clamp-2">Paciente derivado. Requiere evaluación para ansiedad severa.</p>
                                                            <div className="mt-auto flex items-center justify-between text-sm text-stone-500 pt-2 border-t border-stone-200">
                                                                <span>11:00 - 11:45</span>
                                                                <MapPin className="w-4 h-4" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                                {hour === 15 && (
                                                    <div className="absolute inset-x-2 top-1 h-[140px] z-10">
                                                        <div className="w-1/2 ml-auto h-full rounded-xl p-4 border-l-4 bg-teal-700 border-teal-900 text-white shadow-md flex flex-col relative overflow-hidden hover:-translate-y-0.5 transition-transform">
                                                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-6 -mt-6 pointer-events-none"></div>
                                                            <p className="text-xs font-bold text-teal-200 uppercase tracking-wider mb-1 relative z-10">Consultoría Corporativa</p>
                                                            <p className="text-lg font-display italic text-white relative z-10">Patricia Leal</p>
                                                            <div className="mt-auto flex items-center justify-between text-sm text-teal-100 relative z-10">
                                                                <span>15:00 - 16:30</span>
                                                                <Video className="w-4 h-4" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                    </>
                )}

                {viewMode === 'Mes' && (
                    <div className="flex-1 flex flex-col min-h-0 bg-stone-50/30 animate-in fade-in duration-500">
                        <div className="grid grid-cols-7 border-b border-stone-100 bg-white shrink-0">
                            {['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'].map(day => (
                                <div key={day} className="p-3 text-center border-r border-stone-100 last:border-0">
                                    <p className="text-[10px] md:text-xs font-bold text-stone-500 uppercase tracking-wider">{day}</p>
                                </div>
                            ))}
                        </div>
                        <div className="flex-1 grid grid-cols-7 grid-rows-5 bg-stone-100 gap-px border-b border-stone-100 overflow-y-auto">
                            {Array.from({ length: 35 }).map((_, i) => {
                                const dayOfMonth = i - 1; // offset so 1st is Wednesday
                                const isCurrentMonth = dayOfMonth >= 1 && dayOfMonth <= 31;
                                const isToday = dayOfMonth === 25;

                                return (
                                    <div key={i} className={cn(
                                        "bg-white p-2 md:p-3 min-h-[100px] flex flex-col gap-1 transition-colors hover:bg-stone-50/50 cursor-pointer overflow-hidden",
                                        !isCurrentMonth ? "bg-stone-50/50 opacity-50 text-stone-400" : ""
                                    )}>
                                        <div className="flex justify-between items-start mb-1">
                                            <span className={cn(
                                                "w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded-full text-xs md:text-sm font-medium",
                                                isToday ? "bg-yellow-500 text-stone-900 font-bold" : (isCurrentMonth ? "text-stone-700" : "text-stone-400")
                                            )}>
                                                {isCurrentMonth ? dayOfMonth : (dayOfMonth <= 0 ? 30 + dayOfMonth : dayOfMonth - 31)}
                                            </span>
                                        </div>

                                        {/* Mocking dots for events based on day */}
                                        {isCurrentMonth && dayOfMonth === 25 && (
                                            <div className="space-y-1 md:space-y-1.5 mt-1">
                                                <div className="text-[9px] md:text-[10px] px-1.5 py-0.5 rounded bg-yellow-50 border border-yellow-200 text-yellow-800 font-medium truncate">09:00 - Terapia (C)</div>
                                                <div className="text-[9px] md:text-[10px] px-1.5 py-0.5 rounded bg-teal-50 border border-teal-200 text-teal-800 font-medium truncate">09:00 - Coaching (A)</div>
                                                <div className="text-[9px] md:text-[10px] px-1.5 py-0.5 rounded bg-stone-100 border border-teal-800/30 text-teal-900 font-medium truncate">11:00 - Inicial (J)</div>
                                            </div>
                                        )}
                                        {isCurrentMonth && dayOfMonth === 24 && (
                                            <div className="space-y-1 md:space-y-1.5 mt-1">
                                                <div className="text-[9px] md:text-[10px] px-1.5 py-0.5 rounded bg-yellow-50 border border-yellow-200 text-yellow-800 font-medium truncate">14:00 - Terapia (L)</div>
                                                <div className="text-[9px] md:text-[10px] px-1.5 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-800 font-medium truncate">16:00 - Corp. (P)</div>
                                            </div>
                                        )}
                                        {isCurrentMonth && dayOfMonth === 26 && (
                                            <div className="space-y-1 md:space-y-1.5 mt-1">
                                                <div className="text-[9px] md:text-[10px] px-1.5 py-0.5 rounded bg-gray-100 border border-gray-300 text-gray-700 font-medium truncate">10:00 - Revisión</div>
                                                <div className="text-xs text-stone-400 font-medium mt-1">+1 más</div>
                                            </div>
                                        )}
                                        {isCurrentMonth && dayOfMonth === 18 && (
                                            <div className="space-y-1 md:space-y-1.5 mt-1">
                                                <div className="text-[9px] md:text-[10px] px-1.5 py-0.5 rounded bg-yellow-50 border border-yellow-200 text-yellow-800 font-medium truncate">09:00 - Terapia (E)</div>
                                            </div>
                                        )}
                                        {isCurrentMonth && dayOfMonth === 10 && (
                                            <div className="space-y-1 md:space-y-1.5 mt-1">
                                                <div className="text-[9px] md:text-[10px] px-1.5 py-0.5 rounded bg-teal-50 border border-teal-200 text-teal-800 font-medium truncate">11:00 - Asesoría (F)</div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
                .scrollbar-hide {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .calendar-grid::-webkit-scrollbar {
                    width: 8px;
                }
                .calendar-grid::-webkit-scrollbar-track {
                    background: transparent;
                }
                .calendar-grid::-webkit-scrollbar-thumb {
                    background-color: #e5e7eb;
                    border-radius: 20px;
                }
            `}</style>
        </div>
    );
}
