import React from 'react';
import { cn } from '../../../lib/utils';

const RecentConsultations = () => {
    const consultations = [
        { id: 1, name: 'Maria Perez', email: 'maria@email.com', message: 'Hola, estoy interesada en el taller de mindfulness para el manejo de la ansiedad. ¿Tienen fechas disponibles...', status: 'Pendiente', color: 'indigo' },
        { id: 2, name: 'Jose Lopez', email: 'jose.lo@email.com', message: 'Quisiera agendar una cita para terapia de pareja. Hemos escuchado buenas referencias sobre su enfoque...', status: 'Respondido', color: 'emerald' },
    ];

    const colors = {
        indigo: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-300",
        emerald: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300"
    };

    return (
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100 p-6 flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-xl text-deglya-accent">Consultas Recientes</h2>
                <a className="text-sm text-deglya-primary hover:text-deglya-primary/80 font-medium transition-colors" href="#">Ver todas</a>
            </div>

            <div className="space-y-4">
                {consultations.map((item) => (
                    <div key={item.id} className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-gray-50 hover:bg-deglya-soft-gold/10 transition-all cursor-pointer group">
                        <div className="flex items-center gap-3 min-w-[200px]">
                            <div className={cn("w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm", colors[item.color])}>
                                {item.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <h4 className="font-bold text-sm text-deglya-accent group-hover:text-deglya-primary transition-colors">{item.name}</h4>
                                <p className="text-xs text-gray-400">{item.email}</p>
                            </div>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-500 line-clamp-2">{item.message}</p>
                        </div>
                        <div className="flex items-center gap-2 sm:ml-4">
                            <span className={cn(
                                "px-2.5 py-1 text-[10px] font-bold rounded-lg uppercase tracking-wider",
                                item.status === 'Pendiente' ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"
                            )}>{item.status}</span>
                            <button className="p-2 text-gray-400 hover:text-deglya-primary transition-colors">
                                <span className="material-icons-outlined text-lg">{item.status === 'Pendiente' ? 'reply' : 'visibility'}</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentConsultations;
