import React from 'react';
import { cn } from '../../../lib/utils';

const RecentPatients = () => {
    // Mock data
    const patients = [
        { name: 'Pedro Sánchez', info: 'Ansiedad • Sesión 4/10', status: 'online', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB8dzlJqWnWGpbKonUt8S4IitX5MEBcJuCrYY_tgHrfFYE6ykl4SrBHaePEOmtehcQHtaDZIMJaKECNSdZqRKmzOwK37zyAFi14kXa3cO2gLQcYH5nwa1P9IkKhhQGVKjFN5K7mE-NQFsZRpPhmUbi3LBi_yLyyjCLvke6MBQ1CU0tpTgOhkvfO1lQO5fvw2z_ry93ytHkp2UMJCjRwuMCZ1lPbmJmdsLPX85gcwumjreIZ5GqC33hNR1pQUX9i-U1FhekFEiCGHik' },
        { name: 'Sofia Gómez', info: 'Autoestima • Sesión 2/6', status: 'offline', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCk-xZvddxlOGsfxSs9fd7WmFshwkVfMFhatdKr5DRrrT3W_qwZN6xkdhArhZJGKh08RbxSGhf75oTbBR47mh1dKFXYRnFPHMRJd0ObCU1X-LpS46rc8HETbKXF2XhUEXvoZIFcdkZTxOKPgoOtBzUl2Q1Y2bKV-tKPYZeUSXAGCFufl0w4VhktUeNa91MK8ykWU7CSNnYzucKMJONFXNxfT4kKdDbWFoizbpi4dnCQtY4s9TAJGakhd11EPHy4ZAOOA0IHPMmwTek' },
        { name: 'Luis Rodriguez', info: 'Terapia de Pareja • Sesión 1/8', status: 'offline', avatar: null },
    ];

    return (
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_-2px_rgba(0,0,0,0.05)] border border-gray-100 p-6 flex flex-col h-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-xl text-deglya-accent">Pacientes Recientes</h2>
                <button className="p-1 rounded-md hover:bg-gray-100 text-gray-400">
                    <span className="material-icons-outlined">filter_list</span>
                </button>
            </div>

            <div className="space-y-6">
                {patients.map((patient, idx) => (
                    <div key={idx} className="flex items-center gap-4 group cursor-pointer transition-all">
                        <div className="relative">
                            {patient.avatar ? (
                                <img src={patient.avatar} alt={patient.name} className="w-10 h-10 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform" />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-sm">
                                    {patient.name.split(' ').map(n => n[0]).join('')}
                                </div>
                            )}
                            <span className={cn(
                                "absolute bottom-0 right-0 w-3 h-3 border-2 border-white rounded-full",
                                patient.status === 'online' ? "bg-green-500" : "bg-gray-300"
                            )}></span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-sm text-deglya-accent group-hover:text-deglya-primary transition-colors truncate">{patient.name}</h4>
                            <p className="text-xs text-gray-400 truncate">{patient.info}</p>
                        </div>
                        <button className="text-gray-300 hover:text-deglya-primary transition-colors">
                            <span className="material-icons-outlined">more_vert</span>
                        </button>
                    </div>
                ))}
            </div>

            <button className="w-full mt-auto pt-6 border-t border-gray-50 text-sm font-medium text-gray-500 hover:text-deglya-primary transition-colors">
                Ver Directorio Completo
            </button>
        </div>
    );
};

export default RecentPatients;
