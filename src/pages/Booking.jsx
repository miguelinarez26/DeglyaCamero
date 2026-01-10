import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, CheckCircle2, User, CreditCard, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

// --- Components for Wizard Steps ---

const StepIndicator = ({ currentStep, steps }) => (
    <div className="flex justify-center mb-12">
        <div className="flex items-center space-x-4">
            {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                    <div className={cn(
                        "flex items-center justify-center w-10 h-10 rounded-full border-2 font-bold transition-all duration-300",
                        index + 1 <= currentStep
                            ? "bg-deglya-teal border-deglya-teal text-white shadow-[0_0_15px_rgba(27,108,168,0.4)]"
                            : "border-deglya-wood/30 text-deglya-wood/50 bg-white"
                    )}>
                        {index + 1 < currentStep ? <CheckCircle2 size={20} /> : index + 1}
                    </div>
                    {index < steps.length - 1 && (
                        <div className={cn(
                            "w-12 h-0.5 mx-2 transition-all duration-300",
                            index + 1 < currentStep ? "bg-deglya-teal" : "bg-deglya-wood/20"
                        )} />
                    )}
                </div>
            ))}
        </div>
    </div>
);

const SpecialistSelection = ({ onSelect, selected }) => {
    const specialists = [
        {
            id: 'degly',
            name: 'Degly A. Camero',
            role: 'Psicóloga Clínica & Fundadora',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop',
            specialty: 'EMDR, Trauma, Ansiedad'
        },
        {
            id: 'elena',
            name: 'Dra. Elena Ríos',
            role: 'Terapeuta Familiar Sistémica',
            image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2576&auto=format&fit=crop',
            specialty: 'Parejas, Familia, Conflictos'
        }
    ];

    return (
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {specialists.map((specialist) => (
                <div
                    key={specialist.id}
                    onClick={() => onSelect(specialist.id)}
                    className={cn(
                        "group relative cursor-pointer overflow-hidden rounded-2xl bg-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-2",
                        selected === specialist.id ? "border-deglya-teal ring-2 ring-deglya-teal/30" : "border-transparent"
                    )}
                >
                    <div className="aspect-[4/3] w-full overflow-hidden">
                        <img src={specialist.image} alt={specialist.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 p-6 text-white">
                            <h3 className="text-2xl font-display font-bold">{specialist.name}</h3>
                            <p className="text-deglya-mustard font-medium text-sm uppercase tracking-wider">{specialist.role}</p>
                            <p className="mt-2 text-white/80 text-sm opacity-0 transform translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                                Especialidad: {specialist.specialty}
                            </p>
                        </div>
                        {selected === specialist.id && (
                            <div className="absolute top-4 right-4 bg-deglya-teal text-white p-2 rounded-full shadow-lg animate-in zoom-in">
                                <CheckCircle2 size={24} />
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

const CalendarView = ({ onSelectDate, selectedDate, onSelectTime, selectedTime }) => {
    // Mock calendar data generation
    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'];

    return (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
            <div className="grid md:grid-cols-7">
                {/* Calendar Side */}
                <div className="p-8 md:col-span-4 border-r border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-display font-bold text-deglya-teal">Julio 2024</h3>
                        <div className="flex gap-2">
                            <button className="p-2 hover:bg-deglya-cream rounded-full text-deglya-wood"><ChevronLeft size={20} /></button>
                            <button className="p-2 hover:bg-deglya-cream rounded-full text-deglya-wood"><ChevronRight size={20} /></button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-2 text-center mb-2">
                        {['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'].map(d => (
                            <span key={d} className="text-xs font-bold text-deglya-wood/50 uppercase">{d}</span>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-2">
                        {/* Offset for start of month (mock) */}
                        <div className="col-span-1"></div>
                        {days.map(day => (
                            <button
                                key={day}
                                onClick={() => onSelectDate(day)}
                                className={cn(
                                    "aspect-square rounded-full flex items-center justify-center text-sm transition-all duration-300 relative group",
                                    selectedDate === day
                                        ? "bg-deglya-teal text-white shadow-[0_0_15px_rgba(27,108,168,0.6)] scale-110 font-bold"
                                        : "text-deglya-wood hover:bg-deglya-cream hover:text-deglya-teal"
                                )}
                            >
                                {day}
                                {/* Glow effect on hover */}
                                <div className="absolute inset-0 rounded-full bg-deglya-teal/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Time Slots Side */}
                <div className="p-8 md:col-span-3 bg-deglya-cream/30">
                    <h3 className="text-lg font-bold text-deglya-wood mb-6 flex items-center gap-2">
                        <Clock size={18} className="text-deglya-mustard" /> Horarios Disponibles
                    </h3>
                    <div className="space-y-3">
                        {selectedDate ? (
                            <div className="grid grid-cols-2 gap-3 animate-in fade-in slide-in-from-right-4 duration-500">
                                {timeSlots.map(time => (
                                    <button
                                        key={time}
                                        onClick={() => onSelectTime(time)}
                                        className={cn(
                                            "py-2 px-4 rounded-lg text-sm font-medium border transition-all duration-200",
                                            selectedTime === time
                                                ? "bg-deglya-teal text-white border-deglya-teal shadow-md"
                                                : "bg-white text-deglya-wood border-gray-200 hover:border-deglya-teal hover:text-deglya-teal"
                                        )}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-deglya-wood/40 text-sm text-center">
                                <CalendarIcon size={32} className="mb-2 opacity-50" />
                                Selecciona un día para ver horarios
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const RegistrationForm = ({ onSubmit }) => {
    // Mock User Data (Simulating a logged-in user via Magic Link)
    // In a real scenario, this would come from useAuth() context
    // Change isUserLoggedIn to false to test the "Guest" view
    const isUserLoggedIn = true;
    const mockUserData = {
        name: "Sofía",
        firstName: "Valentina", // Segundo nombre logic might need adjustment if separate fields
        lastName: "Martínez",
        secondLastName: "Rodríguez",
        email: "sofia.martinez@example.com",
        phone: "4121234567" // Without prefix
    };

    const [countryCode, setCountryCode] = useState('+58');

    // Country Options
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

            <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-deglya-wood ml-1">Nombre <span className="text-red-500">*</span></label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-deglya-wood/40" size={18} />
                            <input
                                type="text"
                                defaultValue={isUserLoggedIn ? mockUserData.name : ''}
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
                                defaultValue={isUserLoggedIn ? mockUserData.firstName : ''}
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
                            defaultValue={isUserLoggedIn ? mockUserData.lastName : ''}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-deglya-teal focus:ring-2 focus:ring-deglya-teal/20 outline-none transition-all"
                            placeholder="Ej. López"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-deglya-wood ml-1">Segundo Apellido <span className="text-red-500">*</span></label>
                        <input
                            type="text"
                            defaultValue={isUserLoggedIn ? mockUserData.secondLastName : ''}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-deglya-teal focus:ring-2 focus:ring-deglya-teal/20 outline-none transition-all"
                            placeholder="Ej. García"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-deglya-wood ml-1">Email <span className="text-red-500">*</span></label>
                        <input
                            type="email"
                            defaultValue={isUserLoggedIn ? mockUserData.email : ''}
                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-deglya-teal focus:ring-2 focus:ring-deglya-teal/20 outline-none transition-all"
                            placeholder="correo@ejemplo.com"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-deglya-wood ml-1">Teléfono (WhatsApp) <span className="text-red-500">*</span></label>
                        <div className="flex gap-2">
                            <select
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                                className="w-[110px] px-2 py-3 rounded-lg border border-gray-200 focus:border-deglya-teal focus:ring-2 focus:ring-deglya-teal/20 outline-none transition-all bg-white text-sm"
                            >
                                {countries.map(c => (
                                    <option key={c.code} value={c.code}>{c.flag} {c.code}</option>
                                ))}
                            </select>
                            <input
                                type="tel"
                                defaultValue={isUserLoggedIn ? mockUserData.phone : ''}
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
                        <input type="file" className="hidden" id="payment-proof" accept=".pdf,.jpg,.jpeg,.png" />
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
};;

// --- Success & Confidential Step ---

const SuccessView = () => {
    const [showConfidential, setShowConfidential] = useState(false);

    return (
        <div className="max-w-2xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 shadow-xl shadow-green-100/50">
                    <CheckCircle2 size={48} />
                </div>
            </div>

            <h2 className="text-3xl font-display font-bold text-deglya-teal">¡Tu cita está en proceso!</h2>
            <p className="text-deglya-wood/80 text-lg leading-relaxed max-w-lg mx-auto">
                Hemos recibido tu solicitud y comprobante. Tu especialista revisará la información y recibirás la confirmación final por WhatsApp en breve.
            </p>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 mt-12 relative overflow-hidden group">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-deglya-teal via-deglya-mustard to-deglya-teal"></div>

                {!showConfidential ? (
                    <div className="space-y-6">
                        <div className="flex justify-center text-deglya-teal">
                            <svg className="w-12 h-12 opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        </div>
                        <h3 className="text-xl font-bold text-deglya-wood">Espacio Confidencial</h3>
                        <p className="text-gray-500 text-sm italic">
                            "En este refugio, cada historia es sagrada. Lo que compartas aquí está blindado y solo será visible para tu especialista."
                        </p>
                        <Button
                            onClick={() => setShowConfidential(true)}
                            className="bg-deglya-wood text-white hover:bg-deglya-wood/90 shadow-lg shadow-deglya-wood/20 mt-4"
                        >
                            Cuéntanos más de ti
                        </Button>
                    </div>
                ) : (
                    <div className="text-left animate-in fade-in zoom-in duration-300">
                        <div className="flex items-center gap-2 mb-4 text-deglya-teal">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            <span className="font-bold text-sm uppercase tracking-wider">Encriptado & Seguro</span>
                        </div>
                        <label className="block text-deglya-wood font-bold mb-3">
                            ¿Qué te gustaría que supiéramos antes de vernos?
                        </label>
                        <textarea
                            className="w-full h-40 p-4 rounded-xl border border-gray-200 focus:border-deglya-teal focus:ring-2 focus:ring-deglya-teal/10 outline-none resize-none bg-gray-50/50"
                            placeholder="Siéntete libre de escribir aquí. Nadie más que tu especialista tendrá acceso a esta información..."
                        ></textarea>
                        <div className="flex justify-between items-center mt-4">
                            <span className="text-xs text-gray-400 flex items-center gap-1">
                                <CheckCircle2 size={12} /> Protegido por Supabase Auth
                            </span>
                            <Button onClick={() => window.location.href = '/'} size="sm">
                                Guardar y Finalizar
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Skip button if they don't want to share yet */}
            {!showConfidential && (
                <button onClick={() => window.location.href = '/'} className="text-sm text-gray-400 hover:text-deglya-teal underline mt-8 transition-colors">
                    Omitir por ahora e ir al Inicio
                </button>
            )}
        </div>
    );
};

// --- Main Page ---

export default function Booking() {
    const [step, setStep] = useState(1);
    const [data, setData] = useState({ specialist: null, date: null, time: null });
    const navigate = useNavigate();

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    return (
        <div className="min-h-screen bg-deglya-cream font-sans selection:bg-deglya-mustard selection:text-white">
            {/* Navbar Minimalist */}
            <nav className="border-b border-white/20 bg-white/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                    <div onClick={() => navigate('/')} className="flex items-center gap-2 cursor-pointer">
                        <div className="h-6 w-6 text-deglya-teal"><svg fill="currentColor" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path clipRule="evenodd" d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z" fillRule="evenodd"></path></svg></div>
                        <span className="font-display font-bold text-deglya-teal">Conexión Humana</span>
                    </div>
                    {step < 4 && <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="text-deglya-wood hover:text-deglya-teal">Cancelar</Button>}
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">

                {step < 4 && <StepIndicator currentStep={step} steps={['Especialista', 'Fecha y Hora', 'Tus Datos']} />}

                <div className="min-h-[500px]">
                    {/* Step 1: Specialist */}
                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="text-center mb-10">
                                <h1 className="text-3xl md:text-4xl font-display font-bold text-deglya-teal mb-3">Elige tu Especialista</h1>
                                <p className="text-deglya-wood/70">Selecciona con quién deseas iniciar tu proceso.</p>
                            </div>
                            <SpecialistSelection
                                onSelect={(id) => setData({ ...data, specialist: id })}
                                selected={data.specialist}
                            />
                        </div>
                    )}

                    {/* Step 2: Calendar */}
                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="text-center mb-10">
                                <h1 className="text-3xl md:text-4xl font-display font-bold text-deglya-teal mb-3">Agenda tu Sesión</h1>
                                <p className="text-deglya-wood/70">Selecciona el día y horario que mejor te convenga.</p>
                            </div>
                            <CalendarView
                                onSelectDate={(d) => setData({ ...data, date: d })}
                                selectedDate={data.date}
                                onSelectTime={(t) => setData({ ...data, time: t })}
                                selectedTime={data.time}
                            />
                        </div>
                    )}

                    {/* Step 3: Form */}
                    {step === 3 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="text-center mb-10">
                                <h1 className="text-3xl md:text-4xl font-display font-bold text-deglya-teal mb-3">Finaliza tu Registro</h1>
                                <p className="text-deglya-wood/70">Ingresa tus datos para asegurar tu cita.</p>
                            </div>
                            <RegistrationForm />
                        </div>
                    )}

                    {/* Step 4: Success & Confidential */}
                    {step === 4 && <SuccessView />}
                </div>

                {/* Footer Navigation */}
                {step < 4 && (
                    <div className="max-w-4xl mx-auto mt-12 flex justify-between items-center border-t border-deglya-wood/10 pt-8">
                        <Button
                            variant="ghost"
                            onClick={handleBack}
                            disabled={step === 1}
                            className={cn("text-deglya-wood hover:text-deglya-teal pl-0", step === 1 && "invisible")}
                        >
                            <ChevronLeft className="mr-2 h-4 w-4" /> Anterior
                        </Button>

                        <Button
                            onClick={handleNext}
                            disabled={(step === 1 && !data.specialist) || (step === 2 && (!data.date || !data.time))}
                            className="bg-deglya-teal hover:bg-deglya-teal/90 text-white min-w-[140px] shadow-lg shadow-deglya-teal/30"
                        >
                            {step === 3 ? 'Confirmar Pago' : 'Siguiente'}
                            {step !== 3 && <ChevronRight className="ml-2 h-4 w-4" />}
                        </Button>
                    </div>
                )}

            </div>
        </div>
    );
}
