import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Calendar, Clock, Receipt, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const SuccessView = ({ appointmentData }) => {
    const navigate = useNavigate();
    // Fallback data if not passed directly (though ideally passed from parent)
    const dateStr = appointmentData?.date instanceof Date
        ? appointmentData.date.toLocaleDateString('es-VE', { weekday: 'long', day: 'numeric', month: 'long' })
        : (appointmentData?.date || 'Fecha por confirmar');

    return (
        <div className="flex flex-col items-center justify-center h-full p-4 animate-in fade-in zoom-in-95 duration-500">

            {/* Success Icon */}
            <div className="mb-6 relative">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 shadow-xl shadow-green-500/10 z-10 relative">
                    <CheckCircle2 size={40} strokeWidth={3} />
                </div>
                <div className="absolute inset-0 bg-green-400/20 rounded-full blur-xl animate-pulse"></div>
            </div>

            <h2 className="text-2xl font-display font-bold text-stone-800 mb-2 text-center">
                ¡Solicitud Enviada con Éxito!
            </h2>
            <p className="text-stone-500 text-center max-w-sm mb-8">
                Hemos recibido tu información correctamente. Aquí tienes el comprobante de tu solicitud.
            </p>

            {/* Receipt Card */}
            <div className="bg-white p-0 rounded-2xl w-full max-w-sm shadow-2xl shadow-stone-200/50 border border-stone-100 overflow-hidden relative">
                {/* Decorative Top Border */}
                <div className="h-2 bg-[repeating-linear-gradient(45deg,#F59E0B,#F59E0B_10px,#ffffff_10px,#ffffff_20px)] opacity-50"></div>

                <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center pb-4 border-b border-dashed border-stone-200">
                        <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">TIPO DE SERVICIO</span>
                        <span className="font-bold text-deglya-teal text-right">Entrevista Inicial</span>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <User className="w-4 h-4 text-deglya-gold mt-1" />
                            <div>
                                <p className="text-xs font-bold text-stone-400 uppercase">ESPECIALISTA</p>
                                <p className="text-sm font-medium text-stone-800">Lic. Deglya Camero</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Calendar className="w-4 h-4 text-deglya-gold mt-1" />
                            <div>
                                <p className="text-xs font-bold text-stone-400 uppercase">FECHA</p>
                                <p className="text-sm font-medium text-stone-800 capitalize">{dateStr}</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <Clock className="w-4 h-4 text-deglya-gold mt-1" />
                            <div>
                                <p className="text-xs font-bold text-stone-400 uppercase">HORA</p>
                                <p className="text-sm font-medium text-stone-800">{appointmentData?.time || 'Por definir'}</p>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-stone-100">
                        <div className="bg-stone-50 rounded-lg p-3 text-xs text-stone-500 leading-relaxed text-center">
                            <p>
                                <strong>Nota Importante:</strong> Tu cita está en estado <span className="text-yellow-600 font-bold">PENDIENTE</span>.
                                Nos pondremos en contacto contigo vía WhatsApp en breve para confirmar el pago y la disponibilidad final.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Receipt Cut Effect Bottom */}
                <div className="relative h-4 bg-stone-50 -mt-2">
                    <div className="absolute top-0 left-0 w-full h-full bg-white" style={{ maskImage: 'radial-gradient(circle at 10px 0, transparent 0, transparent 10px, black 11px)', maskSize: '20px 20px', maskRepeat: 'repeat-x', WebkitMaskImage: 'radial-gradient(circle at 10px 0, transparent 0, transparent 10px, black 11px)', WebkitMaskSize: '20px 20px', WebkitMaskRepeat: 'repeat-x' }}></div>
                </div>
            </div>

            <div className="mt-8">
                <Button
                    onClick={() => {
                        window.location.href = '/';
                    }}
                    variant="ghost"
                    className="text-stone-400 hover:text-stone-800"
                >
                    Volver al Inicio <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
            </div>
        </div>
    );
};
