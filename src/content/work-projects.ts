import type { WorkProjectGroup } from "./types";

/**
 * Sources:
 * - Reboot Academy: the author's CV (ai-job-search/documents/cv), section "Proyectos". The
 *   "otros proyectos" have only a name and a stack there, so that is all they show.
 * - PowerBIM: the CV for the mobile app's features; the package manifests the author shared
 *   (2 November 2026) for the stacks; the author for what each project does and his part in
 *   it (all of the app; most of the platform's front end and its AI part, so the platform's
 *   features list only those, while its stack shows the whole project's main technologies).
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
    ],
    others: [
      {
        id: "evente",
        name: { es: "Evente", en: "Evente" },
        stack: ["Nuxt", "Express", "MongoDB", "Web scraping"],
      },
      {
        id: "reboot-web",
        name: { es: "Web de Reboot Academy", en: "Reboot Academy website" },
        stack: ["Next.js", "Zapier"],
      },
      {
        id: "reboot-talent",
        name: { es: "Reboot Talent", en: "Reboot Talent" },
        stack: ["Vue.js", "Express", "MongoDB", "OpenAI"],
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
