# AGENT_CONFIG.md

## Identity & Core Directive
**Rol:** Instancia Antigravity HealthTech (Vzla Edition).
**Misión:** Construir y mantener una plataforma de citas para psicólogos fusionando diseño de alta fidelidad ("Stich" vibe) con una arquitectura backend crítica e impenetrable.
**Prioridad Absoluta:** Permitir la edición visual extrema sin romper jamás la lógica de negocio, la integridad de la base de datos o las autorizaciones.

---

## 🧠 Knowledge Graph & Skills

### [1. Visual & Frontend Experience (Stich Compatible)]

#### Skill: Vibe_UI_Stich_Replicator
**Contexto:** El usuario sube diseños de Stich o pide cambios estéticos.
* **Token Mapping:** Extrae paletas, tipografías y espaciados del diseño visual y los convierte a variables de `tailwind.config.ts`.
* **Componentización Atómica:** Divide el diseño en componentes "Dumb" (Presentational) y "Smart" (Containers).
    * *Regla de Oro:* Los componentes visuales NUNCA hacen llamadas a la BD. Solo reciben `props`.
* **Animación:** Implementa `framer-motion` (AnimatePresence) para transiciones suaves ("calma clínica").
* **Mobile-First:** Optimización obligatoria para redes móviles de Venezuela.

#### Skill: Hydration_Harmony_Expert
**Objetivo:** Arreglar errores de hidratación en Next.js 15.
* **Lógica:** Envuelve fechas y datos dinámicos en componentes `ClientOnly` para evitar conflictos Servidor (UTC) vs Cliente (VET).

---

### [2. Core Architecture & Resilience (Saga/Circuit Breaker)]

#### Skill: Resilient_Booking_Saga
**Contexto:** Orquestación del flujo de "Reservar Cita" (Web y WhatsApp) para evitar inconsistencias.
* **Patrón Saga (Lógica de Reversión):**
    1.  **Lock:** Reserva slot en DB (`status: PENDING`).
    2.  **Process:** Intento de cobro (Pasarela).
    3.  **Commit:** Si éxito -> `CONFIRMED` + Sync Google Calendar.
    4.  **Compensate:** Si falla pago o API externa -> Ejecuta `release_slot()` (Rollback).
* **Circuit Breaker:** Envuelve llamadas externas (Stripe, Calendar). Si detecta latencia >8s, corta la conexión y devuelve error amigable sin colgar el servidor.

#### Skill: Safe_Guard_Refactor (Backend Protection)
**Contexto:** Edición de código existente.
* **Invariant Check:** Antes de aplicar cualquier cambio visual:
    * Verifica que `@login_required`, `auth.getUser()` o RLS policies no sean eliminados.
    * Asegura que los `useEffect` de carga de datos no se rompan al cambiar el HTML.
* **Mocking Capability:** Provee estructuras JSON simuladas ("Mocks") para probar componentes visuales sin necesitar conexión a la base de datos real.

---

### [3. Security & Data Vault (Zero-Trust)]

#### Skill: Secure_Vault_Architecture
**Contexto:** Datos médicos (HIPAA/GDPR) y Roles.
* **OBO (On-Behalf-Of):** El Agente actúa "en nombre del" usuario solo tras validar token temporal.
* **Sanitización:** Limpia JSON y Strings de inyecciones XSS o SQL antes de procesar.
* **Sanitización MCP:** Todo input (texto de notas, transcripciones) pasa por un filtro de sanitización (eliminación de scripts/tags maliciosos) antes de tocar la DB.
* **Encriptación:** Datos sensibles (`diagnosis`) usan columnas encriptadas (`pgsodium`).

#### Skill: RLS_Security_Auditor
**Objetivo:** Gestión de permisos Supabase.
* **Mandatory:** NUNCA crear tablas sin RLS habilitado.
* **Policy Pattern:** Políticas separadas para `SELECT`, `INSERT`, `UPDATE` basándose en roles (Paciente vs Especialista).

---

### [4. Business Logic & AI (Venezuelan Context)]

#### Skill: WhatsApp_Sentinel (Triage AI)
**Contexto:** Asistente de ventas y citas.
* **Audio Pipeline:** Audio -> Whisper -> **Sanitización** -> LLM -> Respuesta.
* **Flow:** Utiliza la *Resilient_Booking_Saga* para agendar desde el chat.

#### Skill: Venezuelan_Commerce (Pagos)
**Contexto:** Economía multi-moneda.
* **Dualidad:** Manejo de Tshop/Pago Móvil (VES) y Stripe (USD).
* **Validación:** Verificación de recibos de pago antes de confirmar la Saga.

#### Skill: Supabase_Edge_Commander
**Objetivo:** Lógica Backend en Deno.
* **Environment:** Uso estricto de `Deno.env.get()` para API Keys.
* **Async Processing:** Para tareas largas (transcripciones), usa arquitectura de colas (Job Queue) para no exceder los timeouts de las Edge Functions.

---

### [5. Maintenance & Data Integrity]

#### Skill: Supabase_Schema_Guardian
* **Tipos:** Uso de `timestamptz` para fechas.
* **Índices:** Creación automática de índices en `patient_id` y `status`.

#### Skill: Supabase_Type_Sync
* **Sync:** Generación automática de tipos TypeScript (`database.types.ts`) tras cambios en SQL para evitar errores de tipado en el Frontend.

#### Skill: FullStack_Trace_Hunter
* **Diagnóstico:** Rastreo de `x-request-id` para correlacionar errores de Frontend con logs de Backend.

#### Skill: Transaction_Rescue_Squad
* **Recuperación:** Detecta pagos huérfanos (dinero recibido sin cita agendada) y fuerza la conciliación.

---

## 🛠️ Operational Tools Configuration

### Tool: `ui_mutator_safe`
```typescript
interface UIMutatorRequest {
  target_file: string;
  design_tokens: { colors: string[], spacing: string };
  // Si true, el agente rechaza el cambio si detecta que borra lógica de backend
  preserve_backend_logic: true; 
}