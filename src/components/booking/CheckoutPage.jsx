import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ChevronRight, CreditCard, Banknote, Upload, Lock, CheckCircle, ArrowRight, Copy, Wallet, ShieldCheck, Landmark } from 'lucide-react';

// Helper Component for Copy functionality
const CopyButton = ({ text, label }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <button
            onClick={handleCopy}
            className="group flex items-center justify-between w-full p-3 bg-white border border-stone-200 rounded-xl hover:border-conversion/50 hover:bg-conversion/5 transition-all text-left"
            title="Copiar al portapapeles"
        >
            <div className="overflow-hidden">
                <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis">{label}</p>
                <p className="text-sm font-bold text-stone-700 font-mono truncate">{text}</p>
            </div>
            <div className={`flex-shrink-0 ml-2 p-2 rounded-full transition-colors ${copied ? 'bg-green-100 text-green-600' : 'bg-stone-100 text-stone-400 group-hover:text-conversion group-hover:bg-conversion/20'}`}>
                {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
            </div>
        </button>
    );
};

const CheckoutPage = () => {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card'); // card, bs, usd, binance

    const handleConfirm = (e) => {
        e.preventDefault();
        setShowModal(true);
    };

    const handleContinueToIntake = () => {
        setShowModal(false);
        navigate('/intake');
    };

    // Nav Item Component for consistent animation
    const NavItem = ({ to, label, active = false }) => {
        if (active) {
            return (
                <span className="text-structure text-xs font-bold uppercase tracking-wider px-3 py-1.5 bg-structure/5 rounded-full border border-structure/10">
                    {label}
                </span>
            );
        }
        return (
            <Link
                to={to}
                className="text-stone-400 hover:text-structure hover:bg-stone-50 transition-all duration-200 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full hover:scale-105 active:scale-95"
            >
                {label}
            </Link>
        );
    };

    return (
        <div className="min-h-screen bg-canvas font-sans text-stone-700 transition-colors duration-300">
            {/* Header with Animated Navigation Breadcrumbs */}
            <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
                <nav className="bg-white/95 backdrop-blur-md shadow-lg rounded-full px-4 py-2 flex items-center flex-wrap justify-center gap-1 border border-stone-100">
                    <NavItem to="/" label="Inicio" />
                    <ChevronRight size={14} className="text-stone-300" />

                    <NavItem to="/servicios" label="Servicios" />
                    <ChevronRight size={14} className="text-stone-300" />

                    <NavItem to="/booking" label="Horario" />
                    <ChevronRight size={14} className="text-stone-300" />

                    <NavItem label="Detalles" active />
                </nav>
            </header>

            <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
                    {/* LEFT FORM */}
                    <div className="lg:col-span-7 xl:col-span-8 space-y-10">
                        <div>
                            {/* Updated Title to text-stone-700 as requested, or maybe text-structure for brand? 
                                The user said "Titles" text-stone-700. I will obey strictly. 
                                Wait, "Primary Structure (Headers)" is blue in config. 
                                "Typography (Texto Principal/Titulos)" is stone-700.
                                I'll split the difference: Big Header = Structure (Brand). Section Titles = Stone-700.
                            */}
                            <h1 className="text-4xl md:text-5xl font-display font-bold text-structure mb-4">Finaliza tu reserva</h1>
                            <p className="text-lg text-stone-700 font-medium">Ingresa tus datos para asegurar tu cita.</p>
                        </div>

                        {/* Personal Info */}
                        <section>
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-stone-700">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-structure/10 text-structure text-sm font-bold">1</span>
                                Tu Información
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Nombre Completo</label>
                                    <input className="w-full h-12 px-4 rounded-xl border border-stone-200 bg-white focus:border-structure focus:ring-1 focus:ring-structure outline-none transition-all shadow-sm text-stone-700" placeholder="Ej. Ana Pérez" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Cédula / ID</label>
                                    <input className="w-full h-12 px-4 rounded-xl border border-stone-200 bg-white focus:border-structure focus:ring-1 focus:ring-structure outline-none transition-all shadow-sm text-stone-700" placeholder="V-12345678" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Teléfono</label>
                                    <input className="w-full h-12 px-4 rounded-xl border border-stone-200 bg-white focus:border-structure focus:ring-1 focus:ring-structure outline-none transition-all shadow-sm text-stone-700" placeholder="+58 414 0000000" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-stone-500">Correo Electrónico</label>
                                    <input className="w-full h-12 px-4 rounded-xl border border-stone-200 bg-white focus:border-structure focus:ring-1 focus:ring-structure outline-none transition-all shadow-sm text-stone-700" placeholder="ana@ejemplo.com" />
                                </div>
                            </div>
                        </section>

                        {/* Payment Method */}
                        <section>
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-3 text-stone-700">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-structure/10 text-structure text-sm font-bold">2</span>
                                Método de Pago
                            </h3>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                                <button
                                    onClick={() => setPaymentMethod('card')}
                                    className={`py-3 px-2 border rounded-xl flex flex-col items-center justify-center gap-2 font-bold transition-all
                                    ${paymentMethod === 'card'
                                            ? 'border-conversion bg-conversion/10 text-stone-900 shadow-sm ring-1 ring-conversion scale-105'
                                            : 'border-stone-200 text-stone-400 hover:bg-stone-50 hover:border-stone-300 hover:scale-105 active:scale-95'}`}>
                                    <CreditCard size={20} className={paymentMethod === 'card' ? 'text-conversion' : ''} />
                                    <span className="text-xs">Tarjeta</span>
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('bs')}
                                    className={`py-3 px-2 border rounded-xl flex flex-col items-center justify-center gap-2 font-bold transition-all
                                    ${paymentMethod === 'bs'
                                            ? 'border-conversion bg-conversion/10 text-stone-900 shadow-sm ring-1 ring-conversion scale-105'
                                            : 'border-stone-200 text-stone-400 hover:bg-stone-50 hover:border-stone-300 hover:scale-105 active:scale-95'}`}>
                                    <Banknote size={20} className={paymentMethod === 'bs' ? 'text-conversion' : ''} />
                                    <span className="text-xs">Bolívares</span>
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('usd')}
                                    className={`py-3 px-2 border rounded-xl flex flex-col items-center justify-center gap-2 font-bold transition-all
                                    ${paymentMethod === 'usd'
                                            ? 'border-conversion bg-conversion/10 text-stone-900 shadow-sm ring-1 ring-conversion scale-105'
                                            : 'border-stone-200 text-stone-400 hover:bg-stone-50 hover:border-stone-300 hover:scale-105 active:scale-95'}`}>
                                    <Landmark size={20} className={paymentMethod === 'usd' ? 'text-conversion' : ''} />
                                    <span className="text-xs">USD / Zelle</span>
                                </button>
                                <button
                                    onClick={() => setPaymentMethod('binance')}
                                    className={`py-3 px-2 border rounded-xl flex flex-col items-center justify-center gap-2 font-bold transition-all
                                    ${paymentMethod === 'binance'
                                            ? 'border-conversion bg-conversion/10 text-stone-900 shadow-sm ring-1 ring-conversion scale-105'
                                            : 'border-stone-200 text-stone-400 hover:bg-stone-50 hover:border-stone-300 hover:scale-105 active:scale-95'}`}>
                                    <Wallet size={20} className={paymentMethod === 'binance' ? 'text-conversion' : ''} />
                                    <span className="text-xs">Binance</span>
                                </button>
                            </div>

                            <div className="bg-white p-8 rounded-3xl border border-stone-100 shadow-md space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">

                                {/* === CARD FORM === */}
                                {paymentMethod === 'card' && (
                                    <div className="space-y-6">
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Detalles de Tarjeta</p>
                                            <div className="flex gap-2 text-stone-300">
                                                <div className="w-8 h-5 bg-stone-100 rounded"></div>
                                                <div className="w-8 h-5 bg-stone-100 rounded"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Número de Tarjeta</label>
                                                <div className="relative">
                                                    <input className="w-full pl-12 pr-4 h-12 rounded-xl border border-stone-200 bg-white focus:border-structure focus:ring-1 focus:ring-structure outline-none transition-all shadow-sm font-mono text-stone-700" placeholder="0000 0000 0000 0000" />
                                                    <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Vencimiento</label>
                                                    <input className="w-full px-4 h-12 rounded-xl border border-stone-200 bg-white focus:border-structure focus:ring-1 focus:ring-structure outline-none transition-all shadow-sm font-mono text-center text-stone-700" placeholder="MM/YY" />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">CVC</label>
                                                    <div className="relative">
                                                        <input className="w-full px-4 h-12 rounded-xl border border-stone-200 bg-white focus:border-structure focus:ring-1 focus:ring-structure outline-none transition-all shadow-sm font-mono text-center text-stone-700" placeholder="123" />
                                                        <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-300" size={16} />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Titular de la Tarjeta</label>
                                                <input className="w-full px-4 h-12 rounded-xl border border-stone-200 bg-white focus:border-structure focus:ring-1 focus:ring-structure outline-none transition-all shadow-sm text-stone-700" placeholder="Como aparece en la tarjeta" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* === BS: PAGO MOVIL & TRANSFERENCIA === */}
                                {paymentMethod === 'bs' && (
                                    <div className="space-y-6">
                                        <div className="p-6 bg-stone-50/50 rounded-2xl space-y-6 border border-stone-100">
                                            {/* Pago Movil */}
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-[10px]">PM</div>
                                                    <p className="text-sm font-bold text-stone-700">Pago Móvil</p>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                    <CopyButton text="0414-555-0199" label="Teléfono" />
                                                    <CopyButton text="V-12.345.678" label="Cédula" />
                                                    <div className="md:col-span-2">
                                                        <CopyButton text="Banesco (0134)" label="Banco" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="w-full h-px bg-stone-200"></div>

                                            {/* Cuenta Bancaria */}
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-[10px]"><Landmark size={12} /></div>
                                                    <p className="text-sm font-bold text-stone-700">Transferencia Bancaria (Banesco)</p>
                                                </div>
                                                <div className="grid grid-cols-1 gap-3">
                                                    <CopyButton text="0134 1234 56 1234567890" label="Número de Cuenta" />
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <CopyButton text="Corriente" label="Tipo" />
                                                        <CopyButton text="Deglya Camero" label="Titular" />
                                                    </div>
                                                    <CopyButton text="V-12.345.678" label="C.I / RIF" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-2">
                                                Comprobante <span className="bg-red-50 text-red-500 text-[10px] px-2 py-0.5 rounded-full font-bold">REQUERIDO</span>
                                            </label>
                                            <div className="relative w-full group cursor-pointer">
                                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                                <div className="w-full h-32 rounded-2xl border-2 border-dashed border-stone-200 group-hover:border-structure/50 bg-stone-50/50 flex flex-col items-center justify-center transition-all group-hover:bg-structure/5">
                                                    <Upload size={24} className="text-structure mb-2" />
                                                    <p className="text-sm font-bold text-structure">Subir Captura</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* === USD: ACH & ZELLE === */}
                                {paymentMethod === 'usd' && (
                                    <div className="space-y-6">
                                        <div className="p-6 bg-stone-50/50 rounded-2xl space-y-6 border border-stone-100">
                                            {/* Zelle */}
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold text-[10px]">Z</div>
                                                    <p className="text-sm font-bold text-stone-700">Zelle</p>
                                                </div>
                                                <CopyButton text="pagos@deglyacamero.com" label="Correo Electrónico" />
                                            </div>

                                            <div className="w-full h-px bg-stone-200"></div>

                                            {/* ACH */}
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 font-bold text-[10px]"><Landmark size={12} /></div>
                                                    <p className="text-sm font-bold text-stone-700">Bank Transfer (ACH)</p>
                                                </div>
                                                <div className="grid grid-cols-1 gap-3">
                                                    <CopyButton text="Bank of America" label="Bank Name" />
                                                    <CopyButton text="123456789" label="Routing Number (ABA)" />
                                                    <CopyButton text="9876543210" label="Account Number" />
                                                    <CopyButton text="Deglya Camero LLC" label="Account Holder" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-2">
                                                Proof of Payment <span className="bg-red-50 text-red-500 text-[10px] px-2 py-0.5 rounded-full font-bold">REQUIRED</span>
                                            </label>
                                            <div className="relative w-full group cursor-pointer">
                                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                                <div className="w-full h-32 rounded-2xl border-2 border-dashed border-stone-200 group-hover:border-structure/50 bg-stone-50/50 flex flex-col items-center justify-center transition-all group-hover:bg-structure/5">
                                                    <Upload size={24} className="text-structure mb-2" />
                                                    <p className="text-sm font-bold text-structure">Upload Receipt</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* === BINANCE PAY === */}
                                {paymentMethod === 'binance' && (
                                    <div className="space-y-6">
                                        <div className="p-6 bg-stone-50/50 rounded-2xl space-y-6 border border-stone-100">
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-bold text-[10px]"><Wallet size={12} /></div>
                                                    <p className="text-sm font-bold text-stone-700">Binance Pay</p>
                                                </div>
                                                <div className="grid grid-cols-1 gap-3">
                                                    <CopyButton text="deglya.pay@binance.com" label="Binance Email" />
                                                    <CopyButton text="254897561" label="Binance ID" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-2">
                                                Comprobante <span className="bg-red-50 text-red-500 text-[10px] px-2 py-0.5 rounded-full font-bold">REQUERIDO</span>
                                            </label>
                                            <div className="relative w-full group cursor-pointer">
                                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer z-10" />
                                                <div className="w-full h-32 rounded-2xl border-2 border-dashed border-stone-200 group-hover:border-structure/50 bg-stone-50/50 flex flex-col items-center justify-center transition-all group-hover:bg-structure/5">
                                                    <Upload size={24} className="text-structure mb-2" />
                                                    <p className="text-sm font-bold text-structure">Subir Captura</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                            </div>
                        </section>
                    </div>

                    {/* RIGHT SUMMARY CARD */}
                    <div className="lg:col-span-5 xl:col-span-4 relative">
                        <div className="sticky top-28 space-y-6">
                            <div className="bg-white rounded-3xl shadow-xl border border-stone-100 overflow-hidden">
                                <div className="h-32 bg-structure relative">
                                    <div className="absolute -bottom-10 left-8">
                                        <img className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
                                            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop"
                                            alt="Specialist"
                                        />
                                    </div>
                                </div>
                                <div className="pt-14 px-8 pb-8 space-y-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-structure font-display">Consulta Inicial</h3>
                                        <p className="text-sm text-stone-500 font-medium">con Deglya Camero</p>
                                    </div>
                                    <div className="space-y-4 py-6 border-y border-stone-100">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-stone-500 font-medium">Fecha</span>
                                            <span className="font-bold text-stone-700">24 Feb, 2026</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-stone-500 font-medium">Hora</span>
                                            <span className="font-bold text-stone-700">01:00 PM (1h)</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="text-sm text-stone-500 font-medium uppercase tracking-wider">Total a pagar</div>
                                        <div className="text-3xl font-black text-structure">$60.00</div>
                                    </div>
                                </div>
                            </div>

                            <button onClick={handleConfirm} className="w-full py-4 bg-conversion hover:bg-conversion/90 text-stone-900 font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2 cursor-pointer">
                                Confirmar Agendamiento
                                <ArrowRight size={20} />
                            </button>
                            <p className="text-xs text-center text-stone-400 flex items-center justify-center gap-1 font-medium">
                                <ShieldCheck size={14} className="text-structure" />
                                Pagos procesados de forma segura.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* CONFIRMATION MODAL */}
            {showModal && (
                <div className="fixed inset-0 z-[100] bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
                    <div className="bg-white w-full max-w-md p-10 rounded-3xl shadow-2xl text-center transform scale-100">
                        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 shadow-inner">
                            <CheckCircle size={40} />
                        </div>
                        <h2 className="text-3xl font-display font-bold text-structure mb-4">¡Reserva Pre-Aprobada!</h2>
                        <p className="text-stone-700 mb-8 leading-relaxed">
                            Hemos recibido tu solicitud. Para finalizar el proceso, necesitamos completar tu expediente inicial.
                        </p>
                        <button onClick={handleContinueToIntake} className="w-full py-4 rounded-xl bg-structure text-white font-bold hover:bg-structure/90 transition-all shadow-md hover:shadow-lg">
                            Continuar al Intake
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CheckoutPage;
