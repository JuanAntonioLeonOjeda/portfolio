import type { WorkProjectGroup } from "./types";

/**
 * Sources:
 * - Reboot Academy: the author's CV (ai-job-search/documents/cv), section "Proyectos". Evente
 *   and the academy's website: their CV stacks, plus the author (Evente's weekly updates,
 *   client promotions and Stripe; his maintenance of the website, and its forms feeding
 *   ActiveCampaign through Zapier) and the sites themselves, read on 2 November 2026
 *   (evente.es: search by date, location, type and distance, the private area;
 *   reboot.academy: the bootcamps, the enrolment and contact forms).
 * - PowerBIM: the CV for the mobile app's features; the package manifests the author shared
 *   (2 November 2026) for the stacks; the author for what each project does and his part in
 *   it (all of the app and of the MQTT platform, which only describes what it does; most of
 *   the web platform's front end and its AI part, so its features list only those, while its
 *   stack shows the whole project's main technologies).
 * Groups in the order of `experience`; content.test.ts checks it.
 */
export const workProjects: readonly WorkProjectGroup[] = [
  {
    id: "reboot",
    projects: [
      {
        id: "electrotaro",
        name: { es: "ElectroTaro", en: "ElectroTaro" },
        description: {
          es: "Plataforma online para recargar vehículos eléctricos, con pasarela de pago integrada.",
          en: "Online platform for charging electric vehicles, with a built-in payment gateway.",
        },
        features: [
          {
            es: "Comunicación en tiempo real de los cargadores con un backend REST mediante WebSockets y el protocolo OCPP.",
            en: "Real-time communication between the chargers and a REST back end over WebSockets and the OCPP protocol.",
          },
          {
            es: "Pago de las recargas con Stripe.",
            en: "Payment for each charge through Stripe.",
          },
          {
            es: "Registro inmutable en la blockchain de Stellar de la energía renovable empleada en cada carga.",
            en: "An immutable record on the Stellar blockchain of the renewable energy used in each charge.",
          },
        ],
        stack: ["React", "Express", "MongoDB", "WebSockets", "Stellar", "Stripe"],
      },
      {
        id: "atrimonitor",
        name: { es: "Atrimonitor", en: "Atrimonitor" },
        description: {
          es: "Portal para el análisis de datos por divisiones territoriales.",
          en: "Portal for analysing data by territorial division.",
        },
        features: [
          {
            es: "Mapa interactivo que muestra la información por distintas divisiones territoriales.",
            en: "Interactive map that shows the data by different territorial divisions.",
          },
          {
            es: "Filtros y personalización de capas.",
            en: "Filters and customisable layers.",
          },
          {
            es: "Gráficas de los datos.",
            en: "Charts of the data.",
          },
          {
            es: "Actualización de los datos subiendo un archivo CSV.",
            en: "Data updates by uploading a CSV file.",
          },
        ],
        stack: ["React", "Express", "MongoDB", "Leaflet", "D3"],
      },
      {
        id: "evente",
        name: { es: "Evente", en: "Evente" },
        description: {
          es: "Web de gestión de eventos en Canarias, que se actualiza cada semana.",
          en: "Event management website for the Canary Islands, updated every week.",
        },
        features: [
          {
            es: "Agenda de eventos que se actualiza semanalmente.",
            en: "An events listing updated weekly.",
          },
          {
            es: "Búsqueda de eventos y promociones por fecha, ubicación o tipo, y por cercanía.",
            en: "Search for events and promotions by date, location or type, and by distance.",
          },
          {
            es: "Promoción de eventos de clientes, con pago a través de Stripe.",
            en: "Promotion of clients' events, paid through Stripe.",
          },
          {
            es: "Área privada para crear y gestionar eventos, promociones y artículos.",
            en: "A private area to create and manage events, promotions and articles.",
          },
        ],
        stack: ["Nuxt", "Express", "MongoDB", "Web scraping", "Stripe"],
      },
      {
        id: "reboot-web",
        name: { es: "Web de Reboot Academy", en: "Reboot Academy website" },
        description: {
          es: "La web de la academia. Me encargaba de su mantenimiento.",
          en: "The academy's website. I was in charge of maintaining it.",
        },
        features: [
          {
            es: "Mantenimiento de la web y actualización de la información de los bootcamps.",
            en: "Website maintenance and keeping the bootcamps' information up to date.",
          },
          {
            es: "Cambios de estilos.",
            en: "Style changes.",
          },
          {
            es: "Formularios de inscripción y contacto conectados con ActiveCampaign mediante Zapier.",
            en: "Enrolment and contact forms connected to ActiveCampaign through Zapier.",
          },
        ],
        stack: ["Next.js", "Zapier", "ActiveCampaign"],
      },
    ],
  },
  {
    id: "powerbim",
    projects: [
      {
        id: "powerbim-app",
        name: { es: "App móvil de PowerBIM", en: "PowerBIM mobile app" },
        description: {
          es: "App para móviles y tablets para gestionar incidencias en edificios, con su propio backend. La he hecho entera, front y back.",
          en: "Phone and tablet app for managing incidents in buildings, with its own back end. I built all of it, front and back.",
        },
        features: [
          {
            es: "Lectura de QR para ver la información de un grupo en realidad aumentada.",
            en: "QR scanning to see a group's information in augmented reality.",
          },
          {
            es: "Integración con Autodesk Construction Cloud para sincronizar los datos.",
            en: "Autodesk Construction Cloud integration to keep the data in sync.",
          },
          {
            es: "Visualización de modelos 3D.",
            en: "3D model viewing.",
          },
        ],
        stack: [
          "React Native",
          "Expo",
          "TypeScript",
          "AR",
          "NestJS",
          "PostgreSQL",
          "MongoDB",
          "MQTT",
          "Docker",
        ],
      },
      {
        id: "powerbim-platform",
        name: { es: "Plataforma web de PowerBIM", en: "PowerBIM web platform" },
        description: {
          es: "Plataforma web para gestionar gemelos digitales de edificios. Me encargo de casi todo el front y de la parte de IA.",
          en: "Web platform for managing digital twins of buildings. I do most of the front end and the AI part.",
        },
        features: [
          {
            es: "Asistente de IA que responde preguntas sobre el edificio.",
            en: "An AI assistant that answers questions about the building.",
          },
          {
            es: "Auditorías del modelo BIM con IA: revisión de parámetros y de cumplimiento de la normativa ISO.",
            en: "AI audits of the BIM model: parameter checks and compliance with ISO standards.",
          },
          {
            es: "Servidor MCP con los prompts, agentes, herramientas y sesiones del asistente, y un agente en Python sobre AWS Bedrock.",
            en: "An MCP server with the assistant's prompts, agents, tools and sessions, and a Python agent on AWS Bedrock.",
          },
          {
            es: "Gran parte de la interfaz web de la plataforma.",
            en: "Most of the platform's web interface.",
          },
        ],
        stack: [
          "React",
          "TypeScript",
          "Tailwind",
          "Three.js",
          "Leaflet",
          "Socket.io",
          "NestJS",
          "Claude",
          "MCP",
          "AWS Bedrock",
          "Python",
        ],
      },
      {
        id: "mqtt-platform",
        name: { es: "Plataforma de gestión MQTT", en: "MQTT management platform" },
        description: {
          es: "Servicio que obtiene las lecturas de los sensores y las envía al broker MQTT.",
          en: "A service that collects sensor readings and sends them to the MQTT broker.",
        },
        features: [
          {
            es: "Obtención de las lecturas de los sensores.",
            en: "Collection of the sensor readings.",
          },
          {
            es: "Envío de los datos al broker MQTT.",
            en: "Delivery of the data to the MQTT broker.",
          },
        ],
        stack: ["NestJS", "TypeScript", "Node.js", "MQTT"],
      },
    ],
  },
];
