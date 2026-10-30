import type { CareerEntry, SkillGroup } from "./types";

/** Source: the author's CV. In chronological order of start (content.test.ts checks it). */
export const career: readonly CareerEntry[] = [
  {
    id: "ulpgc",
    kind: "study",
    title: { es: "Grado en Ingeniería Mecánica", en: "Degree in Mechanical Engineering" },
    place: "Universidad de Las Palmas de Gran Canaria",
    start: 2006,
    end: 2017,
  },
  {
    id: "moeller",
    kind: "work",
    title: { es: "Técnico comercial", en: "Technical sales" },
    place: "Moeller Canarias",
    start: 2018,
    end: 2021,
  },
  {
    id: "bootcamp",
    kind: "study",
    title: { es: "Bootcamp de desarrollo full-stack", en: "Full-stack development bootcamp" },
    place: "Reboot Academy",
    start: 2021,
    end: 2022,
  },
  {
    id: "reboot",
    kind: "teaching",
    title: { es: "Desarrollador full-stack y docente", en: "Full-stack developer and teacher" },
    place: "Reboot Academy",
    start: 2022,
    end: 2025,
    detail: {
      es: "Proyectos como ElectroTaro (recarga de coches eléctricos con OCPP, WebSockets y Stellar) y Atrimonitor (análisis territorial con Leaflet y D3), y clases en el bootcamp.",
      en: "Projects such as ElectroTaro (EV charging with OCPP, WebSockets and Stellar) and Atrimonitor (territorial analysis with Leaflet and D3), and teaching at the bootcamp.",
    },
  },
  {
    id: "powerbim",
    kind: "work",
    title: { es: "Desarrollador full-stack", en: "Full-stack developer" },
    place: "PowerBIM",
    start: 2025,
    end: null,
    detail: {
      es: "App móvil de incidencias en edificios con React Native y Expo: lectura de QR, realidad aumentada e integración con Autodesk Construction Cloud.",
      en: "Mobile app for building incidents with React Native and Expo: QR scanning, augmented reality and Autodesk Construction Cloud integration.",
    },
  },
  {
    id: "viu",
    kind: "study",
    title: { es: "Máster en Inteligencia Artificial", en: "Master's in Artificial Intelligence" },
    place: "Universidad Internacional de Valencia",
    start: 2025,
    end: null,
  },
];

/** Source: the CV's technology list, plus what the featured projects use. */
export const skills: readonly SkillGroup[] = [
  {
    id: "languages",
    title: { es: "Lenguajes", en: "Languages" },
    items: ["TypeScript", "JavaScript", "Python", "Dart"],
  },
  {
    id: "frontend",
    title: { es: "Front-end y móvil", en: "Front-end and mobile" },
    items: ["React", "React Native", "Expo", "Vue.js", "Tailwind", "Flutter"],
  },
  {
    id: "backend",
    title: { es: "Back-end", en: "Back-end" },
    items: ["Node.js", "Express", "NestJS", "FastAPI", "WebSockets", "MQTT"],
  },
  {
    id: "data",
    title: { es: "Bases de datos", en: "Databases" },
    items: ["PostgreSQL", "MySQL", "MongoDB", "TimescaleDB", "Redis", "Sequelize", "Mongoose"],
  },
  {
    id: "ai",
    title: { es: "Datos e IA", en: "Data and AI" },
    items: ["PyTorch", "scikit-learn", "pandas", "NumPy", "OpenCV"],
  },
  {
    id: "ops",
    title: { es: "Infraestructura y herramientas", en: "Infrastructure and tooling" },
    items: ["Docker", "AWS CDK", "GitHub Actions", "Git", "Jest", "Vitest", "n8n"],
  },
];
