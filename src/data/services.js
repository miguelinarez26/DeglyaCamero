import { Heart, Compass, Users, Sparkles, Building2, Lightbulb } from 'lucide-react';

export const SERVICES_DATA = [
    {
        id: "initial-interview",
        title: "Entrevista Inicial",
        shortDescription: "Valoración diagnóstica para nuevos pacientes.",
        fullDescription: "Sesión obligatoria para nuevos pacientes. Realizamos una valoración diagnóstica integral para entender tus necesidades y asignarte el plan de tratamiento más adecuado.",
        features: ["valoración Diagnóstica", "Plan de Tratamiento", "Asignación de Especialista", "Modalidad Online"],
        icon: Users,
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2574&auto=format&fit=crop",
        category: "personas",
        price: "$50",
        cta: "Agendar Entrevista"
    },
    {
        id: "individual-therapy",
        title: "Terapia Individual",
        shortDescription: "Un espacio seguro para sanar y crecer.",
        fullDescription: "Sesiones personalizadas diseñadas para abordar ansiedad, depresión, duelo y procesos de transformación personal. Utilizamos un enfoque integrativo que combina técnicas clínicas probadas con una comprensión profunda del ser humano, proporcionando un entorno confidencial y empático.",
        features: ["Atención a Ansiedad y Depresión", "Manejo del Duelo", "Crecimiento Personal", "Modalidad Online o Presencial"],
        icon: Heart,
        image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=2574&auto=format&fit=crop",
        category: "personas",
        price: "$80 / sesión",
        cta: "Reservar Cita"
    },
    {
        id: "life-coaching",
        title: "Coaching de Vida",
        shortDescription: "Alcanza tus metas y vive con propósito.",
        fullDescription: "Un proceso dinámico enfocado en el futuro y la acción. Trabajamos juntos para clarificar tu visión, identificar obstáculos y diseñar un plan de acción concreto para alcanzar tus objetivos personales y profesionales, potenciando tus fortalezas naturales.",
        features: ["Clarificación de Metas", "Diseño de Plan de Acción", "Superación de Bloqueos", "Accountability"],
        icon: Compass,
        image: "https://images.unsplash.com/photo-1493612276216-9c5901955d43?q=80&w=2670&auto=format&fit=crop",
        category: "personas",
        price: "$100 / sesión",
        cta: "Iniciar Proceso"
    },
    {
        id: "couples-therapy",
        title: "Terapia de Pareja",
        shortDescription: "Fortalece el vínculo y mejora la comunicación.",
        fullDescription: "Espacio para parejas que buscan resolver conflictos, mejorar su comunicación o reconectar emocionalmente. Facilitamos herramientas prácticas para construir una relación más saludable, consciente y resiliente.",
        features: ["Resolución de Conflictos", "Mejora de Comunicación", "Reconexión Emocional", "Planes de Convivencia"],
        icon: Users,
        image: "https://images.unsplash.com/photo-1529634597503-139d372668c4?q=80&w=2669&auto=format&fit=crop",
        category: "personas",
        price: "$120 / sesión",
        cta: "Agendar Pareja"
    },
    {
        id: "emotional-healing",
        title: "Sanación Emocional",
        shortDescription: "Libera traumas y recupera tu equilibrio.",
        fullDescription: "Técnicas integrativas enfocadas en liberar bloqueos emocionales y traumas pasados que limitan tu presente. Un camino suave pero profundo hacia la paz interior y la recuperación de tu vitalidad.",
        features: ["Liberación de Trauma", "Equilibrio Energético", "Mindfulness", "Técnicas Somáticas"],
        icon: Sparkles,
        image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1ef4d?q=80&w=2668&auto=format&fit=crop",
        category: "personas",
        price: "Desde $90",
        cta: "Consultar"
    },
    {
        id: "org-consulting",
        title: "Consultoría Organizacional",
        shortDescription: "Potencia el talento y la cultura de tu empresa.",
        fullDescription: "Diagnóstico e intervención para empresas que valoran el capital humano. Desarrollamos estrategias para mejorar el clima laboral, aumentar la productividad y fomentar una cultura de bienestar y alto rendimiento.",
        features: ["Diagnóstico de Clima", "Resolución de Conflictos", "Bienestar Corporativo", "Retención de Talento"],
        icon: Building2,
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop",
        category: "empresas",
        price: "Consultar",
        cta: "Solicitar Propuesta"
    },
    {
        id: "executive-coaching",
        title: "Coaching Ejecutivo",
        shortDescription: "Liderazgo consciente para la alta gerencia.",
        fullDescription: "Programa exclusivo para directivos y líderes. Enfocado en desarrollar habilidades de liderazgo consciente, toma de decisiones estratégica y gestión de equipos de alto nivel, con un enfoque humano y orientado a resultados.",
        features: ["Liderazgo Consciente", "Toma de Decisiones", "Gestión del cambio", "Marca Personal"],
        icon: Lightbulb,
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop",
        category: "empresas",
        price: "Consultar",
        cta: "Agenda Ejecutiva"
    }
];
