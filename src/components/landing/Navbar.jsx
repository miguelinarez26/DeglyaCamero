import React, { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { useUIStore } from "../../lib/uiStore";
import { Menu, MenuItem, ProductItem } from "../ui/NavbarMenu";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { SERVICES_DATA } from "../../data/services";

export default function Navbar({ className }) {
    const { openBookingModal } = useUIStore();
    const [active, setActive] = useState(null);
    const location = useLocation();
    const [activeTab, setActiveTab] = useState("/");

    useEffect(() => {
        // Map paths to tab names/keys
        const path = location.pathname;
        if (path === '/') setActiveTab('Inicio');
        else if (path === '/about') setActiveTab('Quiénes Somos');
        else if (path.includes('/servicios')) setActiveTab('Servicios');
        else if (path === '/reino') setActiveTab('El Reino');
        else setActiveTab('');
    }, [location]);

    // Filter showcased services
    const personaServices = SERVICES_DATA.filter(s => s.category === 'personas').slice(0, 2);
    const companyServices = SERVICES_DATA.filter(s => s.category === 'empresas').slice(0, 2);

    // Lamp Component
    const Lamp = () => (
        <motion.div
            layoutId="lamp"
            className="absolute inset-0 w-full bg-conversion/10 rounded-full -z-10"
            initial={false}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
            }}
        >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-conversion rounded-t-full">
                <div className="absolute w-12 h-6 bg-conversion/20 rounded-full blur-md -top-2 -left-2" />
                <div className="absolute w-8 h-6 bg-conversion/20 rounded-full blur-md -top-1" />
                <div className="absolute w-4 h-4 bg-conversion/20 rounded-full blur-sm top-0 left-2" />
            </div>
        </motion.div>
    );

    return (
        <div
            className={cn(
                "fixed bottom-6 sm:top-6 sm:bottom-auto left-1/2 -translate-x-1/2 z-50",
                className
            )}
        >
            <Menu setActive={setActive}>

                {/* 1. Inicio */}
                <Link
                    to="/"
                    onMouseEnter={() => setActive(null)}
                    className="relative px-4 py-2"
                >
                    <span className={cn(
                        "text-sm font-medium transition-colors relative z-10",
                        activeTab === 'Inicio' ? "text-structure font-bold" : "text-stone-500 hover:text-structure"
                    )}>
                        Inicio
                    </span>
                    {activeTab === 'Inicio' && <Lamp />}
                </Link>

                {/* 2. Quiénes Somos */}
                <Link
                    to="/about"
                    onMouseEnter={() => setActive(null)}
                    className="relative px-4 py-2"
                >
                    <span className={cn(
                        "text-sm font-medium transition-colors relative z-10",
                        activeTab === 'Quiénes Somos' ? "text-structure font-bold" : "text-stone-500 hover:text-structure"
                    )}>
                        Quiénes Somos
                    </span>
                    {activeTab === 'Quiénes Somos' && <Lamp />}
                </Link>

                {/* 3. Servicios (Dropdown) */}
                <div className="relative">
                    <MenuItem setActive={setActive} active={active} item="Servicios" href="/servicios">
                        <div className="flex flex-col gap-6 p-2 w-[650px]">
                            <div className="grid grid-cols-2 gap-8">
                                {/* Column 1: Personas */}
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

                                {/* Column 2: Empresas */}
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
                    {/* Explicit Lamp for the MenuItem Container if active */}
                    {activeTab === 'Servicios' && (
                        <div className="absolute inset-0 -z-10 pointer-events-none">
                            <Lamp />
                        </div>
                    )}
                </div>

                {/* 4. El Reino */}
                <Link
                    to="/reino"
                    onMouseEnter={() => setActive(null)}
                    className="relative px-4 py-2"
                >
                    <span className={cn(
                        "text-sm font-medium transition-colors relative z-10",
                        activeTab === 'El Reino' ? "text-structure font-bold" : "text-stone-500 hover:text-structure"
                    )}>
                        El Reino
                    </span>
                    {activeTab === 'El Reino' && <Lamp />}
                </Link>

                {/* CTA Button - NOW TRIGGERS MODAL */}
                <button
                    onClick={() => {
                        setActive(null);
                        openBookingModal();
                    }}
                    onMouseEnter={() => setActive(null)}
                    className="bg-conversion hover:bg-opacity-90 text-white text-sm font-bold px-5 py-2 rounded-full shadow-sm hover:shadow-md transition-all transform hover:scale-105 cursor-pointer"
                >
                    Agendar
                </button>
            </Menu>
        </div>
    );
}
