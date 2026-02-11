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

    // Mock unavailable days (e.g., weekends or fully booked slots)
    const unavailableDays = [5, 12, 19, 20, 26];

    const morningSlots = timeSlots.filter(t => parseInt(t.split(':')[0]) < 12);
    const afternoonSlots = timeSlots.filter(t => parseInt(t.split(':')[0]) >= 12);

    return (
        <div className="w-full bg-white rounded-3xl overflow-hidden flex flex-col lg:flex-row h-[450px]">

            {/* COLUMN 1: Calendar Grid (Center -> Now Left) */}
            <div className="lg:w-2/3 p-6 sm:p-8 flex flex-col border-r border-gray-100">

                <div className="flex justify-between items-center mb-6 px-2">
                    <button className="p-2 hover:bg-deglya-cream rounded-full text-deglya-wood transition-colors"><ChevronLeft size={20} /></button>
                    <h3 className="text-2xl font-display font-bold text-deglya-teal">Febrero 2026</h3>
                    <button className="p-2 hover:bg-deglya-cream rounded-full text-deglya-wood transition-colors"><ChevronRight size={20} /></button>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                    <div className="grid grid-cols-7 gap-4 text-center mb-4">
                        {['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'].map(d => (
                            <span key={d} className="text-xs font-bold text-deglya-wood/40 tracking-widest">{d}</span>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-y-3 gap-x-2">
                        {/* Mock Offset */}
                        <div className="col-span-1"></div>
                        {days.map(day => {
                            const isUnavailable = unavailableDays.includes(day);
                            return (
                                <div key={day} className="flex justify-center">
                                    <button
                                        onClick={() => !isUnavailable && onSelectDate(day)}
                                        disabled={isUnavailable}
                                        className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center text-sm transition-all duration-300 relative group font-medium",
                                            selectedDate === day
                                                ? "bg-deglya-mustard text-stone-900 shadow-lg shadow-deglya-mustard/30 scale-110 font-bold"
                                                : isUnavailable
                                                    ? "text-gray-300 bg-transparent cursor-not-allowed decoration-slice line-through decoration-gray-300/50"
                                                    : "text-deglya-wood hover:bg-deglya-cream hover:text-deglya-teal"
                                        )}
                                    >
                                        {day}
                                        {selectedDate === day && (
                                            <motion_glow />
                                        )}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="mt-6 flex justify-center gap-6 text-xs text-deglya-wood/60">
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-deglya-mustard"></div> Seleccionado</span>
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-deglya-cream"></div> Disponible</span>
                    <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full border border-gray-200 text-gray-300 flex items-center justify-center text-[8px]"></div> No Disponible</span>
                </div>
            </div>

            {/* COLUMN 2: Time Slots (Right) */}
            <div className="lg:w-1/3 bg-[#FAFAF8] p-6 sm:p-8 flex flex-col h-full overflow-hidden">
                <div className="mb-4 shrink-0">
                    <span className="text-xs font-bold text-deglya-wood/40 uppercase tracking-widest block mb-1">Disponibilidad</span>
                    <h3 className="text-lg font-display font-bold text-stone-900 truncate">
                        {selectedDate ? `Jueves ${selectedDate}` : 'Elegir Fecha'}
                    </h3>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
                    {/* Morning Section */}
                    {morningSlots.length > 0 && (
                        <div>
                            <span className="text-xs font-medium text-deglya-wood/40 mb-2 block">MAÑANA</span>
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
                        <span className="text-xs font-medium text-deglya-wood/40 mb-2 block">TARDE</span>
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
                                    [1, 2].map(i => <div key={i} className="h-10 w-full bg-gray-100 rounded-xl animate-pulse"></div>)
                                )
                            )}
                        </div>
                    </div>
                </div>

                {/* Confirm Button Placeholder for Mobile logic if needed */}
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
