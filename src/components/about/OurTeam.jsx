import React, { useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const teamMembers = [
    {
        name: "Deglya Camero",
        role: "Coach de vida, vocacional y ocupacional. Psicoterapeuta EMDR Certificada",
        tags: "CEO y Fundadora",
        img: import.meta.env.BASE_URL + "images/Deglya-6.jpg",
        rotation: "-rotate-2",
        bgColor: "bg-[#A2C4C9]", // Serene Blue
        position: "object-top",
        bio: "Coach de vida, vocacional y ocupacional. Psicoterapeuta EMDR Certificada. Especialista en reprogramación psicoespiritual y análisis de guiones de vida."
    },
    {
        name: "Ana Cristina Castañeda",
        role: "Psicoterapeuta EMDR adolescentes y adultos",
        tags: "Terapia presencial y online",
        img: import.meta.env.BASE_URL + "images/Lic. Ana Cristina Castañeda.jpg",
        rotation: "rotate-1",
        bgColor: "bg-[#F1E4C3]", // Warm Sand
        position: "object-top",
        bio: "Psicoterapeuta EMDR especialista en el trato y acompañamiento psicológico para adolescentes y adultos."
    },
    {
        name: "Zurisaday Cordero",
        role: "Psicoterapeuta EMDR Infantil y de adultos",
        tags: "Terapia presencial y online",
        img: import.meta.env.BASE_URL + "images/Lic. Zurisaday Cordero.jpg",
        rotation: "-rotate-1",
        bgColor: "bg-[#C97D60]", // Terracotta
        position: "object-top",
        bio: "Psicoterapeuta EMDR especialista en la intervención y acompañamiento clínico para población infantil y de adultos."
    },
    {
        name: "Francirys Vargas",
        role: "Psicoterapia de adolescentes y jóvenes adultos",
        tags: "Terapia presencial y online",
        img: import.meta.env.BASE_URL + "images/Lic. Francirys Vargas.jpg",
        rotation: "rotate-2",
        bgColor: "bg-[#D4E2D4]", // Sage Green
        position: "object-top",
        bio: "Especialista orientada a la psicoterapia integral y abordaje clínico para adolescentes y jóvenes adultos."
    },
    {
        name: "Lionel Sotillo",
        role: "Psiquiatra adolescentes y adultos",
        tags: "Atención médica y psiquiátrica",
        img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400", // Placeholder (until we have his photo)
        rotation: "-rotate-2",
        bgColor: "bg-[#DCC0A4]", // Soft Clay
        position: "object-top",
        bio: "Médico psiquiatra especializado en el diagnóstico y tratamiento clínico para adolescentes y adultos, integrando estrategias médicas con apoyo terapéutico integral."
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
    const [emblaRef, emblaApi] = useEmblaCarousel(
        {
            loop: true,
            align: "start",
            slidesToScroll: 1,
            breakpoints: {
                '(min-width: 1024px)': { slidesToScroll: 1 }
            }
        },
        [Autoplay({ delay: 3500, stopOnInteraction: false })]
    );

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    return (
        <section className="py-24 bg-[#D4E2D4]/10 relative">
            <div className="max-w-[90rem] mx-auto px-6">
                <div className="text-center mb-16 relative">
                    <h2 className="font-display text-4xl md:text-5xl text-booking-primary font-bold">Nuestro Equipo</h2>
                    <p className="mt-4 text-deglya-wood/80 max-w-2xl mx-auto text-lg">Profesionales unidos por la pasión de servir y acompañar.</p>

                    {/* Carousel Navigation Buttons */}
                    <div className="hidden md:flex justify-end gap-3 absolute right-0 bottom-0 top-0 items-end pb-2">
                        <button
                            onClick={scrollPrev}
                            className="p-3 w-12 h-12 rounded-full border border-booking-secondary/30 text-booking-secondary hover:bg-booking-secondary hover:text-white transition-all focus:outline-none"
                            aria-label="Anterior"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={scrollNext}
                            className="p-3 w-12 h-12 rounded-full border border-booking-secondary/30 text-booking-secondary hover:bg-booking-secondary hover:text-white transition-all focus:outline-none"
                            aria-label="Siguiente"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>

                <div className="relative">
                    <div className="overflow-hidden p-4 -m-4 cursor-grab active:cursor-grabbing" ref={emblaRef}>
                        <div className="flex -ml-6">
                            {teamMembers.map((member, i) => (
                                <div
                                    key={i}
                                    className="pl-6 min-w-0 flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%]"
                                >
                                    <div
                                        className={`flex flex-col group h-full cursor-pointer rounded-[2.5rem] p-6 lg:p-6 transition-all duration-500 bg-[#F4EFE6] shadow-sm hover:shadow-xl relative overflow-hidden transform hover:-translate-y-2`}
                                        onClick={() => setSelectedMember(member)}
                                    >
                                        {/* Gradient Hover Background */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#D96B2F] to-[#D35355] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 pointer-events-none"></div>

                                        <div className="mb-6 text-left relative z-10 flex flex-col justify-start transition-colors duration-500 min-h-[5rem]">
                                            <h3 className="font-display text-2xl lg:text-3xl font-bold text-stone-800 group-hover:text-white transition-colors duration-500 mb-1 leading-tight">{member.name}</h3>
                                            <p className="text-conversion group-hover:text-white/90 transition-colors duration-500 text-xs font-bold mt-2 uppercase tracking-wide">{member.role}</p>
                                        </div>
                                        <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden mt-auto z-10 shadow-inner">
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
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Mobile Navigation */}
                    <div className="flex md:hidden justify-center gap-4 mt-8">
                        <button onClick={scrollPrev} className="p-3 rounded-full bg-white shadow-md text-booking-secondary" aria-label="Anterior">
                            <ChevronLeft size={20} />
                        </button>
                        <button onClick={scrollNext} className="p-3 rounded-full bg-white shadow-md text-booking-secondary" aria-label="Siguiente">
                            <ChevronRight size={20} />
                        </button>
                    </div>
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
