import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, CreditCard, Banknote, Upload, Lock, CheckCircle, ArrowRight } from 'lucide-react';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);

    const handleConfirm = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleContinueToIntake = () => {
        setShowModal(false);
        navigate('/intake');
    };

    return (
        <div className="min-h-screen bg-deglya-cream dark:bg-[#1a160c] transition-colors duration-300 font-sans">
            {/* Simple Header */}
            <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
                <nav className="bg-white/90 backdrop-blur-md shadow-lg rounded-full px-6 py-3 flex items-center gap-2 border border-deglya-terracota/20">
                    <span className="text-booking-secondary text-sm font-medium">Servicios</span>
                    <ChevronRight size={14} className="text-gray-400" />
                    <span className="text-booking-secondary text-sm font-medium">Horario</span>
                    <ChevronRight size={14} className="text-gray-400" />
                    <span className="text-booking-primary text-sm font-bold">Detalles</span>
                </nav>
            </header>

            <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                    {/* LEFT FORM */}
                    <div className="lg:col-span-7 xl:col-span-8 space-y-10">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-display font-medium text-booking-primary dark:text-white mb-2">Finaliza tu reserva</h1>
                            <p className="text-lg text-deglya-wood/80">Ingresa tus datos para asegurar tu cita.</p>
                        </div>

                        {/* Personal Info */}
                        <section>
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-deglya-wood">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-booking-primary/10 text-booking-primary text-sm font-bold">1</span>
                                Tu Información
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-deglya-wood/80">Nombre Completo</label>
                                    <input className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-booking-primary focus:ring-1 focus:ring-booking-primary outline-none" placeholder="Ej. Ana Pérez" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-deglya-wood/80">Cédula / ID</label>
                                    <input className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-booking-primary focus:ring-1 focus:ring-booking-primary outline-none" placeholder="V-12345678" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-deglya-wood/80">Teléfono</label>
                                    <input className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-booking-primary focus:ring-1 focus:ring-booking-primary outline-none" placeholder="+58 414 0000000" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-deglya-wood/80">Correo Electrónico</label>
                                    <input className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:border-booking-primary focus:ring-1 focus:ring-booking-primary outline-none" placeholder="ana@ejemplo.com" />
                                </div>
                            </div>
                        </section>

                        {/* Payment Method */}
                        <section>
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-deglya-wood">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-booking-primary/10 text-booking-primary text-sm font-bold">2</span>
                                Método de Pago
                            </h3>

                            <div className="flex gap-3 mb-6">
                                <button className="flex-1 py-3 border rounded-lg flex items-center justify-center gap-2 text-gray-500 hover:bg-gray-50">
                                    <CreditCard size={18} /> Tarjeta
                                </button>
                                <button className="flex-1 py-3 border border-booking-primary bg-booking-primary/5 text-booking-primary font-bold rounded-lg flex items-center justify-center gap-2 shadow-sm">
                                    <Banknote size={18} /> Transferencia / Pagomóvil
                                </button>
                            </div>

                            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
                                <div className="p-4 bg-gray-50 rounded-lg space-y-4 border border-gray-100">
                                    <p className="text-sm font-medium text-gray-500">Datos Bancarios:</p>
                                    <div className="flex items-start gap-3 p-3 bg-white rounded border border-gray-200">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">PM</div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-800">Pago Móvil (Banesco)</p>
                                            <p className="text-xs text-gray-500">0414-555-0199 • V-12.345.678</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3 p-3 bg-white rounded border border-gray-200">
                                        <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-xs">Z</div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-800">Zelle</p>
                                            <p className="text-xs text-gray-500">pagos@deglyacamero.com</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-deglya-wood/80 flex items-center gap-2">
                                        Comprobante de Pago <span className="bg-gray-100 text-gray-500 text-xs px-2 py-0.5 rounded-full font-normal">Requerido</span>
                                    </label>
                                    <div className="relative w-full group cursor-pointer">
                                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                        <div className="w-full h-32 rounded-lg border-2 border-dashed border-gray-300 group-hover:border-booking-primary bg-gray-50 flex flex-col items-center justify-center transition-colors">
                                            <div className="w-10 h-10 bg-white rounded-full shadow-sm flex items-center justify-center mb-2">
                                                <Upload size={20} className="text-booking-primary" />
                                            </div>
                                            <p className="text-sm font-medium text-gray-700">Haz clic para subir imagen</p>
                                            <p className="text-xs text-gray-400">JPG, PNG o PDF (Max 5MB)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* RIGHT SUMMARY CARD */}
                    <div className="lg:col-span-5 xl:col-span-4 relative">
                        <div className="sticky top-28 space-y-6">
                            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                                <div className="h-24 bg-gradient-to-r from-booking-primary to-booking-secondary relative">
                                    <div className="absolute -bottom-8 left-6">
                                        <img className="w-16 h-16 rounded-full border-4 border-white shadow-md object-cover"
                                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop" />
                                    </div>
                                </div>
                                <div className="pt-10 px-6 pb-6 space-y-6">
                                    <div>
                                        <h3 className="text-lg font-bold text-deglya-wood">Consulta Inicial</h3>
                                        <p className="text-sm text-gray-500">con Deglya Camero</p>
                                    </div>
                                    <div className="space-y-3 py-4 border-y border-gray-100">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Fecha</span>
                                            <span className="font-semibold text-deglya-wood">24 Oct, 2023</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Hora</span>
                                            <span className="font-semibold text-deglya-wood">01:00 PM (1h)</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="text-sm text-gray-500">Total a pagar</div>
                                        <div className="text-2xl font-black text-booking-primary">$60.00</div>
                                    </div>
                                </div>
                            </div>

                            <button onClick={handleConfirm} className="w-full h-14 bg-booking-mustard bg-yellow-500 hover:bg-yellow-600 text-white font-bold text-lg rounded-xl shadow-lg transition-all flex items-center justify-center gap-2">
                                Confirmar Agendamiento
                                <ArrowRight size={20} />
                            </button>
                            <p className="text-xs text-center text-gray-400 flex items-center justify-center gap-1">
                                <Lock size={12} /> Datos cifrados y seguros.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* CONFIRMATION MODAL */}
            {showModal && (
                <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl text-center transform scale-100">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                            <CheckCircle size={48} />
                        </div>
                        <h2 className="text-2xl font-bold text-deglya-wood mb-2">¡Reserva Confirmada!</h2>
                        <p className="text-gray-500 mb-8">
                            Tu cita ha sido pre-aprobada. Por favor completa el formulario de admisión para finalizar.
                        </p>
                        <button onClick={handleContinueToIntake} className="w-full h-12 rounded-lg bg-booking-primary text-white font-bold hover:bg-booking-primary/90 transition-colors">
                            Continuar al Intake
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;
