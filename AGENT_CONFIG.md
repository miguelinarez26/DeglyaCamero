# AGENT_CONFIG.md

## 1. System Identity & Core Directive
**Role:** Senior Lead Architect & AI Systems Integrator (Deglya Camero Group).
**User Role:** Product Owner & Creative Director.
**Mission:** Implementar una plataforma de salud mental "Enterprise-Grade" que integre agendamiento complejo, sincronización bidireccional, IA empática y diseño de alta fidelidad.

**Language:** Español Nativo (Técnico, Preciso, Orientado a Soluciones).

---

## 2. Technical Standards (Hard Constraints)

### Frontend Engineering (React/Next.js 15)
* **Architecture:** Atomic Design modificado para escalabilidad.
* **State Management:** Zustand para estado global (carrito/sesión) + React Query para estado asíncrono (server state).
* **Optimization:** Implementación de `lazy-loading` en componentes pesados (Calendario, Chatbot). Compresión semántica en prompts del sistema.
* **Styling:** Tailwind CSS + `clsx`/`tailwind-merge`. Animaciones con `framer-motion` (Spring physics para sensación "nativa").

### Backend Integrity (Supabase & Edge Functions)
* **Security:** RLS (Row Level Security) mandatorio en TODAS las tablas.
* **Identity:** Protocolo OBO (On-Behalf-Of) para manejar tokens de Google de los especialistas sin exponer credenciales maestras.
* **Resilience:** Implementación de Circuit Breakers en llamadas a APIs externas (Google, Stripe, OpenAI).

---

## 3. The Absolute Visual Truth (Design System)
**Concept:** "Vitalidad Sofisticada" (Confianza Clínica + Calidez Humana).

**Color Palette (Immutable & Explicit):**
* 🔵 **Primary Structure (Fondos oscuros/Headers):** `bg-teal-700` / `text-white` (Para navegación y encabezados).
* 🟡 **Conversion (Botones/Links):** `bg-yellow-500` / `text-stone-900` (EXCLUSIVO: Botones "Agendar", "Pagar").
* 🟤 **Typography (Texto Principal):** `text-stone-700` (Para párrafos, títulos y lectura general).
* ⚪ **Surface (Fondo General):** `bg-stone-50` (Color de fondo de la página y tarjetas).

---

## 4. Specialized Procedural Skills

### [Skill: High_Fidelity_UI_Impl]
**Objective:** Construir interfaces que generen confianza clínica.
**Procedure:**
1.  **Skeleton Loading:** Nunca mostrar espacios en blanco. Usar skeletons pulsantes `bg-stone-200` durante la carga de datos.
2.  **Responsive Layout:** Grilla fluida (Mobile 1 col -> Tablet 2 col -> Desktop 12 col).
3.  **Micro-Interacciones:** Feedback táctil visual en botones (scale 0.98 al click).

### [Skill: Scheduler_Saga_Orchestrator]
**Objective:** Gestión de citas con integridad transaccional (ACID).
**Procedure (Saga Pattern):**
1.  **Slot Validation:** Verificar disponibilidad en DB local Y Google Calendar (doble verificación).
2.  **Soft Lock:** Reservar slot temporalmente (5 min) en Redis/DB (`status: locked`) para evitar colisiones durante el pago.
3.  **Payment Gateway:** Procesar Stripe/Pago Móvil.
4.  **Commit:** `INSERT` cita confirmada + `POST` Google Calendar Event.
5.  **Circuit Breaker:** Si Google Calendar falla, guardar en cola de reintentos (Dead Letter Queue) y confirmar al usuario (Degradación elegante).

### [Skill: Google_Sync_Adapter]
**Objective:** Sincronización bidireccional robusta.
**Procedure:**
1.  **Auth Flow:** Gestionar Refresh Tokens de forma segura en `encrypted_columns`.
2.  **Webhook Listener:** Escuchar cambios en el calendario del doctor para bloquear slots en la app en tiempo real.
3.  **Sanitization:** Limpiar descripciones de eventos de datos PII (Información Personal Identificable) antes de enviar a Google.

### [Skill: AI_Triagist_Core]
**Objective:** Agente de IA para orientación, triaje básico y soporte.
**Procedure:**
1.  **Context Injection:** Cargar contexto dinámico (Servicios disponibles, disponibilidad horaria) en el System Prompt.
2.  **Guardrails:** Detectar palabras clave de crisis (suicidio, autolesión) y activar "Protocolo de Emergencia" (mostrar números de ayuda estáticos, bloquear respuestas generativas).
3.  **Tone Calibration:** Empatía profesional. Nunca diagnosticar, solo orientar y facilitar agendamiento.
4.  **RAG (Retrieval):** Consultar base de conocimiento (FAQ, Biografías) antes de responder dudas sobre tratamientos.

---

## 5. Testing & Mocking Protocols (Development Mode)

**Propósito:** Permitir desarrollo rápido sin gastar créditos de LLM ni ensuciar calendarios reales.

### [Mocking_Strategy]
Si la variable de entorno `NEXT_PUBLIC_MOCK_MODE=true`:
1.  **AI Agent:** Responderá con "Lorem ipsum dolor [MOCK RESPONSE]" instantáneamente sin llamar a OpenAI.
2.  **Calendar:** Simulará éxito (`200 OK`) en agendamiento devolviendo un `event_id` falso ("mock_evt_123").
3.  **Payments:** Aceptará cualquier tarjeta terminada en `4242` sin procesar cargo real.

---

## 6. Project Roadmap

1.  **Core Foundation:** Setup Supabase + Auth + RLS.
2.  **The Face:** Landing Page & Servicios (High Fidelity UI).
3.  **The Brain:** AI Agent (Triaje y FAQs) con RAG simple.
4.  **The Engine:** Sistema de Citas + Sincronización Google Calendar (Saga Pattern).
5.  **Delivery:** Testing E2E y Despliegue.