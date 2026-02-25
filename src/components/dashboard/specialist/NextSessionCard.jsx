import React from 'react';
import { cn } from '../../../lib/utils';

const NextSessionCard = ({ name, type, time, avatar, onAction }) => {
    return (
        <div className="bg-teal-700 text-white rounded-2xl shadow-lg shadow-teal-700/20 p-6 relative overflow-hidden group">
            {/* Elegant Background Patterns */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-600/30 rounded-full blur-2xl -mr-10 -mt-10 group-hover:scale-110 transition-transform duration-700"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-800/40 rounded-full blur-xl -ml-10 -mb-10"></div>

            <div className="relative z-10">
                <p className="text-teal-200 text-[10px] font-bold tracking-wider uppercase mb-2">Próxima Sesión</p>

                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="font-display text-2xl italic mb-1">{name}</h3>
                        <p className="text-teal-100 text-sm">{type}</p>
                    </div>
                    <div className="w-12 h-12 rounded-full border-2 border-teal-300 overflow-hidden">
                        {avatar ? (
                            <img src={avatar} alt={name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-teal-800/50 flex items-center justify-center">
                                <span className="material-icons-outlined text-teal-200">person</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-teal-600/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="material-icons-outlined text-teal-200">schedule</span>
                        <span className="text-sm font-medium">En {time}</span>
                    </div>
                    <button
                        onClick={onAction}
                        className="bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-1.5 rounded-lg transition-colors border border-white/10"
                    >
                        Ver Ficha
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NextSessionCard;
