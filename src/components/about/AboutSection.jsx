import React from 'react';
import { Leaf } from 'lucide-react';
import { useInView, animate } from 'framer-motion';

const Counter = ({ from, to, duration = 2, suffix = '' }) => {
    const nodeRef = React.useRef();
    const isInView = useInView(nodeRef, { once: true, margin: "-100px" });

    React.useEffect(() => {
        const node = nodeRef.current;
        if (isInView && node) {
            const controls = animate(from, to, {
                duration,
                onUpdate(value) {
                    node.textContent = Math.floor(value) + suffix;
                },
            });
            return () => controls.stop();
        }
    }, [from, to, duration, isInView, suffix]);

    return <span ref={nodeRef} />;
};

const AboutSection = () => {
    return (
        <section className="relative pt-8 pb-20 bg-deglya-cream overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Image Column */}
                    <div className="relative order-2 lg:order-1">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
                            <img
                                src="https://yqmqzyaqlhgzcbcbintn.supabase.co/storage/v1/object/public/Imagenes%20Deglya%20web/Especialistas/Todos%20los%20Especialistas.png"
                                alt="Equipo Deglya Camero Group"
                                className="w-full h-auto object-cover object-top"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                                <p className="text-white font-display text-2xl font-bold">Nuestro Equipo</p>
                                <p className="text-white/90 text-sm tracking-wide">Unidos por tu bienestar</p>
                            </div>
                        </div>
                        {/* Decorative element */}
                        <div className="absolute -z-10 top-10 -left-10 w-full h-full border-2 border-booking-secondary/20 rounded-2xl"></div>
                    </div>

                    {/* Text Column */}
                    <div className="order-1 lg:order-2 space-y-8">

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
                                    <p className="text-3xl font-display font-bold text-booking-primary">
                                        <Counter from={0} to={2000} suffix="+" />
                                    </p>
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
