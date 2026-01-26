import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const SuccessView = () => {
    const [showConfidential, setShowConfidential] = useState(false);

    return (
        <div className="max-w-2xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 shadow-xl shadow-green-100/50">
                    <CheckCircle2 size={48} />
                </div>
            </div>

            <h2 className="text-3xl font-display font-bold text-deglya-teal">¡Tu cita está en proceso!</h2>
            <p className="text-deglya-wood/80 text-lg leading-relaxed max-w-lg mx-auto">
                Hemos recibido tu solicitud y comprobante. Tu especialista revisará la información y recibirás la confirmación final por WhatsApp en breve.
            </p>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 mt-12 relative overflow-hidden group">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-deglya-teal via-deglya-mustard to-deglya-teal"></div>

                {!showConfidential ? (
                    <div className="space-y-6">
                        <div className="flex justify-center text-deglya-teal">
                            <svg className="w-12 h-12 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-deglya-wood">Espacio Confidencial</h3>
                        <p className="text-gray-500 text-sm italic">
                            "En este refugio, cada historia es sagrada. Lo que compartas aquí está blindado y solo será visible para tu especialista."
                        </p>
                        <Button
                            onClick={() => setShowConfidential(true)}
                            className="bg-deglya-wood text-white hover:bg-deglya-wood/90 shadow-lg shadow-deglya-wood/20 mt-4"
                        >
                            Cuéntanos más de ti
                        </Button>
                    </div>
                ) : (
                    <div className="text-left animate-in fade-in zoom-in duration-300">
                        <div className="flex items-center gap-2 mb-4 text-deglya-teal">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            <span className="font-bold text-sm uppercase tracking-wider">Encriptado & Seguro</span>
                        </div>
                        <label className="block text-deglya-wood font-bold mb-3">
                            ¿Qué te gustaría que supiéramos antes de vernos?
                        </label>
                        <textarea
                            className="w-full h-40 p-4 rounded-xl border border-gray-200 focus:border-deglya-teal focus:ring-2 focus:ring-deglya-teal/10 outline-none resize-none bg-gray-50/50"
                            placeholder="Siéntete libre de escribir aquí. Nadie más que tu especialista tendrá acceso a esta información..."
                        ></textarea>
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                <CheckCircle2 size={12} /> Protegido por Supabase Auth
                            </span>
                            <Button onClick={() => window.location.href = '/'} size="sm">
                                Guardar y Finalizar
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Skip button if they don't want to share yet */}
            {!showConfidential && (
                <button onClick={() => window.location.href = '/'} className="text-sm text-gray-400 hover:text-deglya-teal underline mt-8 transition-colors">
                    Omitir por ahora e ir al Inicio
                </button>
            )}
        </div>
    );
};
