import { ChevronLeft, ChevronRight, Clock, Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export const CalendarView = ({ onSelectDate, selectedDate, onSelectTime, selectedTime, timeSlots = [] }) => {
    // Mock calendar data generation
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="grid md:grid-cols-7">
                {/* Calendar Side */}
                <div className="p-8 md:col-span-4 border-r border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-display font-bold text-deglya-teal">Julio 2024</h3>
                        <div className="flex gap-2">
                            <button className="p-2 hover:bg-deglya-cream rounded-full text-deglya-wood"><ChevronLeft size={20} /></button>
                            <button className="p-2 hover:bg-deglya-cream rounded-full text-deglya-wood"><ChevronRight size={20} /></button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-2 text-center mb-2">
                        {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'].map(d => (
                            <span key={d} className="text-xs font-bold text-deglya-wood/50 uppercase">{d}</span>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                        {/* Offset for start of month (mock) */}
                        <div className="col-span-1"></div>
                        {days.map(day => (
                            <button
                                key={day}
                                onClick={() => onSelectDate(day)}
                                className={cn(
                                    "aspect-square rounded-full flex items-center justify-center text-sm transition-all duration-300 relative group",
                                    selectedDate === day
                                        ? "bg-deglya-teal text-white shadow-[0_0_15px_rgba(27,108,168,0.6)] scale-110 font-bold"
                                        : "text-deglya-wood hover:bg-deglya-cream hover:text-deglya-teal"
                                )}
                            >
                                {day}
                                {/* Glow effect on hover */}
                                <div className="absolute inset-0 rounded-full bg-deglya-teal/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Time Slots Side */}
                <div className="p-8 md:col-span-3 bg-deglya-cream/30">
                    <h3 className="text-lg font-bold text-deglya-wood mb-6 flex items-center gap-2">
                        <Clock size={18} className="text-deglya-mustard" /> Horarios Disponibles
                    </h3>
                    <div className="space-y-3">
                        {selectedDate ? (
                            <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-right-4 duration-500">
                                {timeSlots.map(time => (
                                    <button
                                        key={time}
                                        onClick={() => onSelectTime(time)}
                                        className={cn(
                                            "py-2 px-4 rounded-lg text-sm font-medium border transition-all duration-200",
                                            selectedTime === time
                                                ? "bg-deglya-teal text-white border-deglya-teal shadow-md"
                                                : "bg-white text-deglya-wood border-gray-200 hover:border-deglya-teal hover:text-deglya-teal"
                                        )}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-deglya-wood/40 text-sm text-center">
                                <CalendarIcon size={32} className="mb-2 opacity-50" />
                                Selecciona un día para ver horarios
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
