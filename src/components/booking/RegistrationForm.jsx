import { useState } from 'react';
import { User, CreditCard, CheckCircle2 } from 'lucide-react';
import { supabase } from '../../lib/backend';

export const RegistrationForm = ({ formData, onChange }) => {
    // Mock User Data (Simulating a logged-in user via Magic Link)
    // In a real scenario, this would come from useAuth() context
    // Change isUserLoggedIn to false to test the "Guest" view
    const isUserLoggedIn = false; // Default to false for guest entry for now

    const handleChange = (field, value) => {
        onChange({ ...formData, [field]: value });
    };

    const handleFileChange = async (e) => {
        // Defensive check as requested by user to prevent "Cannot read properties of undefined"
        const fileList = e.target.files;
        const file = (fileList && fileList.length > 0) ? fileList[0] : null;

        if (!file) return;

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
            const filePath = `payment-proofs/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('clinic-docs')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('clinic-docs')
                .getPublicUrl(filePath);

            handleChange('paymentProof', publicUrl);
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error subiendo el archivo. Intente nuevamente.');
        }
    };

    const countries = [
        { code: '+58', flag: '🇻🇪', name: 'Venezuela' },
        { code: '+1', flag: '🇺🇸', name: 'USA' },
        { code: '+34', flag: '🇪🇸', name: 'España' },
        { code: '+57', flag: '🇨🇴', name: 'Colombia' },
        { code: '+52', flag: '🇲🇽', name: 'México' },
        { code: '+54', flag: '🇦🇷', name: 'Argentina' },
        { code: '+56', flag: '🇨🇱', name: 'Chile' },
    ];

    return (
        <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8 border-t-4 border-deglya-teal">
            <h3 className="text-2xl font-display font-bold text-deglya-teal mb-6 text-center">Datos del Paciente</h3>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-deglya-wood ml-1">Nombre <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-deglya-wood/40" size={18} />
                            <input
                                type="text"
                                value={formData.name || ''}
                                onChange={(e) => handleChange('name', e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:border-deglya-teal focus:ring-2 focus:ring-deglya-teal/20 outline-none transition-all"
                                placeholder="Ej. Ana"
                                required
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-deglya-wood ml-1">Segundo Nombre <span className="text-xs font-normal text-gray-400">(Opcional)</span></label>
                        <div className="relative">
                            <input
                                type="text"
                                value={formData.firstName || ''}
                                onChange={(e) => handleChange('firstName', e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-deglya-teal focus:ring-2 focus:ring-deglya-teal/20 outline-none transition-all"
                                placeholder="Ej. María"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-deglya-wood ml-1">Primer Apellido <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            value={formData.lastName || ''}
                            onChange={(e) => handleChange('lastName', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-deglya-teal focus:ring-2 focus:ring-deglya-teal/20 outline-none transition-all"
                            placeholder="Ej. López"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-deglya-wood ml-1">Segundo Apellido <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            value={formData.secondLastName || ''}
                            onChange={(e) => handleChange('secondLastName', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-deglya-teal focus:ring-2 focus:ring-deglya-teal/20 outline-none transition-all"
                            placeholder="Ej. García"
                            required
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-deglya-wood ml-1">Cédula de Identidad <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        value={formData.nationalId || ''}
                        onChange={(e) => handleChange('nationalId', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-deglya-teal focus:ring-2 focus:ring-deglya-teal/20 outline-none transition-all"
                        placeholder="Ej. V-12345678"
                        required
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-deglya-wood ml-1">Email <span className="text-red-500">*</span></label>
                        <input
                            type="email"
                            value={formData.email || ''}
                            onChange={(e) => handleChange('email', e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-deglya-teal focus:ring-2 focus:ring-deglya-teal/20 outline-none transition-all"
                            placeholder="correo@ejemplo.com"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-deglya-wood ml-1">Teléfono (WhatsApp) <span className="text-red-500">*</span></label>
                        <div className="flex gap-2">
                            <select
                                value={formData.countryCode || '+58'}
                                onChange={(e) => handleChange('countryCode', e.target.value)}
                                className="w-[110px] px-2 py-3 rounded-lg border border-gray-200 focus:border-deglya-teal focus:ring-2 focus:ring-deglya-teal/20 outline-none transition-all bg-white text-sm"
                            >
                                {countries.map(c => (
                                    <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                                ))}
                            </select>
                            <input
                                type="tel"
                                value={formData.phone || ''}
                                onChange={(e) => handleChange('phone', e.target.value)}
                                className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:border-deglya-teal focus:ring-2 focus:ring-deglya-teal/20 outline-none transition-all"
                                placeholder="414 1234567"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-bold text-deglya-wood ml-1">Comprobante de Pago <span className="text-red-500">*</span></label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer group">
                        <input type="file" className="hidden" id="payment-proof" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
                        <label htmlFor="payment-proof" className="cursor-pointer flex flex-col items-center">
                            <div className="w-12 h-12 bg-deglya-cream rounded-full flex items-center justify-center text-deglya-teal mb-3 group-hover:scale-110 transition-transform">
                                <CreditCard size={24} />
                            </div>
                            <span className="font-bold text-deglya-wood">Sube tu comprobante aquí</span>
                            <span className="text-xs text-gray-500 mt-1">Formatos: PDF, JPG, PNG</span>
                        </label>
                    </div>
                </div>

                <div className="bg-deglya-cream/50 p-4 rounded-lg flex items-start gap-3 text-sm text-deglya-wood/80">
                    <CheckCircle2 size={20} className="text-deglya-mustard shrink-0 mt-0.5" />
                    <p>La cita se confirmará vía Whatsapp una vez verificado el pago adjunto.</p>
                </div>
            </form>
        </div>
    );
};
