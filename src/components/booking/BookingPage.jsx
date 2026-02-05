import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, ChevronLeft, ChevronRight, Clock, DollarSign, MapPin, AlertCircle, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import heroGradient from '../../assets/hero-gradient.png';

const BookingPage = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());

    // Mock Availability Data
    const morningSlots = ['09:00 AM', '10:00 AM', '11:00 AM'];
    const afternoonSlots = ['02:00 PM', '03:00 PM', '04:00 PM'];

    // Helper to check if date is today (for styling)
    const isToday = (day) => {
        const today = new Date();
        return day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();
    };

    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

    const handleDateClick = (day) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(newDate);
        setSelectedTime(null);
    };

    const isSelected = (day) => {
        return selectedDate &&
            selectedDate.getDate() === day &&
            selectedDate.getMonth() === currentDate.getMonth() &&
            selectedDate.getFullYear() === currentDate.getFullYear();
    };

    // Simulated "booked" logic
    const checkIsBooked = (time) => {
        if (!selectedDate) return false;
        // Mock: 10AM on the 15th is booked
        return selectedDate.getDate() === 15 && time === '10:00 AM';
    }

    const activeSelector = (isActive) => (
        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${isActive ? 'border-stone-900' : 'border-stone-300'}`}>
            {isActive && <div className="w-2 h-2 bg-stone-900 rounded-full" />}
        </div>
    );

    // Lamp Component (Inline for BookingPage)
    const Lamp = () => (
        <motion.div
            layoutId="lamp-booking"
            className="absolute inset-0 w-full bg-yellow-400/5 rounded-full -z-10"
            initial={false}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
            }}
        >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-yellow-400 rounded-t-full">
                <div className="absolute w-12 h-6 bg-yellow-400/20 rounded-full blur-md -top-2 -left-2" />
                <div className="absolute w-8 h-6 bg-yellow-400/20 rounded-full blur-md -top-1" />
                <div className="absolute w-4 h-4 bg-yellow-400/20 rounded-full blur-sm top-0 left-2" />
            </div>
        </motion.div>
    );


    return (
        <div
            className="flex flex-col h-screen overflow-hidden text-stone-700 font-sans transition-colors duration-300"
            style={{
                backgroundImage: `url(${heroGradient})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center justify-center p-4 sm:px-6 lg:px-8 h-full bg-white/30 backdrop-blur-[2px]">

                {/* Top Section: Title & Zone info + INICIO BUTTON */}
                <div className="w-full max-w-7xl mb-4 animate-in fade-in slide-in-from-top-4 duration-700 flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-structure leading-tight mb-1">Selecciona Fecha y Hora</h2>
                        <p className="text-stone-700 font-medium text-sm flex items-center gap-2">
                            <MapPin size={16} className="text-conversion" />
                            Zona Horaria: America/Caracas (VET)
                        </p>
                    </div>

                    {/* INICIO BUTTON - MOVED TO HEADER & STYLED LIKE NAVBAR */}
                    <Link
                        to="/"
                        className="relative px-6 py-2 flex items-center justify-center"
                    >
                        <span className="text-sm font-bold text-stone-900 relative z-10 uppercase tracking-widest">Inicio</span>
                        <Lamp />
                    </Link>
                </div>

                <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch h-[calc(100vh-140px)] max-h-[700px]">
                    {/* LEFT PANEL: Service Info */}
                    <div className="lg:col-span-3 h-full animate-in fade-in slide-in-from-left-4 duration-500 delay-100 hidden lg:block">
                        <div className="bg-white/80 backdrop-blur-md rounded-[2rem] shadow-lg border border-stone-100/50 p-6 h-full flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 bg-structure/5 rounded-full flex items-center justify-center mb-4 text-structure">
                                    <Clock size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-structure font-display mb-2">Duración</h3>
                                <p className="text-stone-600 mb-6">50 Minutos</p>

                                <div className="w-full h-px bg-stone-100 mb-6"></div>

                                <div className="w-12 h-12 bg-conversion/10 rounded-full flex items-center justify-center mb-4 text-conversion">
                                    <DollarSign size={24} />
                                </div>
                                <h3 className="text-xl font-bold text-structure font-display mb-2">Inversión</h3>
                                <p className="text-stone-600">$80.00 USD</p>
                            </div>
                            <div className="mt-8 bg-stone-50 p-4 rounded-xl border border-stone-200/50">
                                <div className="flex gap-2 items-start text-stone-500 text-xs italic">
                                    <Quote size={12} className="shrink-0 mt-1" />
                                    <p>"Tu transformación comienza con una decisión."</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* CENTER PANEL: Interactive Calendar */}
                    <div className="lg:col-span-6 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
                        <div className="bg-white/90 backdrop-blur-md rounded-[2.5rem] shadow-xl p-6 lg:p-8 border border-stone-100/50 h-full flex flex-col relative overflow-hidden">
                            {/* Decorative bg elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50 pointer-events-none"></div>

                            <div className="flex items-center justify-between mb-6 relative z-10">
                                <button onClick={prevMonth} className="p-2 hover:bg-stone-100 rounded-full text-stone-400 hover:text-structure transition-colors cursor-pointer">
                                    <ChevronLeft size={24} />
                                </button>
                                <h3 className="text-2xl font-bold text-structure font-display capitalize">
                                    {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                                </h3>
                                <button onClick={nextMonth} className="p-2 hover:bg-stone-100 rounded-full text-stone-400 hover:text-structure transition-colors cursor-pointer">
                                    <ChevronRight size={24} />
                                </button>
                            </div>

                            <div className="grid grid-cols-7 mb-2 text-center relative z-10">
                                {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
                                    <div key={day} className="text-[10px] font-bold text-stone-300 uppercase tracking-widest py-2">{day}</div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 gap-y-2 gap-x-1 flex-grow overflow-hidden relative z-10 content-start">
                                {/* Empty cells */}
                                {[...Array(firstDay)].map((_, i) => (
                                    <div key={`empty-${i}`} className="aspect-square"></div>
                                ))}

                                {/* Days */}
                                {[...Array(daysInMonth)].map((_, i) => {
                                    const day = i + 1;
                                    const active = isSelected(day);
                                    const today = isToday(day);

                                    return (
                                        <div key={day} className="aspect-square flex items-center justify-center">
                                            <button
                                                onClick={() => handleDateClick(day)}
                                                className={`w-full h-full max-w-[3rem] max-h-[3rem] rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 cursor-pointer
                                                ${active ? 'bg-conversion text-stone-900 font-bold shadow-lg shadow-conversion/30 scale-100' :
                                                        today ? 'border-2 border-conversion text-conversion font-bold' :
                                                            'text-stone-500 hover:bg-stone-50 hover:text-structure'
                                                    }`}>
                                                {day}
                                            </button>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL: Time Selection */}
                    <div className="lg:col-span-3 flex flex-col h-full gap-4 animate-in fade-in slide-in-from-right-4 duration-500 delay-300">

                        {/* OLD INICIO BUTTON REMOVED (Now in Header) */}

                        <div className={`bg-white/90 backdrop-blur-md rounded-[2rem] shadow-lg border border-stone-100/50 flex flex-col flex-grow overflow-hidden transition-all duration-500 ${selectedDate ? 'opacity-100' : 'opacity-80 grayscale-[0.5]'}`}>
                            <div className="p-5 border-b border-stone-100 bg-stone-50/50">
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-1">Disponibilidad</h4>
                                <p className="text-lg font-display font-bold text-stone-700 capitalize">
                                    {selectedDate ? selectedDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric' }) : 'Selecciona un día'}
                                </p>
                            </div>

                            <div className="flex-grow p-4 overflow-y-auto space-y-2 custom-scrollbar">
                                <div className="text-[10px] font-bold text-stone-300 uppercase tracking-widest mb-1">Mañana</div>
                                {morningSlots.map(time => {
                                    const booked = checkIsBooked(time);
                                    return (
                                        <button
                                            key={time}
                                            onClick={() => !booked && setSelectedTime(time)}
                                            disabled={booked}
                                            className={`w-full py-3 px-4 rounded-xl border transition-all text-xs font-bold flex justify-between group items-center cursor-pointer
                                            ${booked
                                                    ? 'bg-stone-50 text-stone-300 border-transparent cursor-not-allowed'
                                                    : selectedTime === time
                                                        ? 'bg-conversion text-stone-900 border-conversion shadow-md'
                                                        : 'border-stone-100 hover:border-conversion hover:text-stone-900 bg-white'
                                                }`}>
                                            <span className={booked ? 'line-through' : ''}>{time}</span>
                                            {!booked && activeSelector(selectedTime === time)}
                                        </button>
                                    );
                                })}

                                <div className="mt-4 mb-1 text-[10px] font-bold text-stone-300 uppercase tracking-widest">Tarde</div>
                                {afternoonSlots.map(time => {
                                    const booked = time === '04:00 PM';
                                    return (
                                        <button
                                            key={time}
                                            onClick={() => !booked && setSelectedTime(time)}
                                            disabled={booked}
                                            className={`w-full py-3 px-4 rounded-xl border transition-all text-xs font-bold flex justify-between group items-center cursor-pointer
                                            ${booked
                                                    ? 'bg-stone-50 text-stone-300 border-transparent cursor-not-allowed'
                                                    : selectedTime === time
                                                        ? 'bg-conversion text-stone-900 border-conversion shadow-md'
                                                        : 'border-stone-100 hover:border-conversion hover:text-stone-900 bg-white'
                                                }`}>
                                            <span className={booked ? 'line-through' : ''}>{time}</span>
                                            {!booked && activeSelector(selectedTime === time)}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Continue Button */}
                            <div className="p-5 border-t border-stone-100 bg-white">
                                <button
                                    onClick={() => selectedDate && selectedTime && navigate('/checkout')}
                                    disabled={!selectedDate || !selectedTime}
                                    className={`w-full py-4 text-sm font-bold uppercase tracking-widest rounded-full transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer
                                    ${selectedDate && selectedTime
                                            ? 'bg-structure text-white hover:bg-stone-800 hover:scale-[1.02] active:scale-[0.98]'
                                            : 'bg-stone-200 text-stone-400 cursor-not-allowed'}`}
                                >
                                    <span>Continuar</span>
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default BookingPage;
