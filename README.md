# DOCUMENTO MAESTRO INTEGRAL: PROYECTO WEB "DEGLYA CAMERO GROUP"
**Versión:** 5.0 (Arquitectura Supabase + AI Ready)
**Misión:** Plataforma B2B/B2C, Gestión Clínica Segura y Automatización Inteligente.
**Tech Stack Principal:** Frontend (Web) + Backend (Supabase).

## 1. IDENTIDAD VISUAL Y ESTÉTICA (LOOK & FEEL)
**Concepto:** "Vitalidad Sofisticada" (Mid-Century Modern).
Diseño que proyecta calidez humana y estructura empresarial.

### Paleta de Colores (Definitiva):
- 🔵 **Dominante (Autoridad):** Teal Profundo / Verde Petróleo (aprox. #1B6CA8). Estructura, textos, headers.
- 🟡 **Acción (Conversión):** Amarillo Mostaza / Ocre (aprox. #E3B346). Botones (Call to Action): Agendar, Pagar, Acceder.
- 🟤 **Base (Calidez):** Tonos Madera / Terracota Suave. Fondos de contraste y detalles geométricos.
- ⚪ **Lienzo:** Blanco Hueso / Crema. Fondo general.

**Recursos Gráficos:** Geometría (hexágonos/círculos) y fotografía conceptual de "construcción/sanación".

## 2. ARQUITECTURA DE INFORMACIÓN (SITEMAP PÚBLICO)
**Menú visible para visitantes:**
1. Inicio
2. Quiénes Somos (Historia | Equipo | Aliados - Carrusel de logos)
3. Servicios (Personas | Empresas)
4. El Reino de lo Posible (Libro + QRs + Landing interactiva)
5. Tienda / Recursos (Automatizada)
6. Experiencias (Testimonios en Video y Texto)
7. Contacto

**BOTÓN DESTACADO (Mostaza):** 📅 AGENDAR CITA

## 3. ARQUITECTURA TÉCNICA: EL PODER DE SUPABASE
Aquí reside la "magia" del Backend y la Base de Datos.
En lugar de guardar los datos sensibles en un CMS tradicional, usaremos Supabase como el cerebro central. Esto garantiza la seguridad que pediste para los especialistas.

### A. Base de Datos Centralizada (PostgreSQL)
Toda la información crítica vivirá aquí:
- **Usuarios:** Pacientes y Especialistas.
- **Citas:** Fechas, horas, estado de pago.
- **Expedientes:** Notas clínicas (encriptadas).
- **Tienda:** Registro de compras y descargas.

### B. Portal de Especialistas (Intranet Segura)
- Acceso mediante Supabase Auth.
- **Seguridad Robusta (RLS - Row Level Security):**
  - Esta es la tecnología clave de Supabase que cumple tu requisito: "El especialista A no ve al B".
  - Configuraremos Políticas de Seguridad a Nivel de Fila: La base de datos, a nivel de código, rechazará cualquier intento de un usuario de leer datos que no le pertenecen. Es un blindaje superior al de cualquier plugin estándar.
- **Autenticación 2FA:**
  - Login seguro para Deglya, Ana, Zuri y Francirys.
  - Código de verificación obligatorio al celular.
- **Gestión de Archivos (Supabase Storage):**
  - Los documentos sensibles de los pacientes se alojan en "Buckets Privados".
  - Solo se pueden ver mediante URLs firmadas temporalmente (el link expira a los pocos minutos), evitando fugas de información.

### C. Sincronización de Calendario
- El backend consultará Google Calendar (vía API) y cruzará la información con la base de datos en Supabase para mostrar disponibilidad real en el Frontend.

## 4. DESGLOSE DE PÁGINAS Y FLUJOS

### 🏠 PÁGINA DE INICIO (HOME)
- **Hero:** Foto Deglya + Titular Unificador.
- **Distribuidor:** Tarjetas Personas vs. Empresas.
- **Video:** Bienvenida diversa.

### 👥 QUIÉNES SOMOS
- **Valores:** Gráfico de Hexágonos.
- **Equipo:** Fichas de las 4 especialistas conectadas a la base de datos (si entra una nueva, se agrega en Supabase y aparece en la web).

### 🛠️ SERVICIOS (Dualidad B2B / B2C)
- Pestañas claras para separar la oferta Clínica de la Corporativa.
- Botones de acción en color Mostaza.

### 📖 EL REINO DE LO POSIBLE
- Venta de formatos (Extendido, Exprés, Paso a Paso).
- **Integración QR:** Al escanear el QR del libro físico, el usuario se loguea (vía Supabase) y accede al contenido exclusivo desbloqueado en la base de datos.

### 📅 AGENDAR CITA (El Flujo Automatizado)
- Frontend muestra horas disponibles (leyendo de Supabase/Google Calendar).
- Usuario selecciona y paga (Pasarela conectada al backend).
- Supabase registra la cita, bloquea el horario y notifica al especialista.

## 5. FUTURO: INTEGRACIÓN DE IA EN WHATSAPP
La infraestructura en Supabase está diseñada para soportar esto en la Fase 2.
Al tener la base de datos en Supabase, la integración del Agente de IA será fluida:
- **El Agente (Cerebro):** Se conectará a Supabase.
- **Capacidades del Agente:**
  - **Consultar Disponibilidad:** El bot leerá la tabla de "Citas" en tiempo real. Cuando alguien pregunte en WhatsApp "¿Tienen hora para el martes?", el bot responderá con datos reales.
  - **Base de Conocimiento:** Podemos usar pgvector (una función de Supabase) para "entrenar" a la IA con el contenido de tu libro y tus PDFs. Así, el bot podrá responder preguntas sobre los servicios o la metodología con tu mismo tono de voz.
  - **Triaje Inicial:** El bot podrá preguntar "¿Eres empresa o persona?" y guardar esa etiqueta en la base de datos antes de pasar el contacto a un humano o agendar la cita directamente.

## 6. RESUMEN DE REQUERIMIENTOS TÉCNICOS
- **Frontend:** (Recomendado: Next.js o un WordPress Headless muy bien optimizado) para consumir los datos de Supabase. *Nota: Estamos usando Vite + React para máximo rendimiento y flexibilidad.*
- **Backend/DB:** Supabase (Auth, Database, Storage, Edge Functions).
- **Calendario:** API de Google Calendar.
- **Pagos:** Stripe/PayPal/Zelle (Webhooks conectados a Supabase).
- **Seguridad:** Certificado SSL + Políticas RLS activas + 2FA.

## 7. CONCLUSIÓN
Con esta arquitectura:
- **Visualmente:** Tienes una marca moderna y diferenciada (Teal/Mostaza).
- **Operativamente:** Los "conejos" se salvan gracias a la automatización de citas y ventas.
- **Seguridad:** Tienes un sistema clínico de nivel profesional (Intranet aislada).
- **Escalabilidad:** Estás lista para conectar la Inteligencia Artificial a WhatsApp en cuanto lo decidas, porque los datos ya están estructurados para ello.
