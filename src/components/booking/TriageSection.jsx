import { FileText, ShieldCheck } from 'lucide-react';

export const TriageSection = ({ data, onChange }) => {
    const reasons = [
        "Ansiedad o Estrés",
        "Problemas de Pareja",
        "Depresión o Tristeza",
        "Trauma o Pasado",
        "Autoestima",
        "Otro"
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                <div className="flex items-center gap-3 mb-6 text-deglya-teal">
                    <div className="p-3 bg-deglya-teal/10 rounded-full">
                        <FileText size={24} />
                    </div>
                    <h3 className="text-xl font-display font-bold">Motivo de Consulta</h3>
                </div>

                <div className="space-y-6">
                    <div className="space-y-3">
                        <label className="text-sm font-bold text-deglya-wood ml-1">¿Cuál es la razón principal de tu visita?</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {reasons.map(reason => (
                                <button
                                    key={reason}
                                    onClick={() => onChange({ ...data, reason })}
                                    className={`p-4 rounded-xl text-left text-sm font-medium border transition-all duration-200 flex justify-between items-center
                                        ${data.reason === reason
                                            ? 'bg-deglya-teal text-white border-deglya-teal shadow-md'
                                            : 'bg-white text-deglya-wood border-gray-200 hover:border-deglya-teal/50 hover:bg-gray-50'
                                        }`}
                                >
                                    {reason}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-bold text-deglya-wood ml-1">Cuéntanos un poco más (Opcional)</label>
                        <textarea
                            value={data.description || ''}
                            onChange={(e) => onChange({ ...data, description: e.target.value })}
                            className="w-full h-32 p-4 rounded-xl border border-gray-200 focus:border-deglya-teal focus:ring-2 focus:ring-deglya-teal/20 outline-none resize-none bg-gray-50/50 text-sm"
                            placeholder="Descríbenos brevemente cómo te sientes..."
                        />
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex items-start gap-3 text-xs text-gray-400">
                    <ShieldCheck size={16} className="text-deglya-teal shrink-0" />
                    <p>Tu privacidad es nuestra prioridad. Esta información será encriptada y visible únicamente por el equipo de especialistas asignado para evaluar tu caso.</p>
                </div>
            </div>
        </div>
    );
};
