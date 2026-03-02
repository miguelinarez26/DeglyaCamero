import React from 'react';

const teamMembers = [
    {
        name: "Deglya Camero",
        role: "Fundadora & Coach",
        tags: "Terapia integrativa, Coaching ejecutivo",
        img: "https://yqmqzyaqlhgzcbcbintn.supabase.co/storage/v1/object/public/Imagenes%20Deglya%20web/Especialistas/Deglya-6%20(1).jpg",
        rotation: "-rotate-2",
        bgColor: "bg-[#A2C4C9]", // Serene Blue
        bio: "Con más de 15 años de experiencia transformando vidas, Deglya combina la psicología clínica con herramientas de coaching de alto impacto. Su pasión es guiar a individuos y líderes hacia su versión más auténtica y plena."
    },
    {
        name: "Ana Garcia",
        role: "Psicóloga Clínica",
        tags: "Ansiedad, Depresión, Trauma",
        img: "https://yqmqzyaqlhgzcbcbintn.supabase.co/storage/v1/object/public/Imagenes%20Deglya%20web/Especialistas/especialista%202.jpg",
        rotation: "rotate-1",
        bgColor: "bg-[#F1E4C3]", // Warm Sand
        bio: "Ana ofrece un espacio seguro y sin juicios para abordar la ansiedad y el trauma. Su enfoque gentil pero profundo ayuda a los pacientes a sanar heridas emocionales y reconstruir su paz interior."
    },
    {
        name: "Zuri Méndez",
        role: "Terapeuta Familiar",
        tags: "Terapia de pareja, Mediación",
        img: "https://yqmqzyaqlhgzcbcbintn.supabase.co/storage/v1/object/public/Imagenes%20Deglya%20web/Especialistas/Lic.%20Zurisaday%20Cordero.jpg",
        rotation: "-rotate-1",
        bgColor: "bg-[#C97D60]", // Terracotta
        position: "object-top",
        bio: "Especialista en dinámicas relacionales, Zuri facilita la comunicación y la reconexión en parejas y familias. Su método práctico y empático convierte los conflictos en oportunidades de unión."
    },
    {
        name: "Francirys López",
        role: "Especialista en Bienestar",
        tags: "Mindfulness, Gestión del estrés",
        img: "https://yqmqzyaqlhgzcbcbintn.supabase.co/storage/v1/object/public/Imagenes%20Deglya%20web/Especialistas/Lic.%20Francirys%20Vargas.jpg",
        rotation: "rotate-2",
        bgColor: "bg-[#D4E2D4]", // Sage Green
        position: "object-top",
        bio: "Francirys integra el mindfulness en la vida diaria para combatir el estrés. Sus sesiones te enseñarán a vivir con mayor presencia, calma y equilibrio emocional."
    }
];

const TeamModal = ({ member, onClose }) => {
    if (!member) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-300"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-xl relative animate-in zoom-in-95 duration-300 pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-50 p-2 bg-white/70 hover:bg-white rounded-full transition-all cursor-pointer shadow-md"
                    aria-label="Cerrar modal"
                >
                    <svg className="w-5 h-5 text-stone-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="grid md:grid-cols-2">
                    <div className={`relative h-64 md:h-auto ${member.bgColor}/20`}>
                        <img
                            src={member.img}
                            alt={member.name}
                            className={`w-full h-full object-cover ${member.position || 'object-center'}`}
                        />
                    </div>
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                        <div>
                            <span className="inline-block px-3 py-1 bg-booking-primary/5 text-booking-primary text-xs font-bold uppercase tracking-wider rounded-full mb-4">
                                {member.role}
                            </span>
                            <h3 className="font-display text-3xl font-bold text-stone-800 mb-2">{member.name}</h3>
                            <p className="text-stone-500 italic mb-6 text-sm flex items-center gap-2">
                                <span className="w-8 h-[1px] bg-booking-secondary"></span>
                                {member.tags}
                            </p>
                            <p className="text-stone-600 leading-relaxed">
                                {member.bio}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const OurTeam = () => {
    const [selectedMember, setSelectedMember] = React.useState(null);

    return (
        <section className="py-24 bg-[#D4E2D4]/10 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <h2 className="font-display text-3xl md:text-5xl text-booking-primary font-bold">Nuestro Equipo</h2>
                    <p className="mt-4 text-deglya-wood/80 max-w-2xl mx-auto text-lg">Profesionales unidos por la pasión de servir y acompañar.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 lg:gap-8">
                    {teamMembers.map((member, i) => (
                        <div
                            key={i}
                            className={`flex flex-col group cursor-pointer rounded-[2.5rem] p-6 lg:p-6 transition-all duration-500 bg-[#F4EFE6] shadow-sm hover:shadow-lg relative overflow-hidden`}
                            onClick={() => setSelectedMember(member)}
                        >
                            {/* Gradient Hover Background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-[#D96B2F] to-[#D35355] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"></div>

                            <div className="mb-6 text-left relative z-10 flex flex-col justify-start transition-colors duration-500">
                                <h3 className="font-display text-2xl lg:text-3xl font-bold text-stone-800 group-hover:text-white transition-colors duration-500 mb-1 leading-tight">{member.name}</h3>
                                <p className="text-conversion group-hover:text-white/90 transition-colors duration-500 text-xs font-bold mt-2 uppercase tracking-wide">{member.role}</p>
                            </div>
                            <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden mt-auto z-10">
                                <img
                                    alt={member.name}
                                    className={`w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.12] ${member.position || 'object-center'}`}
                                    src={member.img}
                                />
                                {/* Overlay / CTA */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 z-10 pointer-events-none">
                                    <span className="bg-white/95 text-stone-800 text-xs font-bold px-6 py-2.5 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.15)] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] tracking-widest uppercase">
                                        Ver Perfil
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal */}
            {selectedMember && (
                <TeamModal
                    member={selectedMember}
                    onClose={() => setSelectedMember(null)}
                />
            )}
        </section>
    );
};

export default OurTeam;
