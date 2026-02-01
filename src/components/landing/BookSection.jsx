import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ShoppingCart } from 'lucide-react';

const BookSection = () => {
    return (
        <section id="book" className="py-24 relative overflow-hidden bg-surface-light dark:bg-[#221f1d]">
            {/* Background Element */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform translate-x-20 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Book Cover 3D Effect */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 flex justify-center"
                    >
                        <div className="relative group perspective-1000">
                            <div className="absolute inset-0 bg-primary rounded-lg blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
                            <motion.img
                                whileHover={{ rotateY: 0, rotateZ: 0, scale: 1.05 }}
                                style={{ transformStyle: "preserve-3d", transform: "rotateY(-5deg) rotateZ(-2deg)" }}
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4gMLTw8fl5PfvAf3CSe_V8gFXa3prl6zCvjo3Af35WC5A06cAsHejISShUvLJ46dFmbzvQeTKBe-NOtovc6FS9RkVyOcJaKIPrSZuOZb_Gw14Ia1GrHCIunNhwbEiLTdf3QqtxgI-454-WfyxjHGbyvLNFtbkgTg-8YQLM85yv6VugdP50oaacjm5rDlLUZnjeq8tB-NxHQTmdFN0M-x1FMd6Lx4Ixr3a7lXQ_295k0ag7KZCKMv80r7ypBa38fq8sXdC3uIuFJU"
                                alt="El Reino de lo Posible Book Cover"
                                className="relative rounded-lg shadow-2xl w-64 lg:w-80 transition-all duration-500 z-10 border-4 border-white dark:border-gray-700"
                            />
                            <div className="absolute -bottom-10 -right-10 bg-white dark:bg-surface-dark p-4 rounded-full shadow-lg z-20">
                                <span className="font-display font-bold text-primary text-xl">Best Seller</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content */}
                    <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
                        <div>
                            <span className="text-primary font-bold uppercase tracking-widest text-sm">Nuevo Lanzamiento</span>
                            <h2 className="text-4xl lg:text-6xl font-display font-semibold text-gray-900 dark:text-white mt-2 mb-6">
                                El Reino de lo Posible
                            </h2>
                        </div>
                        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                            "El Reino de lo posible" es un manual para iniciar procesos de cambio psicoespirituales. La autora nos conduce de una forma creativa por diferentes rutas para la toma de conciencia de nuestras distorsiones en la percepción propia y del mundo.
                        </p>

                        <ul className="space-y-3 text-left max-w-md mx-auto lg:mx-0">
                            {["Herramientas prácticas para el día a día.", "Ejercicios de introspección profunda.", "Enfoque psicoespiritual único."].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle className="text-primary mt-1" size={20} />
                                    <span className="text-gray-600 dark:text-gray-400">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <a href="#" className="bg-gray-900 dark:bg-white dark:text-black text-white px-8 py-3 rounded-md font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors shadow-lg">
                                <ShoppingCart size={20} />
                                Comprar en Amazon
                            </a>
                            <a href="#" className="px-8 py-3 rounded-md font-semibold text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-primary hover:text-primary transition-colors">
                                Leer primer capítulo
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BookSection;
