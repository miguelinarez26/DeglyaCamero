import { useState } from 'react';
import { User, Copy, Upload, CheckCircle2, CreditCard, Building2, Smartphone, Bitcoin } from 'lucide-react';
import { supabase } from '@/lib/backend';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

const PAYMENT_METHODS = {
    zelle: {
        id: 'zelle',
        name: 'Zelle / ACH',
        icon: Building2,
        details: [
            { label: 'Email Zelle', value: 'pagos@deglyacamero.com' },
            { label: 'Titular', value: 'Deglya Camero' },
            { label: 'Banco', value: 'Bank of America' },
            { label: 'Cuenta (ACH)', value: '3810 5555 9999' },
            { label: 'Routing (ABA)', value: '111000025' },
            { label: 'Dirección', value: 'Miami, FL 33166' }
        ],
        instructions: 'Usa Zelle para pagos rápidos o ACH para transferencias en USD.'
    },
    pagoMovil: {
        id: 'pagoMovil',
        name: 'Pago Móvil / Transferencia',
        icon: Smartphone,
        details: [
            { label: 'Banco', value: 'Banesco (0134)' },
            { label: 'Cuenta Corriente', value: '0134 0055 55 5555555555' },
            { label: 'Teléfono', value: '0414-123-4567' },
            { label: 'Cédula', value: 'V-12.345.678' },
            { label: 'Titular', value: 'Deglya Camero' }
        ],
        instructions: 'Realiza el pago móvil o transferencia bancaria a Banesco.'
    },
    paypal: {
        id: 'paypal',
        name: 'PayPal / Tarjeta',
        icon: CreditCard,
        details: [
            { label: 'Link de Pago', value: 'paypal.me/deglyacamero' },
            { label: 'Email', value: 'pagos@deglyacamero.com' }
        ],
        instructions: 'Paga vía PayPal o usa tu tarjeta de crédito/débito.'
    },
    binance: {
        id: 'binance',
        name: 'Binance Pay',
        icon: Bitcoin,
        details: [
            { label: 'Email', value: 'deglya.pay@binance.com' },
            { label: 'UID', value: '254897561' }
        ],
        instructions: 'Escanea el QR o usa el ID para pagar con cripto.'
    }
};

export const RegistrationForm = ({ formData, onChange, currentUser, bookingData }) => {
    const isUserLoggedIn = !!currentUser;
    const [uploading, setUploading] = useState(false);
    const [selectedMethod, setSelectedMethod] = useState('zelle');

    const handleChange = (field, value) => onChange({ ...formData, [field]: value });

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        // Toast placeholder
    };

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
            const filePath = `payment-proofs/${fileName}`;

            const { error: uploadError } = await supabase.storage.from('clinic-docs').upload(filePath, file);
            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage.from('clinic-docs').getPublicUrl(filePath);
            handleChange('paymentProof', publicUrl);
        } catch (error) {
            console.error('Error uploading:', error);
            alert('Error subiendo el archivo.');
        } finally {
            setUploading(false);
        }
    };

    const currentMethod = PAYMENT_METHODS[selectedMethod];

    return (
        <div className="flex flex-col h-full gap-6">

            {/* SECTION 1: PERSONAL DATA (Compact Form) */}
            <div className="bg-stone-50 p-6 rounded-2xl border border-stone-100">
                <div className="flex items-center gap-2 mb-4">
                    <User className="w-4 h-4 text-deglya-teal" />
                    <h4 className="font-display font-bold text-stone-900 text-sm uppercase tracking-wide">Datos del Paciente</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                        placeholder="Nombre Completo"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-deglya-teal transition-colors"
                        value={formData.name || ''}
                        onChange={e => handleChange('name', e.target.value)}
                        disabled={isUserLoggedIn}
                    />
                    <input
                        placeholder="Apellido"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-deglya-teal transition-colors"
                        value={formData.lastName || ''}
                        onChange={e => handleChange('lastName', e.target.value)}
                        disabled={isUserLoggedIn}
                    />
                    <input
                        placeholder="Correo Electrónico"
                        type="email"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-deglya-teal transition-colors"
                        value={formData.email || ''}
                        onChange={e => handleChange('email', e.target.value)}
                        disabled={isUserLoggedIn}
                    />
                    <input
                        placeholder="Teléfono (WhatsApp)"
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-deglya-teal transition-colors"
                        value={formData.phone || ''}
                        onChange={e => handleChange('phone', e.target.value)}
                        disabled={isUserLoggedIn}
                    />
                </div>
            </div>

            {/* SECTION 2: PAYMENT METHOD SELECTION & DETAILS */}
            <div className="flex-1 flex flex-col min-h-0 bg-stone-50 p-6 rounded-2xl border border-stone-100">
                {/* Appointment Summary */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b border-stone-200">
                    <h4 className="font-display font-bold text-stone-900 text-sm uppercase tracking-wide">Pago de Cita</h4>
                    {bookingData?.date && (
                        <span className="text-xs font-medium text-deglya-teal bg-deglya-teal/10 px-2 py-1 rounded-md">
                            {bookingData.date} • {bookingData.time}
                        </span>
                    )}
                </div>

                <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">

                    {/* Method Selector (Left Side) */}
                    <div className="md:w-1/3 flex flex-col gap-2 overflow-y-auto pr-1 custom-scrollbar">
                        <h4 className="font-display font-bold text-stone-900 text-sm uppercase tracking-wide mb-2 pl-1">Método de Pago</h4>
                        {Object.values(PAYMENT_METHODS).map(method => (
                            <button
                                key={method.id}
                                onClick={() => setSelectedMethod(method.id)}
                                className={cn(
                                    "flex items-center gap-3 p-3 rounded-xl border text-left transition-all duration-200 group",
                                    selectedMethod === method.id
                                        ? "bg-deglya-teal text-white border-deglya-teal shadow-md"
                                        : "bg-white border-gray-100 hover:border-deglya-teal/30 hover:bg-gray-50"
                                )}
                            >
                                <div className={cn(
                                    "w-8 h-8 rounded-full flex items-center justify-center transition-colors",
                                    selectedMethod === method.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500 group-hover:text-deglya-teal"
                                )}>
                                    <method.icon size={16} />
                                </div>
                                <div>
                                    <span className="block text-sm font-bold leading-tight">{method.name}</span>
                                    {selectedMethod === method.id && <span className="text-[10px] opacity-80">Seleccionado</span>}
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Method Details (Right Side) */}
                    <div className="flex-1 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col">
                        <div className="mb-4">
                            <h4 className="font-bold text-stone-900 flex items-center gap-2">
                                <currentMethod.icon className="text-deglya-mustard" size={20} />
                                {currentMethod.name}
                            </h4>
                            <p className="text-xs text-stone-500 mt-1">{currentMethod.instructions}</p>
                        </div>

                        <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 mb-6 p-1">
                            {currentMethod.details.map((detail, idx) => (
                                <div key={idx} className="bg-gray-50 border border-gray-100 rounded-lg p-3 flex justify-between items-center group hover:border-gray-300 transition-colors">
                                    <div>
                                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">{detail.label}</span>
                                        <span className="text-sm font-mono font-medium text-stone-800 break-all">{detail.value}</span>
                                    </div>
                                    <button
                                        onClick={() => handleCopy(detail.value)}
                                        className="p-1.5 text-stone-400 hover:text-stone-900 hover:bg-white rounded-md transition-all opacity-0 group-hover:opacity-100"
                                        title="Copiar"
                                    >
                                        <Copy size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Upload Proof */}
                        <div className="mt-auto pt-4 border-t border-gray-100">
                            <input type="file" className="hidden" id="proof-upload" accept="image/*,.pdf" onChange={handleFileChange} />
                            <label
                                htmlFor="proof-upload"
                                className={cn(
                                    "w-full py-3 px-4 rounded-xl border-2 border-dashed flex items-center justify-center gap-2 cursor-pointer transition-all",
                                    formData.paymentProof
                                        ? "border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
                                        : "border-gray-200 hover:border-deglya-teal/50 hover:bg-deglya-cream/30 text-stone-500"
                                )}
                            >
                                {formData.paymentProof ? (
                                    <>
                                        <CheckCircle2 size={18} />
                                        <span className="text-sm font-bold">Comprobante Cargado</span>
                                    </>
                                ) : (
                                    <>
                                        <Upload size={18} />
                                        <span className="text-sm font-medium">Subir Comprobante</span>
                                    </>
                                )}
                            </label>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
