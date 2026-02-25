import React, { useState } from 'react';
import { useUIStore } from '@/lib/uiStore';
import { X, Calendar as CalendarIcon, Clock, User, FileText, ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

export default function SpecialistBookingPanel() {
    const { isSpecialistBookingOpen, closeSpecialistBooking } = useUIStore();

    // Form State
    const [patientQuery, setPatientQuery] = useState('');
    const [selectedService, setSelectedService] = useState('therapy');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [recurrence, setRecurrence] = useState('once'); // once, weekly, biweekly, triweekly, monthly

    if (!isSpecialistBookingOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Cita agendada:", { patientQuery, selectedService, date, time, recurrence });
        alert("Cita agendada con éxito");
        closeSpecialistBooking();
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 transition-opacity"
                onClick={closeSpecialistBooking}
            />

            {/* Slide-over Panel */}
            <div className="fixed inset-y-0 right-0 z-50 w-full md:w-[500px] bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-stone-100 bg-stone-50/50">
                    <div>
                        <h2 className="font-display text-2xl text-teal-800">Nueva Cita</h2>
                        <p className="text-sm text-stone-500 mt-1">Programa una sesión para tu paciente</p>
                    </div>
                    <button
                        onClick={closeSpecialistBooking}
                        className="p-2 text-stone-400 hover:text-stone-600 hover:bg-stone-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body Form */}
                <div className="flex-1 overflow-y-auto p-6">
                    <form id="specialist-booking-form" onSubmit={handleSubmit} className="space-y-6">

                        {/* Paciente */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-teal-900">1. Seleccionar Paciente</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="w-5 h-5 text-stone-400" />
                                </div>
                                <input
                                    type="text"
                                    required
                                    placeholder="Buscar por nombre o cédula..."
                                    value={patientQuery}
                                    onChange={(e) => setPatientQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none text-stone-700"
                                />
                            </div>
                        </div>

                        {/* Servicio */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-teal-900">2. Tipo de Servicio</label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    { id: 'therapy', label: 'Sesión Terapéutica' },
                                    { id: 'coaching', label: 'Coaching Ejecutivo' },
                                    { id: 'initial', label: 'Consulta Inicial' },
                                    { id: 'corporate', label: 'Consultoría Corp.' }
                                ].map(service => (
                                    <button
                                        key={service.id}
                                        type="button"
                                        onClick={() => setSelectedService(service.id)}
                                        className={cn(
                                            "px-4 py-3 text-sm font-medium rounded-xl border text-left transition-all flex items-center justify-between",
                                            selectedService === service.id
                                                ? "bg-teal-50 border-teal-600 text-teal-800 shadow-sm"
                                                : "bg-white border-stone-200 text-stone-600 hover:border-stone-300"
                                        )}
                                    >
                                        {service.label}
                                        {selectedService === service.id && <Check className="w-4 h-4 text-teal-600" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Fecha y Hora */}
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-teal-900">3. Fecha y Hora</label>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <CalendarIcon className="w-5 h-5 text-stone-400" />
                                    </div>
                                    <input
                                        type="date"
                                        required
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none text-stone-700"
                                    />
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Clock className="w-5 h-5 text-stone-400" />
                                    </div>
                                    <input
                                        type="time"
                                        required
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none text-stone-700"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Frecuencia (Recurrence) */}
                        <div className="space-y-3 pt-4 border-t border-stone-100">
                            <label className="text-sm font-bold text-teal-900">4. Frecuencia de la Cita</label>
                            <p className="text-xs text-stone-500 -mt-2 mb-3">Establece si esta cita se repetirá automáticamente en tu agenda.</p>

                            <div className="space-y-2">
                                {[
                                    { id: 'once', label: 'Una sola vez', desc: 'Solo este día en este horario' },
                                    { id: 'weekly', label: 'Semanal', desc: 'Se repetirá cada semana' },
                                    { id: 'biweekly', label: 'Cada 14 días', desc: 'Se repetirá cada dos semanas' },
                                    { id: 'triweekly', label: 'Cada 21 días', desc: 'Se repetirá cada tres semanas' },
                                    { id: 'monthly', label: 'Mensual', desc: 'Se repetirá el mismo día cada mes' }
                                ].map(option => (
                                    <label
                                        key={option.id}
                                        className={cn(
                                            "flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all",
                                            recurrence === option.id
                                                ? "bg-yellow-50/50 border-yellow-500"
                                                : "bg-white border-stone-200 hover:border-stone-300"
                                        )}
                                    >
                                        <div className="flex items-center h-5">
                                            <input
                                                type="radio"
                                                name="recurrence"
                                                value={option.id}
                                                checked={recurrence === option.id}
                                                onChange={(e) => setRecurrence(e.target.value)}
                                                className="w-4 h-4 text-yellow-500 border-stone-300 focus:ring-yellow-500"
                                            />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className={cn("text-sm font-bold", recurrence === option.id ? "text-yellow-800" : "text-stone-700")}>
                                                {option.label}
                                            </span>
                                            <span className="text-xs text-stone-500">{option.desc}</span>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Notas Internas */}
                        <div className="space-y-2 pt-4 border-t border-stone-100">
                            <label className="text-sm font-bold text-teal-900">Notas de Preparación (Interno)</label>
                            <textarea
                                rows="3"
                                placeholder="Escribe alguna nota para recordar antes de la consulta..."
                                className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all outline-none text-stone-700 text-sm resize-none"
                            ></textarea>
                        </div>
                    </form>
                </div>

                {/* Footer Action */}
                <div className="p-6 border-t border-stone-100 bg-white shrink-0">
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={closeSpecialistBooking}
                            className="flex-1 px-6 py-3 rounded-xl border border-stone-200 text-stone-600 font-bold hover:bg-stone-50 transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            form="specialist-booking-form"
                            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-stone-900 px-6 py-3 rounded-xl font-bold shadow-lg shadow-yellow-500/30 transition-all flex items-center justify-center gap-2"
                        >
                            Agendar Cita
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
