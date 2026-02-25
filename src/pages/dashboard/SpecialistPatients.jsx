import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Search, FolderOpen, Calendar, MessageCircle, Filter, MoreVertical } from 'lucide-react';

export default function SpecialistPatients() {
    const [searchTerm, setSearchTerm] = useState('');

    // Mock Data for Patients
    const patients = [
        { id: 1, name: 'Patricia Leal', email: 'patricia.l@email.com', condition: 'Consultoría Corporativa', lastSession: 'Hace 2 días', status: 'active', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCyFTR0K6LfnQbVZ_Nd1jScOIi2mzPlMiEn_DOhVLy9yZ_E9ZbClGavI0uY1eg6tS9JVi4O7NjF4UNquLaV4Vbgn8puIfMQ2MXyv9s5VdbxtOG9NhbDq7v-ObMpdI4jM-kmDiL4L3zPFj0_ovU97cng6LxA5uGyTCSI-RpakUo4GFDipdaSIJZerusuY_zeBw2DQqIoNfMS68c8x5c3oaxJYsztcyYHXL8c32kskTIlwxaAhAYtSqMx9MUpCatpq_FZNcW8F0dncgA' },
        { id: 2, name: 'Carlos Rodriguez', email: 'carlos.rod@email.com', condition: 'Ansiedad Generalizada', lastSession: 'Hoy', status: 'active', avatar: null },
        { id: 3, name: 'Ana Torres', email: 'ana.torres@email.com', condition: 'Coaching Ejecutivo', lastSession: 'Hace 1 semana', status: 'active', avatar: null },
        { id: 4, name: 'Sofia Gómez', email: 'sofia.gomez@email.com', condition: 'Terapia de Pareja', lastSession: 'Hace 3 semanas', status: 'inactive', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCk-xZvddxlOGsfxSs9fd7WmFshwkVfMFhatdKr5DRrrT3W_qwZN6xkdhArhZJGKh08RbxSGhf75oTbBR47mh1dKFXYRnFPHMRJd0ObCU1X-LpS46rc8HETbKXF2XhUEXvoZIFcdkZTxOKPgoOtBzUl2Q1Y2bKV-tKPYZeUSXAGCFufl0w4VhktUeNa91MK8ykWU7CSNnYzucKMJONFXNxfT4kKdDbWFoizbpi4dnCQtY4s9TAJGakhd11EPHy4ZAOOA0IHPMmwTek' },
        { id: 5, name: 'Luis Rodriguez', email: 'luis.r@email.com', condition: 'Terapia de Pareja', lastSession: 'Hace 3 semanas', status: 'inactive', avatar: null },
        { id: 6, name: 'Javier Mendez', email: 'javier.m@email.com', condition: 'Evaluación Inicial', lastSession: 'Pendiente', status: 'new', avatar: null },
    ];

    const filteredPatients = patients.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.condition.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-700 pb-20">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                <div>
                    <h2 className="font-display text-2xl text-teal-800">Directorio de Pacientes</h2>
                    <p className="text-stone-500 text-sm mt-1">Gestiona historias clínicas, sesiones e información de contacto.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative w-full md:w-72">
                        <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                        <input
                            type="text"
                            placeholder="Buscar paciente o motivo..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full bg-stone-50 border border-stone-200 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all text-stone-700 font-medium placeholder:text-stone-400"
                        />
                    </div>
                    <button className="flex items-center justify-center p-2.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-500 hover:text-teal-800 hover:bg-stone-100 transition-colors">
                        <Filter className="w-5 h-5" />
                    </button>
                    <button className="bg-yellow-500 hover:bg-yellow-600 text-stone-900 px-4 py-2.5 rounded-xl font-bold shadow-md shadow-yellow-500/20 transition-all text-sm hidden sm:block">
                        + Nuevo Paciente
                    </button>
                </div>
            </div>

            {/* Patient List */}
            <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-stone-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-stone-50/50 border-b border-stone-100 text-xs uppercase tracking-wider text-stone-500 font-semibold">
                                <th className="p-4 pl-6">Paciente</th>
                                <th className="p-4 hidden md:table-cell">Motivo / Condición</th>
                                <th className="p-4 hidden sm:table-cell">Última Sesión</th>
                                <th className="p-4">Estado</th>
                                <th className="p-4 pr-6 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-50">
                            {filteredPatients.map((patient) => (
                                <tr key={patient.id} className="hover:bg-stone-50/80 transition-colors group">
                                    <td className="p-4 pl-6">
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                {patient.avatar ? (
                                                    <img src={patient.avatar} alt={patient.name} className="w-10 h-10 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform" />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-sm border border-teal-100 group-hover:bg-teal-100 transition-colors">
                                                        {patient.name.split(' ').map(n => n[0]).join('')}
                                                    </div>
                                                )}
                                                <span className={cn(
                                                    "absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full",
                                                    patient.status === 'active' ? "bg-green-500" :
                                                        patient.status === 'new' ? "bg-blue-500" : "bg-stone-300"
                                                )}></span>
                                            </div>
                                            <div>
                                                <p className="font-bold text-teal-900 group-hover:text-yellow-600 transition-colors cursor-pointer">{patient.name}</p>
                                                <p className="text-xs text-stone-500 max-w-[150px] truncate">{patient.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 hidden md:table-cell">
                                        <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-stone-100 text-stone-600 border border-stone-200">
                                            {patient.condition}
                                        </span>
                                    </td>
                                    <td className="p-4 hidden sm:table-cell text-sm text-stone-500 font-medium">
                                        {patient.lastSession}
                                    </td>
                                    <td className="p-4">
                                        <span className={cn(
                                            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide",
                                            patient.status === 'active' ? "bg-green-100 text-green-700" :
                                                patient.status === 'new' ? "bg-blue-100 text-blue-700" : "bg-stone-100 text-stone-500"
                                        )}>
                                            {patient.status === 'active' ? 'Activo' :
                                                patient.status === 'new' ? 'Nuevo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="p-4 pr-6">
                                        <div className="flex items-center justify-end gap-2 text-stone-400">
                                            {/* Folder icon for clinical files */}
                                            <button
                                                className="p-2 hover:bg-yellow-50 hover:text-yellow-600 rounded-lg transition-colors tooltip-trigger relative group/btn"
                                                title="Ver Ficha Clínica"
                                            >
                                                <FolderOpen className="w-5 h-5" />
                                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-stone-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Archivos</span>
                                            </button>
                                            <button
                                                className="p-2 hover:bg-teal-50 hover:text-teal-700 rounded-lg transition-colors tooltip-trigger relative group/btn"
                                                title="Nueva Cita"
                                            >
                                                <Calendar className="w-5 h-5" />
                                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-stone-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Agendar</span>
                                            </button>
                                            <button
                                                className="p-2 hover:bg-stone-100 hover:text-stone-700 rounded-lg transition-colors tooltip-trigger relative group/btn"
                                                title="Mensaje"
                                            >
                                                <MessageCircle className="w-5 h-5" />
                                                <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-stone-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Mensaje</span>
                                            </button>
                                            <button className="p-2 hover:bg-stone-100 hover:text-stone-700 rounded-lg transition-colors">
                                                <MoreVertical className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {filteredPatients.length === 0 && (
                        <div className="p-12 text-center flex flex-col items-center">
                            <div className="w-16 h-16 bg-stone-50 text-stone-300 rounded-full flex items-center justify-center mb-4">
                                <Search className="w-8 h-8" />
                            </div>
                            <h3 className="text-teal-900 font-display text-lg mb-1">No se encontraron pacientes</h3>
                            <p className="text-stone-500 text-sm">No hay resultados para "{searchTerm}"</p>
                            <button
                                onClick={() => setSearchTerm('')}
                                className="mt-4 text-sm text-yellow-600 font-bold hover:text-yellow-700 transition-colors"
                            >
                                Limpiar búsqueda
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
