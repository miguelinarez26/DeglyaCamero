import bookCover3D from '../../assets/brand/book-cover-3d.png';
import { motion } from 'framer-motion';
import { CheckCircle, ShoppingCart } from 'lucide-react';

const BookSection = () => {
    return (
        <section id="book" className="py-24 relative overflow-hidden bg-transparent transition-colors">
            {/* Background Element */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[#F4EFE6] -skew-x-12 transform translate-x-20 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Book Cover (Interactive 3D) */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 flex justify-center items-center"
                        style={{ perspective: '1500px' }}
                    >
                        <div
                            className="group relative w-64 lg:w-80 aspect-[1/1.5] cursor-pointer transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] hover:rotate-x-[5deg] hover:-rotate-y-[15deg] hover:translate-x-12 z-10"
                            style={{ transformStyle: 'preserve-3d' }}
                        >

                            {/* Back Cover & Pages Base */}
                            <div
                                className="absolute inset-0 bg-[#F5F2EC] rounded-r-xl shadow-[10px_10px_20px_rgba(0,0,0,0.3)] transition-all duration-1000 group-hover:shadow-[20px_20px_40px_rgba(0,0,0,0.4)]"
                                style={{ transform: 'translateZ(-20px)', transformStyle: 'preserve-3d' }}
                            >
                                {/* The Page edges (right side) */}
                                <div className="absolute right-0 top-1 bottom-1 w-6 bg-gradient-to-r from-stone-200 to-stone-100 rounded-r-sm origin-left translate-x-full" style={{ transform: 'translateZ(10px)' }}>
                                    {/* Lineas simulando paginas */}
                                    <div className="w-full h-full bg-[repeating-linear-gradient(transparent,transparent_2px,rgba(0,0,0,0.05)_2px,rgba(0,0,0,0.05)_3px)] opacity-50"></div>
                                </div>

                                {/* Content on the first page inside */}
                                <div className="absolute inset-y-1 inset-x-1 bg-white rounded-r-lg shadow-inner opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-200 overflow-hidden">
                                    {/* Shadow from spine */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-transparent pointer-events-none z-10"></div>
                                    {/* Right half of the spread (Zoom ajustado para esconder los márgenes reales de la foto y alinear el centro) */}
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            backgroundImage: `url(${import.meta.env.BASE_URL}images/capitulo1.jpg)`,
                                            backgroundSize: '200% 100%',
                                            backgroundPosition: '100% 50%',
                                            filter: 'contrast(1.2) brightness(1.05) grayscale(0.2)'
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Spine */}
                            <div
                                className="absolute left-0 top-0 bottom-0 w-6 bg-[#E0E0E0] origin-right transition-colors duration-1000 group-hover:bg-[#CFCFCF] border-r border-black/5 flex items-center justify-center overflow-hidden"
                                style={{ transform: 'translateX(-100%) rotateY(-90deg)' }}
                            >
                                <span className="transform -rotate-90 whitespace-nowrap text-stone-500 text-[10px] font-bold tracking-widest uppercase opacity-70">El Reino de lo Posible</span>
                            </div>

                            {/* Front Cover Container (Opens like a door) */}
                            <div
                                className="absolute inset-0 origin-left transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-rotate-y-[150deg] z-20"
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                {/* Front Cover - Front Face */}
                                <div className="absolute inset-0 w-full h-full overflow-hidden rounded-r-xl shadow-[inset_4px_0_10px_rgba(0,0,0,0.1),2px_0_5px_rgba(0,0,0,0.1)] bg-white" style={{ backfaceVisibility: 'hidden' }}>
                                    <img src={import.meta.env.BASE_URL + "images/deglya_camero_portada.jpg"} alt="El Reino de lo Posible Book Cover" className="w-full h-full object-cover" />
                                    {/* Lighting overlay for realism */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
                                </div>

                                {/* Front Cover - Back Face (Inside Cover) */}
                                <div
                                    className="absolute inset-0 w-full h-full bg-[#E5E5E5] rounded-l-xl border-l-4 border-[#C0C0C0] shadow-inner"
                                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                                >
                                    <div className="absolute inset-y-1 inset-x-1 rounded-l-lg overflow-hidden">
                                        {/* Left half of the spread */}
                                        <div
                                            className="absolute inset-0 z-0"
                                            style={{
                                                backgroundImage: `url(${import.meta.env.BASE_URL}images/capitulo1.jpg)`,
                                                backgroundSize: '200% 100%',
                                                backgroundPosition: '0% 50%'
                                            }}
                                        />
                                        {/* Spine crease shadow (on the right for the left page) */}
                                        <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-black/20 to-transparent z-10 pointer-events-none" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 space-y-8 text-center lg:text-left"
                    >
                        <div>
                            <span className="font-bold uppercase tracking-widest text-sm text-gradient-wellness mb-2 block">
                                Nuevo Lanzamiento
                            </span>
                            <h2 className="text-4xl lg:text-6xl font-display font-medium text-primary mt-2 mb-6">
                                El Reino de lo Posible
                            </h2>
                            {/* Decorative divider matching the subtle aesthetic */}
                            <div className="w-16 h-[2px] bg-conversion/40 mx-auto lg:mx-0 mb-6"></div>
                        </div>
                        <p className="text-lg text-primary/80 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light">
                            "El Reino de lo posible" es un manual para iniciar procesos de cambio psicoespirituales. La autora nos conduce de una forma creativa por diferentes rutas para la toma de conciencia de nuestras distorsiones en la percepción propia y del mundo.
                        </p>

                        <ul className="space-y-4 text-left max-w-md mx-auto lg:mx-0">
                            {["Herramientas prácticas para el día a día.", "Ejercicios de introspección profunda.", "Enfoque psicoespiritual único."].map((item, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                                    className="flex items-start gap-4"
                                >
                                    <div className="mt-1 bg-conversion/10 p-1 rounded-full text-conversion">
                                        <CheckCircle size={16} strokeWidth={3} />
                                    </div>
                                    <span className="text-primary/70 font-medium">{item}</span>
                                </motion.li>
                            ))}
                        </ul>

                        <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <a href="#" className="btn-wellness px-8 py-3 rounded-full transform hover:scale-105 flex items-center justify-center gap-2 shadow-[0_8px_20px_-6px_rgba(217,107,47,0.4)]">
                                <ShoppingCart size={20} />
                                Comprar en Amazon
                            </a>
                            <a href="#" className="flex justify-center items-center px-8 py-3 rounded-full transform hover:scale-105 font-semibold text-conversion border border-conversion/30 hover:bg-gradient-to-r hover:from-[#D96B2F] hover:to-[#D35355] hover:text-white hover:border-transparent transition-all duration-400 shadow-sm">
                                Leer primer capítulo
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>

        </section>
    );
};

export default BookSection;
