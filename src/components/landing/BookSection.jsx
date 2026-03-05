import bookCover3D from '../../assets/brand/book-cover-3d.png';
import { motion } from 'framer-motion';
import { CheckCircle, ShoppingCart } from 'lucide-react';

const BookSection = () => {
    return (
        <section id="book" className="py-24 relative overflow-hidden">
            {/* Aesthetic Background Image with Parallax */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-fixed"
                style={{
                    backgroundImage: `url('${import.meta.env.BASE_URL}images/2.jpg')`,
                }}
            />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                {/* Main Container */}
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 relative">

                    {/* Book Cover (Interactive 3D) */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:w-1/2 flex justify-center items-center w-full z-20"
                        style={{ perspective: '1500px' }}
                    >
                        {/* Book wrapper with floating animation */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
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
                        </motion.div>
                    </motion.div>

                    {/* Content Glassmorphism Box */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:w-1/2 space-y-6 text-center lg:text-left z-10 bg-white/50 backdrop-blur-md border border-white/60 p-6 lg:p-10 rounded-3xl shadow-2xl relative overflow-hidden"
                    >
                        {/* Decorative botanical touch from CSS inside the text box */}
                        <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-deglya-mustard/20 rounded-full blur-3xl pointer-events-none" />
                        <div className="absolute -top-20 -left-20 w-48 h-48 bg-deglya-teal/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="relative z-10">
                            <span className="font-bold uppercase tracking-widest text-xs lg:text-sm text-conversion mb-1 block drop-shadow-sm">
                                Nuevo Lanzamiento
                            </span>
                            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-display font-medium text-stone-800 mt-2 mb-4 drop-shadow-sm">
                                El Reino de lo Posible
                            </h2>
                            {/* Decorative divider matching the subtle aesthetic */}
                            <div className="w-12 h-[2px] bg-conversion/40 mx-auto lg:mx-0 mb-4 blur-[1px]"></div>
                        </div>
                        <p className="relative z-10 text-base lg:text-lg text-stone-700 leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium drop-shadow-sm">
                            "El Reino de lo posible" es un manual para iniciar procesos de cambio psicoespirituales. La autora nos conduce de una forma creativa por diferentes rutas para la toma de conciencia de nuestras distorsiones en la percepción propia y del mundo.
                        </p>

                        <ul className="relative z-10 space-y-3 text-left max-w-md mx-auto lg:mx-0">
                            {["Herramientas prácticas para el día a día.", "Ejercicios de introspección profunda.", "Enfoque psicoespiritual único."].map((item, i) => (
                                <motion.li
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 + (i * 0.1), duration: 0.5 }}
                                    className="flex items-center gap-3"
                                >
                                    <div className="bg-conversion/20 p-1 rounded-full text-conversion shadow-sm shrink-0">
                                        <CheckCircle size={14} strokeWidth={3} />
                                    </div>
                                    <span className="text-stone-800 font-bold text-sm lg:text-base drop-shadow-sm">{item}</span>
                                </motion.li>
                            ))}
                        </ul>

                        <div className="relative z-10 pt-4 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                            <a href="#" className="btn-wellness px-6 py-2.5 rounded-full transform hover:scale-105 flex items-center justify-center gap-2 shadow-[0_8px_20px_-6px_rgba(217,107,47,0.5)] bg-gradient-to-r from-[#D96B2F] to-[#D35355] text-white text-sm font-bold tracking-wide w-full sm:w-auto">
                                <ShoppingCart size={18} />
                                Comprar en Amazon
                            </a>
                            <a href="#" className="flex justify-center items-center px-6 py-2.5 rounded-full transform hover:scale-105 font-bold text-stone-800 text-sm border-2 border-stone-800 hover:bg-stone-800 hover:text-white transition-all duration-400 shadow-sm bg-white/40 backdrop-blur-sm w-full sm:w-auto">
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
