import { useState } from 'react';
import { User, Copy, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/backend';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

// Mock Binance Data (This should ideally come from config/DB)
const BINANCE_INFO = {
    email: "deglya.pay@binance.com",
    uid: "254897561"
};

export const RegistrationForm = ({ formData, onChange, currentUser }) => {
    const isUserLoggedIn = !!currentUser;
    const [uploading, setUploading] = useState(false);

    const handleChange = (field, value) => onChange({ ...formData, [field]: value });

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text);
        // Toast logic would go here
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

    return (
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8 items-start">

            {/* LEFT CARD: PAYMENT & DATA */}
            <div className="flex-1 bg-white rounded-3xl shadow-xl border border-gray-100 p-8 w-full">

                {/* Binance Pay Header */}
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-100">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center text-yellow-600 font-bold">
                        ₿
                    </div>
                    <div>
                        <h3 className="font-display font-bold text-stone-900 text-lg">Binance Pay</h3>
                        <p className="text-stone-500 text-xs">Método de pago preferido</p>
                    </div>
                </div>

                {/* Binance Details Fields */}
                <div className="space-y-4 mb-8">
                    <div className="relative group">
                        <label className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1 block">Binance Email</label>
                        <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200 p-3">
                            <span className="flex-1 font-mono text-stone-700 font-medium">{BINANCE_INFO.email}</span>
                            <button onClick={() => handleCopy(BINANCE_INFO.email)} className="p-2 text-stone-400 hover:text-stone-900 hover:bg-white rounded-lg transition-all">
                                <Copy size={16} />
                            </button>
                        </div>
                    </div>

                    <div className="relative group">
                        <label className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-1 block">Binance ID (UID)</label>
                        <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200 p-3">
                            <span className="flex-1 font-mono text-stone-700 font-medium">{BINANCE_INFO.uid}</span>
                            <button onClick={() => handleCopy(BINANCE_INFO.uid)} className="p-2 text-stone-400 hover:text-stone-900 hover:bg-white rounded-lg transition-all">
                                <Copy size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-100 pt-8 mb-8">
                    <h4 className="font-display font-bold text-stone-900 mb-4 flex items-center gap-2">
                        <span className="bg-red-50 text-red-500 text-xs px-2 py-0.5 rounded font-bold">REQUERIDO</span>
                        Comprobante de Pago
                    </h4>

                    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-6 text-center hover:bg-deglya-cream/30 hover:border-deglya-teal/30 transition-all cursor-pointer group relative">
                        <input type="file" className="hidden" id="proof-upload" accept="image/*,.pdf" onChange={handleFileChange} />
                        <label htmlFor="proof-upload" className="cursor-pointer w-full h-full flex flex-col items-center justify-center">
                            {formData.paymentProof ? (
                                <div className="text-green-600 flex flex-col items-center">
                                    <CheckCircle2 size={40} className="mb-2" />
                                    <span className="font-bold">¡Comprobante Subido!</span>
                                    <span className="text-xs underline mt-2 opacity-80">Cambiar archivo</span>
                                </div>
                            ) : (
                                <>
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-3 group-hover:scale-110 transition-transform">
                                        <Upload size={20} />
                                    </div>
                                    <span className="text-stone-600 font-medium group-hover:text-deglya-teal transition-colors">
                                        {uploading ? 'Subiendo...' : 'Subir Captura'}
                                    </span>
                                </>
                            )}
                        </label>
                    </div>
                </div>

                {/* User Data Form (Simplified) */}
                <div className="space-y-4">
                    <h4 className="font-display font-bold text-stone-900">Tus Datos</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            placeholder="Nombre"
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-deglya-teal transition-colors"
                            value={formData.name || ''}
                            onChange={e => handleChange('name', e.target.value)}
                            disabled={isUserLoggedIn}
                        />
                        <input
                            placeholder="Apellido"
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-deglya-teal transition-colors"
                            value={formData.lastName || ''}
                            onChange={e => handleChange('lastName', e.target.value)}
                            disabled={isUserLoggedIn}
                        />
                    </div>
                    <input
                        placeholder="Email"
                        type="email"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-deglya-teal transition-colors"
                        value={formData.email || ''}
                        onChange={e => handleChange('email', e.target.value)}
                        disabled={isUserLoggedIn}
                    />
                    <input
                        placeholder="Teléfono (WhatsApp)"
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-deglya-teal transition-colors"
                        value={formData.phone || ''}
                        onChange={e => handleChange('phone', e.target.value)}
                        disabled={isUserLoggedIn}
                    />
                    {/* Hidden required fields logic handled by parent validation */}
                </div>

            </div>

            {/* RIGHT CARD: SUMMARY STICKY */}
            <div className="md:w-[350px] shrink-0 sticky top-24">
                <div className="bg-deglya-teal text-white rounded-3xl shadow-xl overflow-hidden relative">
                    {/* Blue Background Pattern */}
                    <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 100% 0%, white 0%, transparent 50%)' }}></div>

                    <div className="p-8 text-center relative z-10">
                        <div className="w-20 h-20 mx-auto rounded-full border-4 border-white/20 overflow-hidden mb-4 shadow-lg">
                            <img
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576"
                                className="w-full h-full object-cover"
                                alt="Specialist"
                            />
                        </div>
                        <h3 className="font-display font-bold text-xl mb-1">Consulta Inicial</h3>
                        <p className="text-white/70 text-sm">con Deglya Camero</p>
                    </div>

                    <div className="bg-white/10 p-8">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-white/60 text-sm font-medium">Fecha</span>
                            <span className="font-bold">24 Feb, 2026</span> {/* Mock, replace with real props */}
                        </div>
                        <div className="flex justify-between items-center mb-8">
                            <span className="text-white/60 text-sm font-medium">Hora</span>
                            <span className="font-bold">01:00 PM (1h)</span> {/* Mock */}
                        </div>

                        <div className="flex justify-between items-end border-t border-white/20 pt-6">
                            <span className="text-white/60 text-xs font-bold uppercase tracking-widest mb-1">Total a Pagar</span>
                            <span className="font-display font-bold text-3xl">$60.00</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-xs text-stone-400 flex items-center justify-center gap-1">
                        <CheckCircle2 size={12} />
                        Pagos procesados de forma segura
                    </p>
                </div>
            </div>

        </div>
    );
};
