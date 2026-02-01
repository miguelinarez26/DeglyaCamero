import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        type: 'Coaching Individual',
        date: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        alert("Gracias por tu solicitud. Nos pondremos en contacto pronto.");
    };

    return (
        <section className="py-24 px-6 lg:px-12 bg-background-light dark:bg-background-dark">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

                {/* Text Side */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="order-2 lg:order-1 space-y-6"
                >
                    <span className="text-primary font-bold uppercase tracking-widest text-sm">Mi Misión</span>
                    <h2 className="text-3xl lg:text-4xl font-display font-semibold text-gray-900 dark:text-white">
                        Rediseñamos las condiciones internas
                    </h2>
                    <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-400">
                        <p>
                            Rediseñamos y transformamos las condiciones internas de individuos, parejas, familias y equipos que, por diversos factores, han sufrido adversidad psicológica y emocional.
                        </p>
                        <p>
                            Cambiamos, potenciamos y redefinimos los resultados de vida, profesionales y de productividad de aquellos que participan de nuestro sistema de acompañamiento y rediseño.
                        </p>
                    </div>
                </motion.div>

                {/* Form Side */}
                <motion.div
                    id="contact"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="order-1 lg:order-2 bg-white dark:bg-surface-dark p-8 lg:p-10 rounded-3xl shadow-2xl relative border border-gray-100 dark:border-gray-700"
                >
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl pointer-events-none" />

                    <h3 className="text-2xl font-display font-bold mb-2 text-gray-900 dark:text-white">Agenda tu sesión</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm">Da el primer paso hacia tu transformación hoy mismo.</p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Nombre</label>
                                <input
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="Tu nombre"
                                    className="w-full bg-gray-50 dark:bg-[#1a1816] border border-gray-200 dark:border-gray-700 rounded-md px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Email</label>
                                <input
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    type="email"
                                    placeholder="correo@ejemplo.com"
                                    className="w-full bg-gray-50 dark:bg-[#1a1816] border border-gray-200 dark:border-gray-700 rounded-md px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Tipo de Consulta</label>
                            <select
                                name="type"
                                value={formData.type}
                                onChange={handleChange}
                                className="w-full bg-gray-50 dark:bg-[#1a1816] border border-gray-200 dark:border-gray-700 rounded-md px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            >
                                <option>Coaching Individual</option>
                                <option>Terapia de Pareja</option>
                                <option>Consultoría Empresarial</option>
                                <option>Neuro-Bienestar</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">Fecha Preferida</label>
                            <input
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                type="date"
                                className="w-full bg-gray-50 dark:bg-[#1a1816] border border-gray-200 dark:border-gray-700 rounded-md px-4 py-2 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                        </div>
                        <button type="submit" className="w-full bg-secondary hover:bg-opacity-90 text-white font-bold py-3 rounded-md transition-all shadow-md mt-2">
                            Solicitar Cita
                        </button>
                        <p className="text-xs text-center text-gray-400 mt-4">
                            *Nos pondremos en contacto contigo para confirmar la disponibilidad.
                        </p>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default ContactForm;
