import { Heart, Compass, Users, Sparkles, Building2, Lightbulb } from 'lucide-react';

export const SERVICES_DATA = [
    {
        id: "initial-interview",
        title: "Entrevista Inicial",
        shortDescription: "Valoración diagnóstica para nuevos pacientes.",
        fullDescription: "Sesión obligatoria para nuevos pacientes. Realizamos una valoración diagnóstica integral para entender tus necesidades.",
        features: ["Valoración Diagnóstica", "Asignación de Especialista", "Modalidad Online"],
        icon: Users,
        image: import.meta.env.BASE_URL + "images/entrevista-inicial.png",
        category: "personas",
        price: "",
        cta: "Agendar Entrevista"
    },
    {
        id: "individual-therapy",
        title: "Psicoterapia EMDR individual",
        shortDescription: "Un espacio seguro para sanar y crecer.",
        fullDescription: "Sesiones personalizadas diseñadas para abordar ansiedad, depresión, duelo y procesos de transformación personal. Utilizamos un enfoque integrativo que combina técnicas clínicas probadas con una comprensión profunda del ser humano, proporcionando un entorno confidencial y empático.",
        features: [
            "Tratamiento del trauma psicológico y de toda la sintomatología asociada al trauma.",
            "Tratamiento de diversos tipos de duelos no resueltos y problemas relacionales.",
            "Tratamiento especializado del Síndrome de Burnout.",
            "Otros"
        ],
        icon: Heart,
        image: import.meta.env.BASE_URL + "images/emdr.png",
        category: "personas",
        price: "",
        cta: "Reservar Cita"
    },
    {
        id: "life-coaching",
        title: "Coaching de Vida",
        shortDescription: "Alcanza tus metas y vive con propósito.",
        fullDescription: "Un proceso dinámico enfocado en el futuro y la acción. Trabajamos juntos para clarificar tu visión, identificar obstáculos y diseñar un plan de acción concreto para alcanzar tus objetivos personales y profesionales, potenciando tus fortalezas naturales.",
        features: [
            "Evaluación y coaching vocacional y ocupacional.",
            "Acompañamiento en el diseño de planes de vida y de rediseño personal.",
            "Fortalecimiento de competencias",
            "Desensibilización de creencias limitantes y negativas.",
            "Instalación de creencias potenciadoras y positivas.",
            "Fortalecimiento del desempeño óptimo con psicoterapia EMDR",
            "Evaluación y fortalecimiento del diseño personal."
        ],
        icon: Compass,
        image: import.meta.env.BASE_URL + "images/coaching-de-vida.jpg",
        category: "personas",
        price: "",
        cta: "Iniciar Proceso"
    },
    {
        id: "couples-therapy",
        title: "Terapia de Pareja",
        shortDescription: "Fortalece el vínculo y mejora la comunicación.",
        fullDescription: "Espacio para parejas que buscan resolver conflictos, mejorar su comunicación o reconectar emocionalmente. Facilitamos herramientas prácticas para construir una relación más saludable, consciente y resiliente.",
        features: ["Resolución de Conflictos", "Mejora de Comunicación", "Reconexión Emocional", "Planes de Convivencia"],
        icon: Users,
        image: import.meta.env.BASE_URL + "images/terapia-pareja.jpg",
        category: "personas",
        price: "",
        cta: "Agendar Pareja"
    },
    {
        id: "org-consulting",
        title: "Consultoría Organizacional",
        shortDescription: "Potencia el talento humano",
        fullDescription: "Diagnóstico e intervención para empresas que valoran el capital humano. Desarrollamos estrategias para mejorar el clima laboral, aumentar la productividad y fomentar una cultura de bienestar y alto rendimiento.",
        features: [
            "Desarrollo de competencias",
            "Mejora en la comunicación y solución de conflictos.",
            "Evaluación de equipos y reconstrucción según diseño personal.",
            "Diagnóstico, tratamiento y prevención del Síndrome de Burnout.",
            "Fortalecimiento del desempeño óptimo con psicoterapia EMDR"
        ],
        icon: Building2,
        image: import.meta.env.BASE_URL + "images/consultoria-organizacionaljpg.jpg",
        category: "empresas",
        price: "",
        cta: "Solicitar Propuesta"
    },
    {
        id: "executive-coaching",
        title: "Coaching Ejecutivo",
        shortDescription: "Liderazgo consciente para la alta gerencia.",
        fullDescription: "Programa exclusivo para directivos y líderes. Enfocado en desarrollar habilidades de liderazgo consciente, toma de decisiones estratégica y gestión de equipos de alto nivel, con un enfoque humano y orientado a resultados.",
        features: [
            "Fortalecimiento de competencias",
            "Mejora del rendimiento.",
            "Evaluación del diseño personal.",
            "Diagnóstico, tratamiento y prevención del Síndrome de Burnout.",
            "Fortalecimiento del rol de liderazgo."
        ],
        icon: Lightbulb,
        image: import.meta.env.BASE_URL + "images/coaching-ejecutivo.jpg",
        category: "empresas",
        price: "",
        cta: "Agenda Ejecutiva"
    }
];
