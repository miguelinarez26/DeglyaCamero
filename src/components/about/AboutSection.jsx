import React from 'react';
import { Leaf } from 'lucide-react';

const AboutSection = () => {
    return (
        <section className="relative py-20 bg-deglya-cream overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Image Column */}
                    <div className="relative order-2 lg:order-1">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                            <img
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop"
                                alt="Deglya Camero"
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                                <p className="text-white font-display text-2xl font-bold">Deglya Camero</p>
                                <p className="text-white/90 text-sm tracking-wide">Psicóloga & Consultora</p>
                            </div>
                        </div>
                        {/* Decorative element */}
                        <div className="absolute -z-10 top-10 -left-10 w-full h-full border-2 border-booking-secondary/20 rounded-2xl"></div>
                    </div>

                    {/* Text Column */}
                    <div className="order-1 lg:order-2 space-y-8">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-booking-secondary/10 text-booking-secondary font-bold text-xs uppercase tracking-wider">
                            <Leaf size={14} />
                            <span>Nuestra Esencia</span>
                        </div>

                        <h2 className="text-4xl lg:text-5xl font-display font-bold text-deglya-wood leading-tight">
                            Psicología y Consultoría con <span className="text-booking-secondary italic">Propósito</span>
                        </h2>

                        <div className="space-y-4 text-lg text-deglya-wood/80 leading-relaxed font-body">
                            <p>
                                Deglya Camero Group es una firma dedicada a transformar vidas y organizaciones a través de una comprensión profunda del comportamiento humano.
                            </p>
                            <p>
                                Combinamos la ciencia de la psicología clínica con estrategias de consultoría organizacional para desbloquear el potencial latente en personas y equipos. Creemos firmemente que el bienestar no es un destino, sino una práctica diaria de diseño consciente.
                            </p>
                            <p>
                                Nuestra misión es acompañarte en el viaje de convertir el caos en claridad y los desafíos en oportunidades de crecimiento sostenible.
                            </p>
                        </div>

                        <div className="pt-4">
                            <div className="flex gap-12">
                                <div>
                                    <p className="text-3xl font-display font-bold text-booking-primary">15+</p>
                                    <p className="text-sm text-deglya-wood/60 uppercase tracking-wider font-semibold">Años de Exp.</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-display font-bold text-booking-primary">2k+</p>
                                    <p className="text-sm text-deglya-wood/60 uppercase tracking-wider font-semibold">Pacientes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
