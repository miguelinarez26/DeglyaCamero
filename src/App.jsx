import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';

import Services from './pages/Services';
import Booking from './pages/Booking';
import Portal from './pages/Portal';

const About = () => <div className="p-12 text-center text-deglya-teal font-display text-2xl">Quiénes Somos (En Construcción)</div>;
const Contact = () => <div className="p-12 text-center text-deglya-teal font-display text-2xl">Contacto (En Construcción)</div>;
const Kingdom = () => <div className="p-12 text-center text-deglya-teal font-display text-2xl">Reino de lo Posible (En Construcción)</div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/servicios" element={<Services />} />
        <Route path="/quienes-somos" element={<About />} />
        <Route path="/reino" element={<Kingdom />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="/agendar" element={<Booking />} />
        <Route path="/portal" element={<Portal />} />

        {/* Redirect unknown routes to Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
