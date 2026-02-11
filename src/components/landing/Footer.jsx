import React from 'react';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-structure text-white/80 py-16 px-6 lg:px-12 border-t border-structure/50">
            <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-1">
                    <a href="#" className="font-display font-bold text-2xl text-white mb-6 block">Deglya Camero</a>
                    <p className="text-sm leading-relaxed opacity-90 mb-6">
                        Acompañando procesos de transformación humana para construir vidas con propósito y significado.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-white transition-colors"><Facebook size={24} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Instagram size={24} /></a>
                        <a href="#" className="hover:text-white transition-colors"><Linkedin size={24} /></a>
                    </div>
                </div>

                <div>
                    <h5 className="text-white font-bold uppercase tracking-wider text-xs mb-6">Explorar</h5>
                    <ul className="space-y-3 text-sm">
                        <li><a href="/about" className="hover:text-white transition-colors">Sobre Mí</a></li>
                        <li><a href="/servicios" className="hover:text-white transition-colors">Servicios</a></li>
                        <li><a href="/#book" className="hover:text-white transition-colors">El Libro</a></li>
                        <li><a href="/#resources" className="hover:text-white transition-colors">Recursos Gratuitos</a></li>
                    </ul>
                </div>

                <div>
                    <h5 className="text-white font-bold uppercase tracking-wider text-xs mb-6">Servicios</h5>
                    <ul className="space-y-3 text-sm">
                        <li><a href="#" className="hover:text-white transition-colors">Coaching Personal</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Terapia Psicológica</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Consultoría Corporativa</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Talleres y Cursos</a></li>
                    </ul>
                </div>

                <div>
                    <h5 className="text-white font-bold uppercase tracking-wider text-xs mb-6">Newsletter</h5>
                    <p className="text-sm opacity-90 mb-4">Recibe inspiración semanal en tu correo.</p>
                    <form className="flex flex-col gap-2">
                        <input type="email" placeholder="Tu correo electrónico" className="bg-white/10 border border-white/20 rounded px-4 py-2 text-sm text-white placeholder-white/50 focus:outline-none focus:border-white" />
                        <button className="bg-conversion hover:bg-conversion/90 text-stone-900 text-sm font-bold py-2 rounded transition-colors shadow-lg">Suscribirse</button>
                    </form>
                </div>
            </div>

            <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-xs opacity-60">
                <p>© 2026 Deglya Camero Group. Todos los derechos reservados.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white">Política de Privacidad</a>
                    <a href="#" className="hover:text-white">Términos de Servicio</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
