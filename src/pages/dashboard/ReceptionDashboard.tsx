import { useEffect, useState } from 'react';
import { supabase } from '../../lib/backend';
import PaymentVerificationModal from '../../components/dashboard/PaymentVerificationModal';

const ReceptionDashboard = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedAppointment, setSelectedAppointment] = useState(null);

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
        <div className="min-h-screen bg-deglya-charcoal text-white p-6 md:p-12">
            <header className="mb-10 flex justify-between items-end border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-3xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-deglya-teal to-blue-400">
                        Recepción
                    </h1>
                    <p className="text-deglya-gray-light mt-1">Gestión de Citas y Pagos</p>
                </div>
                <button
                    onClick={fetchPending}
                    className="text-xs uppercase tracking-wider text-deglya-teal hover:text-white transition-colors"
                >
                    Refrescar Lista
                </button>
            </header>

            {loading ? (
                <div className="flex justify-center py-20">
                    <div className="w-10 h-10 border-4 border-deglya-teal border-t-transparent rounded-full animate-spin" />
                </div>
            ) : appointments.length === 0 ? (
                <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/5 border-dashed">
                    <p className="text-white/40 text-lg">No hay citas pendientes de validación</p>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {appointments.map((apt: any) => (
                        <div key={apt.id} className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all group">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-semibold text-lg text-white group-hover:text-deglya-teal transition-colors">
                                        {apt.patients ? `${apt.patients.first_name} ${apt.patients.last_name}` : 'Paciente'}
                                    </h3>
                                    <p className="text-sm text-white/50">{apt.patients?.phone || 'Sin telefono'}</p>
                                </div>
                                <div className={`px-2 py-1 rounded text-xs font-bold uppercase ${apt.payment_proof_url ? 'bg-amber-500/20 text-amber-200' : 'bg-red-500/10 text-red-200'}`}>
                                    {apt.payment_proof_url ? 'Pago Enviado' : 'Sin Comprobante'}
                                </div>
                            </div>

                            <div className="space-y-2 text-sm text-white/70 mb-6">
                                <div className="flex justify-between">
                                    <span>Especialista:</span>
                                    <span className="text-white">{apt.profiles?.full_name || 'General'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Fecha:</span>
                                    <span className="text-white">
                                        {new Date(apt.start_time).toLocaleDateString('es-VE', { weekday: 'short', day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => setSelectedAppointment(apt)}
                                className="w-full py-2 bg-white/10 hover:bg-deglya-teal hover:text-white rounded-xl transition-all text-sm font-medium border border-white/5"
                            >
                                Verificar Pago
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
