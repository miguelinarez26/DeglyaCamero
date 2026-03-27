import React, { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { useUIStore } from "../../lib/uiStore";
import { Menu, MenuItem, ProductItem } from "../ui/NavbarMenu";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { SERVICES_DATA } from "../../data/services";
import { User } from "lucide-react";

export default function Navbar({ className }) {
    const { openBookingModal } = useUIStore();
    const [active, setActive] = useState(null);
    const location = useLocation();
    const [hoveredTab, setHoveredTab] = useState(null);
    
    // INDUSTRIAL-GRADE PATH MATCHING (Literal URL checking)
    const currentUrl = window.location.href.toLowerCase();
    const isAbout = currentUrl.includes('about');
    const isServices = currentUrl.includes('servicios');
    const isReino = currentUrl.includes('reino') || currentUrl.includes('book');
    const isPortal = currentUrl.includes('portal') || currentUrl.includes('login') || currentUrl.includes('dashboard');

    // Filter showcased services
    const personaServices = SERVICES_DATA.filter(s => s.category === 'personas').slice(0, 2);
    const companyServices = SERVICES_DATA.filter(s => s.category === 'empresas').slice(0, 2);

    // Lamp Component
    const Lamp = ({ id = "lamp" }) => (
        <motion.div
            layoutId={id}
            className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#D96B2F]/15 to-[#D35355]/15 rounded-full -z-10 shadow-[inner_0_0_10px_rgba(217,107,47,0.05)] border border-[#D96B2F]/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
    );

    return (
        <div
            className={cn(
                "fixed bottom-6 sm:top-6 sm:bottom-auto left-1/2 -translate-x-1/2 z-50",
                className
            )}
        >
            <Menu setActive={setActive}>

                {/* 1. Logo / Inicio */}
                <Link
                    to="/"
                    onMouseEnter={() => setActive(null)}
                    className="relative px-2 py-1 flex items-center justify-center pr-4 shrink-0"
                >
                    <img
                        src={import.meta.env.BASE_URL + "images/logo4.png"}
                        alt="Deglya Camero"
                        className="h-20 -my-2 w-auto object-contain cursor-pointer relative z-10 scale-[1.1] origin-left shrink-0"
                    />
                </Link>

                {/* 2. Quiénes Somos */}
                <Link
                    to="/about"
                    onMouseEnter={() => { setActive(null); setHoveredTab('Quiénes Somos'); }}
                    onMouseLeave={() => setHoveredTab(null)}
                    className="relative px-3 py-2 rounded-full transition-colors"
                >
                    <span className={cn(
                        "text-sm transition-all duration-300 relative z-10 whitespace-nowrap",
                        (isAbout || hoveredTab === 'Quiénes Somos') ? "text-structure font-bold" : "text-stone-500 font-medium hover:text-structure"
                    )}>
                        Quiénes Somos
                    </span>
                    {(isAbout || hoveredTab === 'Quiénes Somos') && <Lamp id="quienes_somos" />}
                </Link>

                {/* 3. Servicios (Dropdown) */}
                <div
                    className="relative px-2 py-2 flex items-center rounded-full"
                    onMouseEnter={() => setHoveredTab('Servicios')}
                    onMouseLeave={() => setHoveredTab(null)}
                >
                    <MenuItem 
                        setActive={setActive} 
                        active={active} 
                        item="Servicios" 
                        href="/servicios" 
                        isActiveTab={isServices || hoveredTab === 'Servicios'}
                    >
                        <div className="flex flex-col gap-6 p-2 w-[650px]">
                            {/* Inner content remains same */}
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <h5 className="text-sm font-bold text-stone-900 uppercase tracking-widest pl-2 border-l-2 border-conversion">Personas</h5>
                                    <div className="space-y-4">
                                        {personaServices.map(service => (
                                            <ProductItem
                                                key={service.id}
                                                title={service.title}
                                                href="/servicios"
                                                src={service.image}
                                                description={service.shortDescription}
                                                imageClassName={service.imagePosition}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <h5 className="text-sm font-bold text-stone-900 uppercase tracking-widest pl-2 border-l-2 border-structure">Empresas</h5>
                                    <div className="space-y-4">
                                        {companyServices.map(service => (
                                            <ProductItem
                                                key={service.id}
                                                title={service.title}
                                                href="/servicios"
                                                src={service.image}
                                                description={service.shortDescription}
                                                imageClassName={service.imagePosition || ""}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end border-t border-stone-100 pt-3">
                                <Link to="/servicios" className="text-xs font-bold text-conversion hover:text-stone-900 transition-colors uppercase tracking-wider">
                                    Ver todo el catálogo &rarr;
                                </Link>
                            </div>
                        </div>
                    </MenuItem>
                    {(isServices || hoveredTab === 'Servicios') && (
                        <div className="absolute inset-0 -z-10 pointer-events-none">
                            <Lamp id="servicios" />
                        </div>
                    )}
                </div>

                {/* 4. El Reino */}
                <Link
                    to="/reino"
                    onMouseEnter={() => { setActive(null); setHoveredTab('El Reino'); }}
                    onMouseLeave={() => setHoveredTab(null)}
                    className="relative px-3 py-2 rounded-full transition-colors"
                >
                    <span className={cn(
                        "text-sm transition-all duration-300 relative z-10 whitespace-nowrap",
                        (isReino || hoveredTab === 'El Reino') ? "text-structure font-bold" : "text-stone-500 font-medium hover:text-structure"
                    )}>
                        El Reino
                    </span>
                    {(isReino || hoveredTab === 'El Reino') && <Lamp id="el_reino" />}
                </Link>

                {/* 5. Portal */}
                <Link
                    to="/login"
                    onMouseEnter={() => { setActive(null); setHoveredTab('Portal'); }}
                    onMouseLeave={() => setHoveredTab(null)}
                    className="relative px-3 py-2 rounded-full transition-colors"
                >
                    <span className={cn(
                        "text-sm transition-all duration-300 relative z-10 flex items-center justify-center gap-1.5 whitespace-nowrap",
                        (isPortal || hoveredTab === 'Portal') ? "text-structure font-bold" : "text-stone-500 font-medium hover:text-structure"
                    )}>
                        <User className="w-4 h-4" /> Portal
                    </span>
                    {(isPortal || hoveredTab === 'Portal') && <Lamp id="portal" />}
                </Link>

                {/* CTA Button - NOW TRIGGERS MODAL */}
                <button
                    onClick={() => {
                        setActive(null);
                        openBookingModal();
                    }}
                    onMouseEnter={() => setActive(null)}
                    className="btn-wellness text-sm px-6 py-2 rounded-full shadow-sm hover:shadow-md transform hover:scale-105 cursor-pointer"
                >
                    Agendar
                </button>
            </Menu>
        </div>
    );
}
