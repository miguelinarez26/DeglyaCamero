import { useState } from 'react';
import { supabase } from '../../lib/backend';

interface PaymentVerificationModalProps {
    appointment: any;
    onClose: () => void;
    onSuccess: () => void;
}

const PaymentVerificationModal = ({ appointment, onClose, onSuccess }: PaymentVerificationModalProps) => {
    const [method, setMethod] = useState('');
    const [loading, setLoading] = useState(false);

    const [activationLink, setActivationLink] = useState('');

    const handleApprove = async () => {
        if (!method) return;
        setLoading(true);

        try {
            const { data: { user } } = await supabase.auth.getUser();

            const { error: updateError } = await supabase
                .from('appointments')
                .update({
                    status: 'confirmada',
                    payment_method: method,
                    verified_by: user?.id,
                })
                .eq('id', appointment.id);

            if (updateError) throw updateError;

            // Generate Activation Token if it's a guest (patient_id points to a patient without profile_id?)
            // Or just always offer it for now as per requirement "para estar seguros de que es el cliente correcto"
            // The prompt implies we want this flow.

            const token = crypto.randomUUID();
            const expiresAt = new Date();
            expiresAt.setHours(expiresAt.getHours() + 24);

            const { error: tokenError } = await supabase
                .from('activation_tokens')
                .insert({
                    patient_id: appointment.patient_id, // Ensure appointment has patient_id
                    token: token,
                    expires_at: expiresAt.toISOString()
                });

            if (tokenError) {
                console.error("Error generating token", tokenError);
                // Don't block success? Or show error?
            } else {
                setActivationLink(`${window.location.origin}/activar-cuenta/${token}`);
                // Do NOT call onSuccess() yet, let them see the link
                return;
            }

            onSuccess();
        } catch (err) {
            console.error('Error aprobando pago:', err);
            alert('Error al aprobar el pago. Intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    const paymentMethods = ['Pago Móvil', 'Zelle', 'Transferencia', 'Efectivo', 'Punto de Venta'];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-deglya-charcoal border border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

                {/* Left: Proof Preview */}
                <div className="w-full md:w-1/2 bg-black/20 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-white/10">
                    <h3 className="text-white/60 text-sm uppercase tracking-wider mb-4">Comprobante</h3>
                    {appointment.payment_proof_url ? (
                        <a href={appointment.payment_proof_url} target="_blank" rel="noreferrer" className="group relative block overflow-hidden rounded-xl border border-white/10">
                            <img
                                src={appointment.payment_proof_url}
                                alt="Comprobante"
                                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <span className="opacity-0 group-hover:opacity-100 text-white text-xs bg-black/50 px-3 py-1 rounded-full backdrop-blur-md">Ver Original</span>
                            </div>
                        </a>
                    ) : (
                        <div className="w-full h-48 bg-white/5 rounded-xl flex items-center justify-center border border-white/5 border-dashed">
                            <span className="text-white/30 text-sm">No adjuntado</span>
                        </div>
                    )}
                    <div className="mt-4 w-full">
                        <div className="flex justify-between text-sm text-white/80 border-b border-white/10 pb-2 mb-2">
                            <span>Paciente:</span>
                            <span className="font-semibold text-white">{appointment.patients?.full_name || 'Desconocido'}</span>
                        </div>
                        <div className="flex justify-between text-sm text-white/80">
                            <span>Monto (Ref):</span>
                            <span className="font-semibold text-deglya-teal font-nums">$Pendiente</span>
                        </div>
                    </div>
                </div>

                {/* Right: Validation Actions */}
                <div className="w-full md:w-1/2 p-6 flex flex-col">
                    <h2 className="text-xl font-display text-white mb-1">Validar Pago</h2>
                    <p className="text-xs text-white/50 mb-6 font-sans">Selecciona el método para confirmar.</p>

                    {!activationLink ? (
                        <>
                            <div className="space-y-3 flex-1">
                                {paymentMethods.map((m) => (
                                    <label
                                        key={m}
                                        className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${method === m
                                            ? 'bg-deglya-teal/20 border-deglya-teal text-white'
                                            : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10'
                                            }`}
                                    >
                                        <span className="text-sm font-medium">{m}</span>
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value={m}
                                            checked={method === m}
                                            onChange={(e) => setMethod(e.target.value)}
                                            className="accent-deglya-teal w-4 h-4"
                                        />
                                    </label>
                                ))}
                            </div>

                            <div className="mt-8 flex gap-3">
                                <button
                                    onClick={onClose}
                                    className="flex-1 py-3 px-4 rounded-xl border border-white/10 text-white/70 hover:bg-white/5 hover:text-white transition-colors text-sm font-medium"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={handleApprove}
                                    disabled={!method || loading}
                                    className="flex-1 py-3 px-4 rounded-xl bg-deglya-teal text-white hover:bg-deglya-teal/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm font-bold shadow-lg shadow-deglya-teal/20"
                                >
                                    {loading ? 'Procesando...' : 'Aprobar Cita'}
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full space-y-4">
                            <div className="h-16 w-16 bg-deglya-teal/20 rounded-full flex items-center justify-center text-deglya-teal mb-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                            </div>
                            <h3 className="text-xl text-white font-bold">¡Pago Confirmado!</h3>
                            <p className="text-white/60 text-center text-sm mb-4">
                                El paciente 'Guest' requiere activar su cuenta. Comparte este enlace:
                            </p>

                            <div className="w-full bg-white/5 p-3 rounded-lg border border-white/10 flex items-center justify-between gap-2">
                                <code className="text-xs text-deglya-teal truncate flex-1">{activationLink}</code>
                            </div>

                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(activationLink);
                                    alert('Enlace copiado al portapapeles');
                                }}
                                className="w-full py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-colors border border-white/5"
                            >
                                Copiar Enlace
                            </button>

                            <button
                                onClick={onSuccess}
                                className="w-full py-3 bg-deglya-teal text-white rounded-xl font-bold hover:bg-deglya-teal/90 transition-colors"
                            >
                                Finalizar
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PaymentVerificationModal;
