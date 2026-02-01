import React from 'react';

const teamMembers = [
    {
        name: "Deglya Camero",
        role: "Fundadora & Coach",
        tags: "Terapia integrativa, Coaching ejecutivo",
        img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop",
        rotation: "-rotate-2",
        bgColor: "bg-[#A2C4C9]" // Serene Blue
    },
    {
        name: "Ana Garcia",
        role: "Psicóloga Clínica",
        tags: "Ansiedad, Depresión, Trauma",
        img: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2576&auto=format&fit=crop",
        rotation: "rotate-1",
        bgColor: "bg-[#F1E4C3]" // Warm Sand
    },
    {
        name: "Zuri Méndez",
        role: "Terapeuta Familiar",
        tags: "Terapia de pareja, Mediación",
        img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2576&auto=format&fit=crop",
        rotation: "-rotate-1",
        bgColor: "bg-[#C97D60]" // Terracotta
    },
    {
        name: "Francirys López",
        role: "Especialista en Bienestar",
        tags: "Mindfulness, Gestión del estrés",
        img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2561&auto=format&fit=crop",
        rotation: "rotate-2",
        bgColor: "bg-[#D4E2D4]" // Sage Green
    }
];

const OurTeam = () => {
    return (
        <section className="py-20 bg-[#D4E2D4]/10 relative">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="font-display text-3xl md:text-4xl text-booking-primary font-bold">Nuestro Equipo</h2>
                    <p className="mt-4 text-deglya-wood/80 max-w-2xl mx-auto">Profesionales unidos por la pasión de servir y acompañar.</p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                    {teamMembers.map((member, i) => (
                        <div key={i} className="flex flex-col items-center text-center group">
                            <div className={`relative mb-6 transform transition-transform duration-500 hover:rotate-0 hover:scale-105 ${member.rotation}`}>
                                <div className={`w-36 h-48 md:w-44 md:h-56 ${member.bgColor}/40 rounded-xl p-1 shadow-sm`}>
                                    <div className={`w-full h-full bg-white rounded-lg overflow-hidden border border-white/40`}>
                                        <img
                                            alt={member.name}
                                            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                                            src={member.img}
                                        />
                                    </div>
                                </div>
                            </div>
                            <h3 className="font-display text-xl font-bold text-booking-primary">{member.name}</h3>
                            <p className="text-booking-secondary text-[10px] md:text-xs font-bold uppercase tracking-wider mt-1">{member.role}</p>
                            <p className="text-xs md:text-sm text-deglya-wood/70 mt-2 italic leading-tight">{member.tags}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurTeam;
