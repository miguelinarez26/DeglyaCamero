import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../ui/Logo';

export const Footer = () => (
    <footer className="bg-sand/10 py-16 dark:bg-sand/5 mt-auto">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                <div className="col-span-2 md:col-span-1">
                    <Logo />
                    <p className="mt-4 text-sm text-text-light/70 dark:text-text-dark/70">Un espacio para sanar, crecer y reconectar.</p>
                </div>
                <div>
                    <h3 className="font-bold mb-4 font-display text-primary dark:text-sand">Navegación</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link className="text-text-light/80 hover:text-primary dark:text-text-dark/80 dark:hover:text-sand transition-colors" to="/">Inicio</Link></li>
                        <li><Link className="text-text-light/80 hover:text-primary dark:text-text-dark/80 dark:hover:text-sand transition-colors" to="/">Sobre Mí</Link></li>
                        <li><Link className="text-text-light/80 hover:text-primary dark:text-text-dark/80 dark:hover:text-sand transition-colors" to="/">Servicios</Link></li>
                        <li><Link className="text-text-light/80 hover:text-primary dark:text-text-dark/80 dark:hover:text-sand transition-colors" to="/">Blog</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold mb-4 font-display text-primary dark:text-sand">Legal</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a className="text-text-light/80 hover:text-primary dark:text-text-dark/80 dark:hover:text-sand transition-colors" href="#">Política de Privacidad</a></li>
                        <li><a className="text-text-light/80 hover:text-primary dark:text-text-dark/80 dark:hover:text-sand transition-colors" href="#">Términos y Condiciones</a></li>
                        <li><a className="text-text-light/80 hover:text-primary dark:text-text-dark/80 dark:hover:text-sand transition-colors" href="#">Aviso Legal</a></li>
                    </ul>
                </div>
                <div>
                    <h3 className="font-bold mb-4 font-display text-primary dark:text-sand">Contacto</h3>
                    <ul className="space-y-2 text-sm">
                        <li className="text-text-light/80 dark:text-text-dark/80">hola@conexionhumana.com</li>
                        <li className="text-text-light/80 dark:text-text-dark/80">+1 (234) 567-890</li>
                    </ul>
                </div>
            </div>
            <div className="mt-12 border-t border-sand/30 pt-8 text-center text-sm text-text-light/60 dark:border-sand/10 dark:text-text-dark/60">
                <p>© 2024 Conexión Humana. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>
);
