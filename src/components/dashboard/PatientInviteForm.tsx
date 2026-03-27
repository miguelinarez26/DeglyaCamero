import React, { useState } from 'react';
import { supabase } from '../../lib/backend';
import { Mail, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const PatientInviteForm = () => {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setMessage('');

        try {
            // Verificamos sesión admin actual
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) throw new Error("No tienes permisos para realizar esto.");

            // Llamada a nuestra futura Edge Function
            // En caso de que no hayas activado la Edge Function aún, esto dará error,
            // pero el código está listo para cuando la despliegues.
            const { data, error } = await supabase.functions.invoke('invite-patient', {
                body: { email, first_name: firstName },
                headers: { Authorization: `Bearer ${session.access_token}` }
            });

            if (error) {
                if (error.message.includes('already registered')) throw new Error("Este correo ya está registrado.");
                throw error;
            }

            // Mapear el nuevo formato 200 donde pasamos { success: false, error: ... }
            if (data && data.success === false) {
                throw new Error("ERROR SERVIDOR (" + data.error + ")");
            }

            setStatus('success');
            
            // Si la función nos envía un Link Manual por culpa del Rate Limit, ¡lo mostramos!
            if (data && data.link) {
                setMessage(`¡Paciente creado con éxito! (Límite de correos superado). Entra a este link para crear su contraeña:\n\n${data.link}`);
            } else {
                setMessage(`¡Invitación enviada con éxito a ${email}!`);
            }
            
            setFirstName('');
            setEmail('');
            
        } catch (error: any) {
            console.error("Error invitando paciente:", error);
            setStatus('error');
            setMessage(error.message || "Error al enviar la invitación. Inténtalo de nuevo.");
        }
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 max-w-md w-full">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-stone-100 rounded-xl">
                    <Mail className="w-6 h-6 text-stone-700" />
                </div>
                <div>
                    <h3 className="font-display text-xl font-bold text-stone-800">Invitar Paciente</h3>
                    <p className="text-sm text-stone-500">Envía un acceso privado al portal</p>
                </div>
            </div>

            <form onSubmit={handleInvite} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Nombre del Paciente</label>
                    <input
                        type="text"
                        required
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Ej. María Pérez"
                        className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-400 outline-none transition-all text-stone-700 bg-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-stone-700 mb-1">Correo Electrónico</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="maria@ejemplo.com"
                        className="w-full px-4 py-2 border border-stone-200 rounded-lg focus:ring-2 focus:ring-stone-400 outline-none transition-all text-stone-700 bg-white"
                    />
                </div>

                {message && (
                    <div className={`p-4 rounded-xl flex items-start gap-3 text-sm ${status === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                        {status === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />}
                        <p className="whitespace-pre-wrap break-all leading-relaxed font-medium">{message}</p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-3 bg-stone-800 text-white rounded-lg font-medium hover:bg-stone-900 flex justify-center items-center gap-2 transition-colors disabled:opacity-70 shadow-sm"
                >
                    {status === 'loading' ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        'Enviar Invitación Exclusiva'
                    )}
                </button>
            </form>
        </div>
    );
};

export default PatientInviteForm;
