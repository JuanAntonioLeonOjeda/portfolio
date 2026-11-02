import type { WorkProjectGroup } from "./types";

/**
 * Source: the author's CV (ai-job-search/documents/cv), section "Proyectos". Descriptions,
 * features and stacks are the CV's; the "otros proyectos" have only a name and a stack there,
 * so that is all they show. Groups in the order of `experience`; content.test.ts checks it.
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
          es: "App para móviles y tablets para gestionar incidencias en edificios.",
          en: "Phone and tablet app for managing incidents in buildings.",
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
        stack: ["React Native", "Expo", "AR", "Docker"],
      },
    ],
  },
];
