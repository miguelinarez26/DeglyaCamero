import React from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="relative bg-[#F4EFE6] text-stone-700 py-24 px-6 lg:px-12 overflow-hidden border-t border-stone-200/50">
            {/* Decorative background waves */}
            <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-conversion/5 rounded-full blur-3xl -translate-y-1/2 -z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-stone-200/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4 -z-10 pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-4 md:grid-cols-2 gap-x-8 gap-y-16 font-body items-start">
                {/* 1. Logo & Bio */}
                <div className="col-span-1 flex flex-col items-start">
                    {/* Contenedor anclado métricamente a la misma altura/margen que los H5 adyacentes */}
                    <a href="#" className="h-8 md:h-10 mb-6 flex items-center -ml-2">
                        <img
                            src={import.meta.env.BASE_URL + "images/logo4.png"}
                            alt="Deglya Camero Logo"
                            className="w-40 md:w-48 object-contain origin-left"
                        />
                    </a>
                    <div className="space-y-6 pt-1">
                        <p className="text-stone-600 text-[15px] leading-relaxed max-w-sm">
                            Acompañando procesos de transformación humana para construir vidas con propósito y significado.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 bg-white shadow hover:shadow-md rounded-full flex items-center justify-center text-structure hover:text-conversion transition-all">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white shadow hover:shadow-md rounded-full flex items-center justify-center text-structure hover:text-conversion transition-all">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 bg-white shadow hover:shadow-md rounded-full flex items-center justify-center text-structure hover:text-conversion transition-all">
                                <Youtube size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* 2. Explorar */}
                <div>
                    <h5 className="font-display font-medium text-xl md:text-2xl text-structure mb-6 mt-0">Explorar</h5>
                    <div className="space-y-4 text-stone-600 text-[15px] flex flex-col">
                        <Link to="/about" className="hover:text-conversion transition-colors">Sobre Mí</Link>
                        <Link to="/servicios" className="hover:text-conversion transition-colors">Servicios</Link>
                        <a href={import.meta.env.BASE_URL + "#book"} className="hover:text-conversion transition-colors">El Libro</a>
                        <a href={import.meta.env.BASE_URL + "#resources"} className="hover:text-conversion transition-colors">Recursos Gratuitos</a>
                    </div>
                </div>

                {/* 3. Servicios */}
                <div>
                    <h5 className="font-display font-medium text-xl md:text-2xl text-structure mb-6 mt-0">Servicios</h5>
                    <div className="space-y-4 text-stone-600 text-[15px] flex flex-col">
                        <Link to="/servicios" className="hover:text-conversion transition-colors">Psicoterapia EMDR (individual y grupal)</Link>
                        <Link to="/servicios" className="hover:text-conversion transition-colors">Psicoterapia de pareja</Link>
                        <Link to="/servicios" className="hover:text-conversion transition-colors">Psicoterapia infantil y de adolescentes</Link>
                        <Link to="/servicios" className="hover:text-conversion transition-colors">Asesoramiento psicológico</Link>
                        <Link to="/servicios" className="hover:text-conversion transition-colors">Coaching de vida</Link>
                        <Link to="/servicios" className="hover:text-conversion transition-colors">Coaching vocacional y ocupacional</Link>
                        <Link to="/servicios" className="hover:text-conversion transition-colors">Psicoterapia grupal</Link>
                    </div>
                </div>

                {/* 4. Newsletter */}
                <div>
                    <h5 className="font-display font-medium text-xl md:text-2xl text-structure mb-6 mt-0 whitespace-nowrap">Suscripción</h5>
                    <p className="text-stone-600 text-[15px] mb-4">Recibe inspiración semanal en tu correo.</p>
                    <form className="flex flex-col gap-3">
                        <input type="email" placeholder="Tu correo electrónico" className="bg-white border border-stone-200 rounded px-4 py-2 text-[15px] text-stone-800 focus:outline-none focus:border-conversion focus:ring-1 focus:ring-conversion" />
                        <button className="btn-wellness text-white text-sm font-bold py-2.5 rounded-full transform hover:scale-105 transition-all shadow-md">Suscribirse</button>
                    </form>
                </div>
            </div>

            {/* Sub-footer Elements positioned dynamically */}
            <div className="relative z-10 max-w-7xl mx-auto pt-24 mt-4 flex flex-col md:flex-row justify-between items-center text-[15px] border-t border-stone-200">
                <p className="text-stone-500 font-medium">© 2026 Deglya Camero Group. Todos los derechos reservados.</p>
                <div className="flex gap-6 mt-4 md:mt-0 text-stone-500 font-medium">
                    <a href="#" className="hover:text-conversion transition-colors">Política de Privacidad</a>
                    <a href="#" className="hover:text-conversion transition-colors">Términos de Servicio</a>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
