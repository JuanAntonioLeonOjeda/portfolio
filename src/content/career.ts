import type { CareerEntry, SkillGroup } from "./types";

/**
 * Source: the author's CV; titles as the author words them. Each list in chronological order of
 * start (content.test.ts checks it). Experience and education are separate sections that share
 * one year axis; what was done at each job goes elsewhere.
 */
export const experience: readonly CareerEntry[] = [
  {
    id: "moeller",
    kind: "work",
    title: { es: "Técnico comercial", en: "Technical sales" },
    place: "Moeller Canarias",
    start: 2018,
    end: 2021,
  },
  {
    id: "reboot",
    kind: "teaching",
    title: { es: "Full Stack Developer / Docente", en: "Full Stack Developer / Teacher" },
    place: "Reboot Academy",
    start: 2022,
    end: 2025,
  },
  {
    id: "powerbim",
    kind: "work",
    title: { es: "Full Stack Developer", en: "Full Stack Developer" },
    place: "PowerBIM",
    start: 2025,
    end: null,
  },
];

export const education: readonly CareerEntry[] = [
  {
    id: "ulpgc",
    kind: "study",
    title: { es: "Grado en Ingeniería Mecánica", en: "Degree in Mechanical Engineering" },
    place: "Universidad de Las Palmas de Gran Canaria",
    start: 2006,
    end: 2018,
  },
  {
    id: "bootcamp",
    kind: "study",
    title: { es: "Bootcamp de Full Stack Developer", en: "Full Stack Developer bootcamp" },
    place: "Reboot Academy",
    start: 2021,
    end: 2022,
  },
  {
    id: "viu",
    kind: "study",
    title: { es: "Máster en Inteligencia Artificial", en: "Master's in Artificial Intelligence" },
    place: "Universidad Internacional de Valencia (VIU)",
    start: 2025,
    end: 2026,
    endMonth: 10,
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
