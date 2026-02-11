import React, { useEffect, useState } from 'react';
import { Calendar, Clock, ArrowRight, PlusCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/backend';
import { useUserRole } from '@/hooks/useUserRole';
import { Link } from 'react-router-dom';

const StatCard = ({ label, value, subtext, icon: Icon, colorClass = "bg-deglya-teal" }) => (
    <div className="bg-white p-6 rounded-2xl border border-stone-100 shadow-sm flex items-start justify-between">
        <div>
            <p className="text-sm font-medium text-stone-500 mb-1">{label}</p>
            <h3 className="text-2xl font-bold text-stone-800">{value}</h3>
            {subtext && <p className="text-xs text-stone-400 mt-1">{subtext}</p>}
        </div>
        <div className={`p-3 rounded-xl ${colorClass}/10 text-${colorClass.replace('bg-', '')}`}>
            <Icon className={`w-6 h-6 text-${colorClass.replace('bg-', '')}`} />
        </div>
    </div>
);

const AppointmentCard = ({ appointment }) => {
    const date = new Date(appointment.start_time);
    const time = date.toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit', hour12: true });
    const dateStr = date.toLocaleDateString('es-VE', { weekday: 'long', day: 'numeric', month: 'long' });

    return (
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-deglya-teal/50 transition-colors">
            <div className="flex items-start gap-4">
                <div className="flex flex-col items-center justify-center w-14 h-14 bg-stone-50 rounded-lg border border-stone-100">
                    <span className="text-xs font-bold text-stone-400 uppercase">{date.toLocaleDateString('es-VE', { month: 'short' })}</span>
                    <span className="text-xl font-bold text-stone-800">{date.getDate()}</span>
                </div>
                <div>
                    <h4 className="font-semibold text-stone-800 group-hover:text-deglya-teal transition-colors">Sesión de Terapia</h4>
                    <div className="flex items-center gap-3 text-sm text-stone-500 mt-1">
                        <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {time}
                        </span>
                        <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[10px] font-medium uppercase">
                            {appointment.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {appointment.meeting_link && (
                    <Button size="sm" variant="outline" className="w-full md:w-auto text-xs" onClick={() => window.open(appointment.meeting_link, '_blank')}>
                        Unirse a videollamada
                    </Button>
                )}
                <Button size="sm" variant="ghost" className="w-full md:w-auto text-xs text-stone-400">
                    Detalles
                </Button>
            </div>
        </div>
    );
};

export default function PatientDashboard() {
    const { user, loading: authLoading } = useUserRole();
    const [appointments, setAppointments] = useState([]);
    const [history, setHistory] = useState([]);
    const [stats, setStats] = useState({ completed: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchAppointments();
        }
    }, [user]);

    const fetchAppointments = async () => {
        try {
            // Correction: We need to verify patient ID first.
            const { data: patientData } = await supabase
                .from('patients')
                .select('id')
                .eq('profile_id', user.id)
                .single();

            if (patientData) {
                // Fetch Upcoming
                const { data: upcoming, error: upcomingError } = await supabase
                    .from('appointments')
                    .select('*')
                    .eq('patient_id', patientData.id)
                    .gte('start_time', new Date().toISOString()) // Only future appointments
                    .neq('status', 'cancelled')
                    .order('start_time', { ascending: true })
                    .limit(3);

                if (!upcomingError) setAppointments(upcoming);

                // Fetch History
                const { data: past, error: pastError } = await supabase
                    .from('appointments')
                    .select('*')
                    .eq('patient_id', patientData.id)
                    .lt('start_time', new Date().toISOString()) // Past appointments
                    .order('start_time', { ascending: false })
                    .limit(5);

                if (!pastError) setHistory(past);

                // Fetch Stats (Completed Count)
                const { count: completedCount } = await supabase
                    .from('appointments')
                    .select('*', { count: 'exact', head: true })
                    .eq('patient_id', patientData.id)
                    .eq('status', 'completed'); // Ensure 'completed' matches DB enum

                setStats(prev => ({ ...prev, completed: completedCount || 0 }));

            } else {
                console.log("No patient record found for user");
            }

        } catch (error) {
            console.error('Error fetching appointments:', error);
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || loading) {
        return (
            <div className="h-full w-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-deglya-teal"></div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-display font-bold text-stone-800">
                        Hola, {user?.user_metadata?.full_name?.split(' ')[0] || 'Usuario'}
                    </h2>
                    <p className="text-stone-500">Aquí tienes un resumen de tu bienestar.</p>
                </div>
                <Link to="/booking?service=initial-interview">
                    <Button className="bg-deglya-gold text-stone-900 hover:bg-yellow-500 shadow-lg shadow-yellow-500/20">
                        <PlusCircle className="w-4 h-4 mr-2" />
                        Agendar Nueva Cita
                    </Button>
                </Link>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                    label="Próxima Sesión"
                    value={appointments[0] ? new Date(appointments[0].start_time).toLocaleDateString('es-VE', { day: 'numeric', month: 'short' }) : '---'}
                    subtext={appointments[0] ? new Date(appointments[0].start_time).toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' }) : 'Sin agenda'}
                    icon={Calendar}
                    colorClass="bg-deglya-teal"
                />
                <StatCard
                    label="Sesiones Completadas"
                    value={stats.completed}
                    subtext="Total histórico"
                    icon={Clock}
                    colorClass="bg-blue-500"
                />
                <StatCard
                    label="Estado de Cuenta"
                    value="Al día"
                    subtext="Sin pagos pendientes"
                    icon={AlertCircle}
                    colorClass="bg-green-500"
                />
            </div>

            {/* Appointments List */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-stone-800">Próximas Citas</h3>
                    <Button variant="link" className="text-deglya-teal">Ver todas</Button>
                </div>

                {appointments.length > 0 ? (
                    <div className="space-y-3">
                        {appointments.map((apt) => (
                            <AppointmentCard key={apt.id} appointment={apt} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-stone-50 rounded-2xl border border-dashed border-stone-200 p-8 text-center">
                        <div className="w-12 h-12 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Calendar className="w-6 h-6 text-stone-400" />
                        </div>
                        <h4 className="text-stone-900 font-medium">No tienes citas programadas</h4>
                        <p className="text-sm text-stone-500 mb-4">Agenda tu próxima sesión para continuar tu proceso.</p>
                        <Link to="/booking">
                            <Button variant="outline">Agendar ahora</Button>
                        </Link>
                    </div>
                )}
            </div>

            {/* History Section */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
                <h3 className="text-lg font-semibold text-stone-800">Historial Reciente</h3>

                {history.length > 0 ? (
                    <div className="space-y-3">
                        {history.map((apt) => (
                            <AppointmentCard key={apt.id} appointment={apt} />
                        ))}
                    </div>
                ) : (
                    <p className="text-stone-500 text-sm italic">No hay citas pasadas para mostrar.</p>
                )}
            </div>
        </div>
    );
}
