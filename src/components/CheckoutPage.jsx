import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Navbar } from './landing/Navbar';
import { Footer } from './landing/Footer';
import { RegistrationForm } from './booking/RegistrationForm';
import { ArrowLeft, Calendar, Clock, DollarSign, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';

const CheckoutPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [bookingData, setBookingData] = useState(null);
    const [patientDetails, setPatientDetails] = useState({
        name: '',
        lastName: '',
        email: '',
        phone: '',
        paymentProof: null
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (location.state?.bookingData) {
            setBookingData(location.state.bookingData);
        } else {
            // Redirect if no data
            navigate('/');
        }
    }, [location, navigate]);

    const handleBack = () => {
        navigate(-1);
    };

    const handleConfirm = async () => {
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            alert('¡Cita Confirmada! (A implementar)');
            navigate('/');
        }, 2000);
    };

    if (!bookingData) return null;

    return (
        <div className="min-h-screen bg-stone-50 flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-8 md:py-12 max-w-7xl">

                {/* Header */}
                <div className="mb-8 flex items-center gap-4">
                    <button onClick={handleBack} className="p-2 hover:bg-stone-200 rounded-full transition-colors">
                        <ArrowLeft className="text-stone-600" />
                    </button>
                    <div>
                        <h1 className="text-2xl md:text-3xl font-display font-bold text-stone-900">Finalizar Reserva</h1>
                        <p className="text-stone-500 text-sm">Completa tus datos para asegurar tu cita.</p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* LEFT COLUMN: FORM & PAYMENT */}
                    <div className="flex-1 w-full space-y-6">
                        {/* Reuse RegistrationForm but adapted for full page width if needed */}
                        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-stone-100">
                            <RegistrationForm
                                formData={patientDetails}
                                onChange={setPatientDetails}
                                bookingData={bookingData}
                            // We can pass a prop to RegistrationForm to adjust layout if needed, 
                            // currently it's quite flexible.
                            />
                        </div>
                    </div>

                    {/* RIGHT COLUMN: SUMMARY CARD (Sticky) */}
                    <div className="w-full lg:w-[380px] shrink-0 lg:sticky lg:top-24 space-y-6">
                        <div className="bg-white rounded-3xl p-6 shadow-md border border-stone-100">
                            <h3 className="font-display font-bold text-lg mb-4 text-stone-900 border-b border-stone-100 pb-2">Resumen de Cita</h3>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-deglya-teal/10 flex items-center justify-center shrink-0">
                                        <Calendar className="text-deglya-teal w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">Fecha</p>
                                        <p className="font-medium text-stone-900">{bookingData.date}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-deglya-teal/10 flex items-center justify-center shrink-0">
                                        <Clock className="text-deglya-teal w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">Hora</p>
                                        <p className="font-medium text-stone-900">{bookingData.time}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="w-10 h-10 rounded-full bg-deglya-teal/10 flex items-center justify-center shrink-0">
                                        <DollarSign className="text-deglya-teal w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-stone-500 font-bold uppercase tracking-wider">Precio</p>
                                        <p className="font-medium text-stone-900">$60.00 USD</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-6 pt-6 border-t border-stone-100">
                                <div className="flex justify-between items-end mb-6">
                                    <span className="text-stone-500 font-medium">Total a Pagar</span>
                                    <span className="text-2xl font-bold text-stone-900">$60.00</span>
                                </div>

                                <Button
                                    onClick={handleConfirm}
                                    disabled={loading || !patientDetails.name || !patientDetails.email}
                                    className="w-full bg-stone-900 hover:bg-stone-800 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2"
                                >
                                    {loading ? 'Procesando...' : (
                                        <>
                                            <ShieldCheck size={18} />
                                            Confirmar y Pagar
                                        </>
                                    )}
                                </Button>
                                <p className="text-center text-xs text-stone-400 mt-3">
                                    Pagos procesados de forma segura.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CheckoutPage;
