import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

// Configuration as per AGENT_CONFIG.md (Hard colors, no random hex)
// Using: bg-deglya-teal, text-deglya-wood, bg-deglya-cream

export const CalendarView = ({ onSelectDate, selectedDate, onSelectTime, selectedTime, timeSlots = [] }) => {
    // Mock calendar data generation (static for UI demo, but functional via props)
    // In real implementation, this should align with the actual month/year passed in props
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    const morningSlots = timeSlots.filter(t => parseInt(t.split(':')[0]) < 12);
    const afternoonSlots = timeSlots.filter(t => parseInt(t.split(':')[0]) >= 12);

    return (
        <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row min-h-[600px]">

            {/* COLUMN 1: Service Context (Left Sidebar) - The "Premium" Feel */}
            <div className="lg:w-1/4 bg-deglya-teal text-white p-8 flex flex-col justify-between relative overflow-hidden">
                {/* Decorative Blob */}
                <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="w-16 h-16 rounded-full border-2 border-white/30 overflow-hidden mb-6 shadow-lg">
                        <img
                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop"
                            alt="Deglya Camero"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <h2 className="font-display text-2xl font-bold mb-1">Deglya Camero</h2>
                    <p className="text-white/70 text-sm font-medium tracking-wide uppercase">Psicóloga Clínica</p>

                    <div className="mt-8 pt-8 border-t border-white/20">
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                            <span className="inline-block px-2 py-1 bg-deglya-mustard text-stone-900 text-xs font-bold rounded mb-2">SERVICIO</span>
                            <h3 className="font-display text-xl font-bold leading-tight">Psicoterapia y Coaching</h3>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 mt-auto pt-10">
                    <Quote className="text-deglya-mustard mb-4 opacity-80" size={32} />
                    <p className="font-display italic text-lg leading-relaxed text-white/90">
                        "Tu mente es el escenario donde todo es posible. Juntos, daremos forma a tu mejor versión."
                    </p>

                    <div className="mt-8 flex justify-between text-xs font-medium text-white/60 border-t border-white/20 pt-4">
                        <div className="flex flex-col">
                            <span className="mb-1 uppercase tracking-wider">Duración</span>
                            <span className="text-white text-base">50 Min</span>
                        </div>
                        <div className="flex flex-col text-right">
                            <span className="mb-1 uppercase tracking-wider">Inversión</span>
                            <span className="text-white text-base">$60.00</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* COLUMN 2: Calendar Grid (Center) */}
            <div className="lg:w-2/4 p-8 border-r border-gray-100 flex flex-col">

                <div className="flex justify-between items-center mb-8 px-4">
                    <button className="p-2 hover:bg-deglya-cream rounded-full text-deglya-wood transition-colors"><ChevronLeft size={24} /></button>
                    <h3 className="text-3xl font-display font-bold text-deglya-teal">Febrero 2026</h3>
                    <button className="p-2 hover:bg-deglya-cream rounded-full text-deglya-wood transition-colors"><ChevronRight size={24} /></button>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                    <div className="grid grid-cols-7 gap-4 text-center mb-4">
                        {['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'].map(d => (
                            <span key={d} className="text-xs font-bold text-deglya-wood/40 tracking-widest">{d}</span>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-y-4 gap-x-2">
                        {/* Mock Offset */}
                        <div className="col-span-1"></div>
                        {days.map(day => (
                            <div key={day} className="flex justify-center">
                                <button
                                    onClick={() => onSelectDate(day)}
                                    className={cn(
                                        "w-12 h-12 rounded-full flex items-center justify-center text-base transition-all duration-300 relative group font-medium",
                                        selectedDate === day
                                            ? "bg-deglya-mustard text-stone-900 shadow-lg shadow-deglya-mustard/30 scale-110 font-bold"
                                            : "text-deglya-wood hover:bg-deglya-cream hover:text-deglya-teal"
                                    )}
                                >
                                    {day}
                                    {selectedDate === day && (
                                        <motion_glow />
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 flex justify-center gap-6 text-xs text-deglya-wood/60">
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-deglya-mustard"></div> Seleccionado</span>
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-deglya-cream"></div> Disponible</span>
                </div>
            </div>

            {/* COLUMN 3: Time Slots (Right) */}
            <div className="lg:w-1/4 bg-[#FAFAF8] p-8 flex flex-col">
                <div className="mb-6">
                    <span className="text-xs font-bold text-deglya-wood/40 uppercase tracking-widest block mb-2">Disponibilidad</span>
                    <h3 className="text-xl font-display font-bold text-stone-900">
                        {selectedDate ? `Jueves ${selectedDate}` : 'Elegir Fecha'}
                    </h3>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
                    {/* Morning Section */}
                    {morningSlots.length > 0 && (
                        <div>
                            <span className="text-xs font-medium text-deglya-wood/40 mb-3 block">MAÑANA</span>
                            <div className="space-y-2">
                                {morningSlots.map(time => (
                                    <SlotButton
                                        key={time}
                                        time={time}
                                        isSelected={selectedTime === time}
                                        onClick={() => onSelectTime(time)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Afternoon Section */}
                    <div>
                        <span className="text-xs font-medium text-deglya-wood/40 mb-3 block">TARDE</span>
                        <div className="space-y-2">
                            {afternoonSlots.length > 0 ? afternoonSlots.map(time => (
                                <SlotButton
                                    key={time}
                                    time={time}
                                    isSelected={selectedTime === time}
                                    onClick={() => onSelectTime(time)}
                                />
                            )) : (
                                !selectedDate && (
                                    [1, 2, 3].map(i => <div key={i} className="h-12 w-full bg-gray-100 rounded-xl animate-pulse"></div>)
                                )
                            )}
                        </div>
                    </div>
                </div>

                {/* Confirm Button Placeholder (Mobile/Desktop logic might vary, usually handled by parent wizard) */}
                {selectedTime && (
                    <div className="pt-6 mt-auto border-t border-gray-200 lg:hidden">
                        <Button className="w-full bg-deglya-mustard text-stone-900">Confirmar</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

// Helper Component for Slots
const SlotButton = ({ time, isSelected, onClick }) => (
    <button
        onClick={onClick}
        className={cn(
            "w-full py-3 px-4 rounded-xl text-sm font-medium border flex justify-between items-center transition-all duration-200 group",
            isSelected
                ? "bg-white border-deglya-mustard text-stone-900 shadow-md ring-1 ring-deglya-mustard"
                : "bg-white border-transparent hover:border-deglya-teal/30 text-stone-600 hover:text-deglya-teal shadow-sm"
        )}
    >
        <span>{formatTime(time)}</span>
        <div className={cn(
            "w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center transition-colors",
            isSelected ? "border-deglya-mustard bg-deglya-mustard" : "group-hover:border-deglya-teal"
        )}>
            {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
        </div>
    </button>
);

// Helper to format 13:00 -> 01:00 PM
const formatTime = (time24) => {
    const [h, m] = time24.split(':');
    const hour = parseInt(h);
    const suffix = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12.toString().padStart(2, '0')}:${m} ${suffix}`;
};

const motion_glow = () => (
    <span className="absolute inset-0 rounded-full bg-deglya-mustard/20 blur-md -z-10"></span>
);
