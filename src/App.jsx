import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import AboutUs from './components/about/AboutUs';
import BookingPage from './pages/Booking';
// import CheckoutPage from './components/booking/CheckoutPage';
// import IntakePage from './components/booking/IntakePage';
import Services from './components/ServicesPage';

import BookPage from './components/BookPage';
import BookingModal from './components/ui/BookingModal';
import WhatsAppFAB from './components/ui/WhatsAppFAB';

// Auth & Dashboard (Keeping existing structure for now)
import Login from './pages/Login';
import ActivateAccount from './pages/ActivateAccount';
import StaffLogin from './pages/StaffLogin';
import Portal from './pages/Portal';
import Unauthorized from './pages/Unauthorized';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ReceptionDashboard from './pages/dashboard/ReceptionDashboard';

// Placeholders
const Contact = () => <div className="p-12 text-center text-deglya-teal font-display text-2xl">Contacto (En Construcción)</div>;

// Dashboard Placeholders
const SpecialistDashboard = () => <div className="p-12 text-white">Dashboard Especialista</div>;
const PatientDashboard = () => <div className="p-12 text-white">Dashboard Paciente</div>;

function App() {
  return (
    <Router>
      <BookingModal />
      <WhatsAppFAB />
      <Routes>
        {/* === Public Routes === */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/servicios" element={<Services />} />
        <Route path="/reino" element={<BookPage />} />
        <Route path="/book" element={<BookPage />} /> {/* Alias for QR codes */}
        <Route path="/contacto" element={<Contact />} />

        {/* === Booking Flow === */}
        <Route path="/booking" element={<BookingPage />} />
        {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
        {/* <Route path="/intake" element={<IntakePage />} /> */}
        {/* Redirect legacy booking route */}
        <Route path="/agendar" element={<Navigate to="/booking" replace />} />

        {/* === Auth Routes === */}
        <Route path="/activar-cuenta/:token" element={<ActivateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/staff/auth" element={<StaffLogin />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* === Protected Portals === */}
        <Route element={<ProtectedRoute />}>
          <Route path="/portal" element={<Portal />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['specialist']} />}>
          <Route path="/dashboard/especialista/*" element={<SpecialistDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['receptionist', 'admin']} />}>
          <Route path="/dashboard/recepcion/*" element={<ReceptionDashboard />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['patient']} />}>
          <Route path="/dashboard/paciente/*" element={<PatientDashboard />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
