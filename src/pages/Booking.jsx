import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { useUserRole } from '@/hooks/useUserRole'; // Import User Role Hook
import { supabase } from '@/lib/backend'; // Import Supabase Client

// --- Components for Wizard Steps ---

import { StepIndicator } from '@/components/booking/StepIndicator';
import { TriageSection } from '@/components/booking/TriageSection';
import { CalendarView } from '@/components/booking/CalendarView';
import { RegistrationForm } from '@/components/booking/RegistrationForm';
import { SuccessView } from '@/components/booking/SuccessView';
import { getSpecialists, getAvailableSlots, createAppointment } from '@/lib/backend';

export default function Booking() {
    const [step, setStep] = useState(1);
    const [data, setData] = useState({ triage: {}, date: null, time: null });
    const [patientDetails, setPatientDetails] = useState({});
    const [specialists, setSpecialists] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchParams] = useSearchParams(); // Import from react-router-dom
    const navigate = useNavigate();

    // 1. Auth Detection logic
    const { user, role } = useUserRole();

    // 2. Pre-fill Data Effect
    useEffect(() => {
        const fetchUserProfile = async () => {
            if (user && role === 'patient') {
                // Fetch full profile data
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (profile) {
                    setPatientDetails({
                        name: profile.first_name || '', // Assuming standard schema
                        lastName: profile.last_name || '',
                        email: user.email,
                        phone: profile.phone || '',
                        nationalId: profile.national_id || '' // Assuming this field exists
                    });
                } else {
                    // Fallback to minimal auth data
                    setPatientDetails({
                        email: user.email
                    });
                }
            }
        };

        fetchUserProfile();
    }, [user, role]);



    // 1.5 URL Param Handling (Direct Link)
    useEffect(() => {
        const serviceParam = searchParams.get('service');
        if (serviceParam === 'initial-interview' && step === 1) {
            // Auto-fill triage for this specific service
            setData(prev => ({
                ...prev,
                triage: {
                    reason: 'Entrevista Inicial',
                    notes: 'Agendado vía enlace directo'
                }
            }));
            setStep(2); // Skip to Calendar
        }
    }, [searchParams, step]);

    const defaultSpecialistId = specialists[0]?.id;

    useEffect(() => {
        const loadSlots = async () => {
            if (data.date && defaultSpecialistId) {
                const year = 2024;
                const month = 6; // July is 6
                const dateObj = new Date(year, month, data.date);

                const slots = await getAvailableSlots(dateObj, defaultSpecialistId);
                setAvailableSlots(slots);
            } else {
                setAvailableSlots([]);
            }
        };
        if (specialists.length > 0) {
            loadSlots();
        }
    }, [data.date, specialists, defaultSpecialistId]);


    useEffect(() => {
        const loadSpecialists = async () => {
            const fetched = await getSpecialists();
            const formatted = fetched.map(s => ({
                id: s.id,
                name: s.full_name,
                role: 'Especialista',
                image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop',
                specialty: s.specialty
            }));

            if (formatted.length === 0) {
                setSpecialists([
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
                ]);
            } else {
                setSpecialists(formatted);
            }
            setLoading(false);
        };
        loadSpecialists();
    }, []);

    const handleNext = async () => {
        if (step === 3) {
            try {
                await createAppointment({
                    triage: data.triage,
                    date: data.date,
                    time: data.time,
                    patientDetails
                });
                setStep(prev => prev + 1);
            } catch (err) {
                console.error("Failed to create appointment", err);
                alert(`Error: ${err.message || 'Hubo un error al crear la cita.'} `);
            }
        } else {
            setStep(prev => prev + 1);
        }
    };
    const handleBack = () => setStep(prev => prev - 1);

    // Dynamic Validation for Step 3
    const isStep3Valid = () => {
        if (user) return true; // If logged in, assume valid (or basic checks pass via pre-fill)
        // Guest validation
        return patientDetails.name && patientDetails.lastName && patientDetails.email && patientDetails.phone;
    };


    return (
        <div className="min-h-screen bg-deglya-cream font-sans selection:bg-deglya-mustard selection:text-white">
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

                {step < 4 && <StepIndicator currentStep={step} steps={['Motivo', 'Agenda', 'Tus Datos']} />}

                <div className="min-h-[500px]">
                    {step === 1 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="text-center mb-10">
                                <h1 className="text-3xl md:text-4xl font-display font-bold text-deglya-teal mb-3">¿Cómo te podemos ayudar?</h1>
                                <p className="text-deglya-wood/70">Cuéntanos brevemente tu necesidad para asignarte el mejor especialista.</p>
                            </div>
                            <TriageSection
                                data={data.triage}
                                onChange={(t) => setData({ ...data, triage: t })}
                            />
                        </div>
                    )}

                    {step === 2 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="text-center mb-10">
                                <h1 className="text-3xl md:text-4xl font-display font-bold text-deglya-teal mb-3">Agenda tu Sesión</h1>
                                <p className="text-deglya-wood/70">Selecciona el día y horario que mejor te convenga.</p>
                            </div>
                            <CalendarView
                                onSelectDate={(d) => setData({ ...data, date: d, time: null })}
                                selectedDate={data.date}
                                onSelectTime={(t) => setData({ ...data, time: t })}
                                selectedTime={data.time}
                                timeSlots={availableSlots}
                            />
                        </div>
                    )}

                    {step === 3 && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="text-center mb-10">
                                <h1 className="text-3xl md:text-4xl font-display font-bold text-deglya-teal mb-3">Finaliza tu Registro</h1>
                                <p className="text-deglya-wood/70">Ingresa tus datos para asegurar tu cita.</p>
                            </div>
                            <RegistrationForm
                                formData={patientDetails}
                                onChange={setPatientDetails}
                                currentUser={user} // Pass Auth User
                            />
                        </div>
                    )}

                    {step === 4 && <SuccessView />}
                </div>

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
                            disabled={
                                (step === 1 && !data.triage?.reason) ||
                                (step === 2 && (!data.date || !data.time)) ||
                                (step === 3 && !isStep3Valid()) // Added validation for Step 3
                            }
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
