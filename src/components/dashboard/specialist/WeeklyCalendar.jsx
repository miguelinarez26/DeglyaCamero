import React from 'react';
import { cn } from '../../../lib/utils';

const WeeklyCalendar = () => {
    const days = [
        { name: 'Lun', date: '23' },
        { name: 'Mar', date: '24' },
        { name: 'Mie', date: '25', isPrimary: true },
        { name: 'Jue', date: '26' },
        { name: 'Vie', date: '27' },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-xl text-teal-800">Agenda Semanal</h2>
                <div className="flex gap-2 text-sm text-stone-500">
                    <button className="hover:text-yellow-600 transition-colors"><span className="material-icons-outlined">chevron_left</span></button>
                    <span>Oct 23 - Oct 29, 2023</span>
                    <button className="hover:text-yellow-600 transition-colors"><span className="material-icons-outlined">chevron_right</span></button>
                </div>
            </div>

            <div className="overflow-x-auto scrollbar-hide">
                <div className="min-w-[600px]">
                    <div className="grid grid-cols-5 gap-4 mb-4 text-center">
                        {days.map((day) => (
                            <div key={day.date} className="group cursor-pointer">
                                <p className={cn("text-xs uppercase transition-colors mb-1", day.isPrimary ? "text-yellow-600 font-bold" : "text-stone-400 group-hover:text-yellow-600")}>{day.name}</p>
                                <p className={cn("font-bold transition-colors", day.isPrimary ? "text-yellow-500" : "text-teal-800 group-hover:text-yellow-500")}>{day.date}</p>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-4">
                        {/* 09:00 slot */}
                        <div className="grid grid-cols-5 gap-4 h-24 border-t border-stone-100 py-2">
                            <div className="p-2 rounded-xl bg-yellow-50 border-l-4 border-yellow-500 text-[11px] hover:bg-yellow-100/50 transition-colors cursor-pointer shadow-sm">
                                <p className="font-bold text-teal-800">Sesión Terapéutica</p>
                                <p className="text-stone-500">Carlos Rodriguez</p>
                                <p className="text-stone-400 mt-1 font-medium">09:00 - 10:00</p>
                            </div>
                            <div></div>
                            <div className="p-2 rounded-xl bg-teal-50 border-l-4 border-teal-600 text-[11px] hover:bg-teal-100/50 transition-colors cursor-pointer shadow-sm">
                                <p className="font-bold text-teal-800">Coaching Ejecutivo</p>
                                <p className="text-stone-500">Ana Torres</p>
                                <p className="text-stone-400 mt-1 font-medium">09:00 - 10:30</p>
                            </div>
                            <div></div>
                            <div></div>
                        </div>

                        {/* 11:00 slot */}
                        <div className="grid grid-cols-5 gap-4 h-24 border-t border-stone-100 py-2">
                            <div></div>
                            <div className="p-2 rounded-xl bg-yellow-50 border-l-4 border-yellow-500 text-[11px] hover:bg-yellow-100/50 transition-colors cursor-pointer shadow-sm">
                                <p className="font-bold text-teal-800">Sesión de Pareja</p>
                                <p className="text-stone-500">Sofia & Luis</p>
                                <p className="text-stone-400 mt-1 font-medium">11:00 - 12:30</p>
                            </div>
                            <div></div>
                            <div className="p-2 rounded-xl bg-stone-100 border-l-4 border-teal-800 text-[11px] relative hover:bg-stone-200 transition-colors cursor-pointer shadow-sm">
                                <p className="font-bold text-teal-900">Consulta Inicial</p>
                                <p className="text-stone-600">Javier Mendez</p>
                                <p className="text-stone-500 mt-1 font-medium">11:00 - 11:45</p>
                                <span className="absolute top-2 right-2 w-2 h-2 bg-teal-600 rounded-full animate-pulse"></span>
                            </div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeeklyCalendar;
