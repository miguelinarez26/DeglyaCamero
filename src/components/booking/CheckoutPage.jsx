
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Check, CreditCard, Smartphone, ShieldCheck, Mail, User, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/backend';

const PaymentMethodCard = ({ id, label, icon: Icon, selected, onClick, details }) => (
    <div
        onClick={() => onClick(id)}
        className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${selected
                ? 'border-deglya-teal bg-deglya-teal/5'
                : 'border-stone-100 bg-white hover:border-deglya-teal/30'
            }`}
    >
        <div className="flex items-start gap-3">
            <div className={`mt-1 p-2 rounded-lg ${selected ? 'bg-deglya-teal text-white' : 'bg-stone-100 text-stone-400'}`}>
                <Icon size={20} />
            </div>
            <div>
                <h4 className={`font-medium ${selected ? 'text-deglya-teal' : 'text-stone-700'}`}>{label}</h4>
                {details && <p className="text-sm text-stone-500 mt-1 pre-line whitespace-pre-line">{details}</p>}
            </div>
        </div>
        {selected && (
            <div className="absolute top-4 right-4 text-deglya-teal">
                <Check size={20} className="bg-white rounded-full p-0.5" />
            </div>
        )}
    </div>
);

export default function CheckoutPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { bookingData } = location.state || {}; // Expecting { service, date, time }

    const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Success
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        notes: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('');

    if (!bookingData) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-stone-800 mb-2">Sesión expirada o inválida</h2>
                    <Button onClick={() => navigate('/booking')}>Volver a Agendar</Button>
                </div>
            </div>
        );
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleConfirmBooking = async () => {
        if (!formData.firstName || !formData.email || !paymentMethod) {
            setError('Por favor completa todos los campos requeridos y selecciona un método de pago.');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            // 1. Authenticate/Identify User logic would go here (or simple guest checkout)
            // Ideally we use the backend 'createAppointment' logic we saw earlier

            // Construct payload for createAppointment
            const appointmentPayload = {
                triage: null, // or pass if we had it
                service: bookingData.service,
                date: bookingData.date,
                time: bookingData.time,
                patientDetails: {
                    name: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    phone: formData.phone
                },
                notes: formData.notes
            };

            // Call backend function (simulated here until we import it directly or use RPC)
            // For now, let's insert directly via Supabase client to match project pattern if allowed, 
            // OR better, re-use existing `createAppointment` from lib/backend.ts.
            // But since I can't import function easily without circular deps or if it's not exported,
            // I'll assume we use the RPC 'create_guest_appointment' or standard insert.

            const { data: { user } } = await supabase.auth.getUser();

            let patientId;

            // Simple Flow:
            // 1 check/create patient
            if (user) {
                // If logged in, get profile -> patient
                const { data: p } = await supabase.from('patients').select('id').eq('profile_id', user.id).single();
                patientId = p?.id;
            } else {
                // Guest logic - simplified for checkout page demo
                // Ideally call RPC
                const { data: newId, error } = await supabase.rpc('create_guest_patient', {
                    p_email: formData.email,
                    p_full_name: `${formData.firstName} ${formData.lastName}`,
                    p_phone: formData.phone
                });
                if (error) throw error;
                patientId = newId;
            }

            // 2 Create Appointment
            if (patientId) {
                // Parse date/time
                const start = new Date(bookingData.date);
                const [h, m] = bookingData.time.split(':');
                start.setHours(parseInt(h), parseInt(m));
                const end = new Date(start);
                end.setHours(start.getHours() + 1);

                const { error: aptError } = await supabase.from('appointments').insert({
                    patient_id: patientId,
                    service_id: bookingData.service.id || 'initial-interview',
                    start_time: start.toISOString(),
                    end_time: end.toISOString(),
                    status: 'pending',
                    notes: `Pago: ${paymentMethod}. Nota: ${formData.notes}`
                });

                if (aptError) throw aptError;
                setStep(3); // Success!
            }

        } catch (err) {
            console.error(err);
            setError(err.message || 'Ocurrió un error al procesar tu cita. Intenta nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 py-12 px-4 flex justify-center">
            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Left: Form */}
                <div className="md:col-span-2 space-y-6">
                    <Button variant="ghost" className="pl-0 hover:bg-transparent text-stone-500" onClick={() => navigate(-1)}>
                        <ChevronLeft size={18} className="mr-1" /> Volver
                    </Button>

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="details"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div>
                                    <h1 className="text-3xl font-display font-medium text-stone-800">Finalizar Reserva</h1>
                                    <p className="text-stone-500 mt-2">Completa tus datos para confirmar la cita.</p>
                                </div>

                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 space-y-4">
                                    <h3 className="font-semibold text-stone-800 flex items-center gap-2">
                                        <User size={18} /> Datos del Paciente
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-stone-600">Nombre</label>
                                            <input
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                className="w-full p-2.5 rounded-lg border border-stone-200 focus:border-deglya-teal focus:ring-1 focus:ring-deglya-teal outline-none transition-all"
                                                placeholder="Ej. María"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-stone-600">Apellido</label>
                                            <input
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleInputChange}
                                                className="w-full p-2.5 rounded-lg border border-stone-200 focus:border-deglya-teal outline-none transition-all"
                                                placeholder="Ej. Pérez"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-stone-600 flex items-center gap-1">
                                            <Mail size={14} /> Email
                                        </label>
                                        <input
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            type="email"
                                            className="w-full p-2.5 rounded-lg border border-stone-200 focus:border-deglya-teal outline-none transition-all"
                                            placeholder="ejemplo@correo.com"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-stone-600 flex items-center gap-1">
                                            <Phone size={14} /> Teléfono
                                        </label>
                                        <input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            type="tel"
                                            className="w-full p-2.5 rounded-lg border border-stone-200 focus:border-deglya-teal outline-none transition-all"
                                            placeholder="+58 412 1234567"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-stone-600">Comentarios (Opcional)</label>
                                        <textarea
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleInputChange}
                                            className="w-full p-2.5 rounded-lg border border-stone-200 focus:border-deglya-teal outline-none transition-all h-24 resize-none"
                                            placeholder="Breve motivo de consulta..."
                                        />
                                    </div>
                                </div>

                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 space-y-4">
                                    <h3 className="font-semibold text-stone-800 flex items-center gap-2">
                                        <CreditCard size={18} /> Método de Pago
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        <PaymentMethodCard
                                            id="binance"
                                            label="Binance Pay"
                                            icon={Smartphone} // Replace with Binance icon if available
                                            selected={paymentMethod === 'binance'}
                                            onClick={setPaymentMethod}
                                            details="Pago instantáneo USDT"
                                        />
                                        <PaymentMethodCard
                                            id="pago_movil"
                                            label="Pago Móvil"
                                            icon={Smartphone}
                                            selected={paymentMethod === 'pago_movil'}
                                            onClick={setPaymentMethod}
                                            details="Bancos Nacionales"
                                        />
                                        <PaymentMethodCard
                                            id="zelle"
                                            label="Zelle"
                                            icon={ShieldCheck}
                                            selected={paymentMethod === 'zelle'}
                                            onClick={setPaymentMethod}
                                            details="(Solo dólares)"
                                        />
                                    </div>
                                </div>

                                {error && (
                                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2">
                                        <ShieldCheck size={16} /> {error}
                                    </div>
                                )}

                                <Button
                                    className="w-full py-6 text-lg font-medium bg-deglya-teal hover:bg-deglya-teal-dark shadow-xl shadow-deglya-teal/20"
                                    onClick={handleConfirmBooking}
                                    disabled={loading}
                                >
                                    {loading ? 'Procesando...' : 'Confirmar Reserva'}
                                </Button>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white p-8 rounded-3xl shadow-xl text-center border-t-4 border-green-500"
                            >
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                                    <Check size={40} />
                                </div>
                                <h2 className="text-3xl font-display font-bold text-stone-800 mb-2">¡Reserva Exitosa!</h2>
                                <p className="text-stone-500 max-w-md mx-auto">
                                    Hemos enviado los detalles de tu cita a <strong>{formData.email}</strong>.
                                    Te contactaremos pronto para validar el pago.
                                </p>

                                <div className="mt-8 flex justify-center gap-4">
                                    <Button variant="outline" onClick={() => navigate('/')}>
                                        Volver al Inicio
                                    </Button>
                                    <Button onClick={() => navigate('/dashboard/paciente')}>
                                        Ir a mi Dashboard
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right: Summary */}
                <div className="md:col-span-1">
                    <div className="sticky top-8 bg-stone-900 text-white p-6 rounded-2xl shadow-xl">
                        <h3 className="font-display font-medium text-xl mb-6">Resumen</h3>

                        <div className="space-y-6 text-sm">
                            <div className="flex justify-between items-start pb-4 border-b border-white/10">
                                <span className="text-stone-400">Servicio</span>
                                <span className="font-medium text-right max-w-[60%]">{bookingData.service?.name || "Consulta Psicológica"}</span>
                            </div>

                            <div className="flex justify-between items-center pb-4 border-b border-white/10">
                                <span className="text-stone-400">Fecha</span>
                                <span className="font-medium">
                                    {new Date(bookingData.date).toLocaleDateString('es-VE', { weekday: 'short', day: 'numeric', month: 'long' })}
                                </span>
                            </div>

                            <div className="flex justify-between items-center pb-4 border-b border-white/10">
                                <span className="text-stone-400">Hora</span>
                                <span className="font-medium">{bookingData.time}</span>
                            </div>

                            <div className="flex justify-between items-center pt-2 text-lg font-bold">
                                <span>Total</span>
                                <span className="text-deglya-gold">$50.00</span>
                            </div>
                        </div>

                        <div className="mt-8 p-4 bg-white/5 rounded-xl text-xs text-stone-400 leading-relaxed border border-white/5">
                            <p>
                                * Al confirmar, aceptas nuestras políticas de cancelación (24h de antelación).
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
