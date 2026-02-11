import bookCover3D from '../../assets/brand/book-cover-3d.png';
import { motion } from 'framer-motion';
import { CheckCircle, ShoppingCart } from 'lucide-react';

const BookSection = () => {
    return (
        <section id="book" className="py-24 relative overflow-hidden bg-transparent transition-colors">
            {/* Background Element */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-structure/5 -skew-x-12 transform translate-x-20 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Book Cover (Simple Image) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 flex justify-center"
                    >
                        <motion.img
                            whileHover={{ scale: 1.05 }}
                            src={bookCover3D}
                            alt="El Reino de lo Posible Book Cover"
                            className="relative w-64 lg:w-96 h-auto object-contain z-10 drop-shadow-2xl"
                        />
                    </motion.div>

                    {/* Content */}
                    <div className="lg:w-1/2 space-y-8 text-center lg:text-left">
                        <div>
                            <span className="text-white/90 font-bold uppercase tracking-widest text-sm">Nuevo Lanzamiento</span>
                            <h2 className="text-4xl lg:text-6xl font-display font-semibold text-white mt-2 mb-6">
                                El Reino de lo Posible
                            </h2>
                        </div>
                        <p className="text-lg text-white/80 leading-relaxed">
                            "El Reino de lo posible" es un manual para iniciar procesos de cambio psicoespirituales. La autora nos conduce de una forma creativa por diferentes rutas para la toma de conciencia de nuestras distorsiones en la percepción propia y del mundo.
                        </p>

                        <ul className="space-y-3 text-left max-w-md mx-auto lg:mx-0">
                            {["Herramientas prácticas para el día a día.", "Ejercicios de introspección profunda.", "Enfoque psicoespiritual único."].map((item, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <CheckCircle className="text-white mt-1" size={20} />
                                    <span className="text-white/80">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <a href="#" className="bg-conversion text-stone-900 px-8 py-3 rounded-md font-semibold flex items-center justify-center gap-2 hover:brightness-110 transition-all shadow-lg">
                                <ShoppingCart size={20} />
                                Comprar en Amazon
                            </a>
                            <a href="#" className="px-8 py-3 rounded-md font-semibold text-white border border-white/30 hover:bg-white/10 hover:border-white transition-colors">
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
