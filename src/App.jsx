import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import AboutUs from './components/about/AboutUs';
import BookingPage from './pages/Booking';
import CheckoutPage from './components/booking/CheckoutPage';
// import IntakePage from './components/booking/IntakePage';
import Services from './components/ServicesPage';

import BookPage from './components/BookPage';
import BookingModal from './components/ui/BookingModal';
import WhatsAppFAB from './components/ui/WhatsAppFAB';
import PillarDetail from './pages/PillarDetail';

// Auth & Dashboard
import SecurityPortal from './pages/SecurityPortal';
import ActivateAccount from './pages/ActivateAccount';
import StaffLogin from './pages/StaffLogin';
import Portal from './pages/Portal';
import Unauthorized from './pages/Unauthorized';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import PatientDashboard from './pages/dashboard/PatientDashboard';
import ReceptionDashboard from './pages/dashboard/ReceptionDashboard';
import SpecialistDashboard from './pages/dashboard/SpecialistDashboard';
import SpecialistPatients from './pages/dashboard/SpecialistPatients';
import SpecialistAgenda from './pages/dashboard/SpecialistAgenda';
import SpecialistFinances from './pages/dashboard/SpecialistFinances';

// Placeholders
const Contact = () => <div className="p-12 text-center text-deglya-teal font-display text-2xl">Contacto (En Construcción)</div>;


import ScrollToHashElement from './components/ScrollToHashElement';
import SetPassword from './pages/SetPassword';
import { supabase } from './lib/backend';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function AuthRedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    // CAPTURA: Solo para saber si veníamos de un link
    const hadInviteIntent = window.location.hash.includes('access_token') || 
                           window.location.hash.includes('type=invite') || 
                           window.location.hash.includes('type=recovery');

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
        console.log(`[AUTH EVENT] ${event} | Session: ${session ? 'OK' : 'NULL'} | Intent: ${hadInviteIntent}`);

        // REGLA DE ORO: Si entramos con un link (o ya estamos dentro por el link), vamos a poner clave
        if ((event === 'SIGNED_IN' || event === 'INITIAL_SESSION') && (hadInviteIntent || window.location.hash.includes('access_token'))) {
            console.log(">>> CAMINO AL ÉXITO: Redirigiendo a Bóveda de Claves...");
            navigate('/set-password');
        }

        if (event === 'PASSWORD_RECOVERY') {
            navigate('/set-password');
        }
    });

    return () => {
        subscription?.unsubscribe();
    };
  }, [navigate]);
  return null;
}

function App() {
  return (
    <Router basename="/DeglyaCamero/">
      <AuthRedirectHandler />
      <ScrollToHashElement />
      <BookingModal />
      <WhatsAppFAB />
      <Routes>
        {/* === Public Routes === */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/servicios" element={<Services />} />
        <Route path="/servicios/pilar/:id" element={<PillarDetail />} />
        <Route path="/reino" element={<BookPage />} />
        <Route path="/book" element={<BookPage />} /> {/* Alias for QR codes */}
        <Route path="/contacto" element={<Contact />} />

        {/* === Booking Flow === */}
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        {/* <Route path="/intake" element={<IntakePage />} /> */}
        {/* Redirect legacy booking route */}
        <Route path="/agendar" element={<Navigate to="/booking" replace />} />

        {/* === Auth Routes === */}
        <Route path="/set-password" element={<SetPassword />} />
        <Route path="/activar-cuenta/:token" element={<ActivateAccount />} />
        <Route path="/login" element={<SecurityPortal />} />
        <Route path="/staff/auth" element={<StaffLogin />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* === Protected Portals === */}
        <Route element={<ProtectedRoute />}>
          <Route path="/portal" element={<Portal />} />
        </Route>

        {/* === Dashboards === */}

        {/* Patient Dashboard */}
        <Route element={<ProtectedRoute allowedRoles={['patient']} />}>
          <Route path="/dashboard/paciente" element={<DashboardLayout role="patient" />}>
            <Route index element={<PatientDashboard />} />
            <Route path="citas" element={<div>Mis Citas (Coming Soon)</div>} />
            <Route path="pagos" element={<div>Pagos (Coming Soon)</div>} />
            <Route path="perfil" element={<div>Perfil (Coming Soon)</div>} />
          </Route>
        </Route>

        {/* Specialist Dashboard */}
        <Route element={<ProtectedRoute allowedRoles={['specialist', 'therapist']} />}>
          <Route path="/dashboard/especialista" element={<DashboardLayout role="specialist" />}>
            <Route index element={<SpecialistDashboard />} />
            <Route path="pacientes" element={<SpecialistPatients />} />
            <Route path="agenda" element={<SpecialistAgenda />} />
            <Route path="finanzas" element={<SpecialistFinances />} />
          </Route>
        </Route>

        {/* Reception/Admin Dashboard */}
        <Route element={<ProtectedRoute allowedRoles={['receptionist', 'admin', 'secretary']} />}>
          <Route path="/dashboard/recepcion" element={<DashboardLayout role="receptionist" />}>
            <Route index element={<ReceptionDashboard />} />
            <Route path="*" element={<Navigate to="" replace />} />
          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
