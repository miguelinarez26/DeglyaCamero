import { useEffect, useState } from 'react';
import { supabase } from '../../lib/backend';
import PaymentVerificationModal from '../../components/dashboard/PaymentVerificationModal';
import PatientInviteForm from '../../components/dashboard/PatientInviteForm';
import { UserPlus, X } from 'lucide-react';
import { useUserRole } from '../../hooks/useUserRole';

const ReceptionDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [showInviteModal, setShowInviteModal] = useState(false);
    const { user, profile } = useUserRole();
    const name = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Carolina';

    const fetchPending = async () => {
        setLoading(true);
        // Join with patients and specialists (via 'profiles' on 'user_id')
        const { data, error } = await supabase
            .from('bookings')
            .select(`
        id,
        start_time,
        payment_proof_url,
        status,
        patients ( first_name, last_name, phone, email ),
        profiles:user_id ( full_name )
      `)
            .eq('status', 'pending') // Enum uses 'pending', not 'pendiente'
            .order('start_time', { ascending: true });

        if (error) {
            console.error('Error fetching bookings:', error);
        } else {
            setAppointments(data || []);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchPending();
    }, []);

    const handleSuccess = () => {
        setSelectedAppointment(null);
        fetchPending(); // Refresh list
        // Optional: Add toast notification here
    };

    return (
        <div className="min-h-screen bg-transparent p-6 md:p-10 relative">
            <header className="mb-10 flex flex-col md:flex-row justify-between md:items-end border-b border-stone-200 pb-6 gap-4">
                <div>
                    <p className="text-xs font-bold text-deglya-teal uppercase tracking-widest mb-1 italic">
                        ¡Hola, {name}!
                    </p>
                    <h1 className="text-3xl font-display font-bold text-stone-800">
                        Recepción
                    </h1>
                    <p className="text-stone-500 mt-1">Gestión de Citas y Pagos</p>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowInviteModal(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-stone-800 text-white rounded-xl text-sm font-medium hover:bg-stone-900 transition-all shadow-md hover:shadow-lg"
                    >
                        <UserPlus className="w-4 h-4" />
                        Invitar Paciente
                    </button>
                    <button
                        onClick={fetchPending}
                        className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold text-stone-500 hover:text-stone-900 transition-colors px-4 py-2 border border-stone-200 hover:border-stone-300 rounded-xl bg-white"
                    >
                        Refrescar Lista
                    </button>
                </div>
            </header>

            {/* Modal de Invitación */}
            {showInviteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-md animate-in fade-in zoom-in">
                    <div className="relative w-full max-w-md shadow-2xl">
                        {/* Botón Cerrar Modal */}
                        <button 
                            onClick={() => setShowInviteModal(false)}
                            className="absolute -top-4 -right-4 p-2.5 bg-white text-stone-500 hover:text-red-500 rounded-full shadow-lg border border-stone-100 transition-colors z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>
                        
                        {/* Formulario */}
                        <PatientInviteForm />
                    </div>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-10 h-10 border-4 border-stone-800 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : appointments.length === 0 ? (
                <div className="text-center py-24 bg-white rounded-3xl border border-stone-200 border-dashed shadow-sm">
                    <p className="text-stone-400 text-lg font-medium">No hay citas pendientes de validación</p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {appointments.map((apt: any) => (
                        <div key={apt.id} className="bg-white border border-stone-200 rounded-2xl p-6 hover:shadow-lg hover:border-stone-300 transition-all group flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-lg text-stone-800 group-hover:text-stone-900 transition-colors">
                                            {apt.patients ? `${apt.patients.first_name} ${apt.patients.last_name}` : 'Paciente'}
                                        </h3>
                                        <p className="text-sm text-stone-500 mt-1">{apt.patients?.phone || 'Sin telefono'}</p>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${apt.payment_proof_url ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-600 border-red-200'}`}>
                                        {apt.payment_proof_url ? 'Pago Enviado' : 'Sin Comprobante'}
                                    </div>
                                </div>

                                <div className="space-y-3 text-sm text-stone-600 mb-6 bg-stone-50 p-4 rounded-xl">
                                    <div className="flex justify-between items-center">
                                        <span className="text-stone-400 font-medium">Especialista</span>
                                        <span className="font-semibold text-stone-700">{apt.profiles?.full_name || 'General'}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-stone-400 font-medium">Fecha</span>
                                        <span className="font-semibold text-stone-700">
                                            {new Date(apt.start_time).toLocaleDateString('es-VE', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedAppointment(apt)}
                                className="w-full py-3 bg-stone-100 hover:bg-stone-800 hover:text-white text-stone-700 rounded-xl transition-all text-sm font-bold shadow-sm"
                            >
                                Verificar Detalles y Pago
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {selectedAppointment && (
                <PaymentVerificationModal
                    appointment={selectedAppointment}
                    onClose={() => setSelectedAppointment(null)}
                    onSuccess={handleSuccess}
                />
            )}
        </div>
    );
};

export default ReceptionDashboard;
