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

const BOTH = ["work", "personal"] as const;
const WORK = ["work"] as const;
const PERSONAL = ["personal"] as const;
/** The author left Reboot Academy in August 2025 (the author, 2 November 2026). */
const REBOOT_END = "2025-08";
/** The master's thesis, finished in October 2026. */
const TFM_END = "2026-10";

/**
 * Source: the CV's technology list, plus what the projects use. How each one was used:
 * - work, in use: PowerBIM's package manifests, shared by the author (NestJS, React, React
 *   Native, Expo, Tailwind, FastAPI, MQTT, PostgreSQL, MongoDB, Socket.io, Jest), and the
 *   author's word (TypeScript, JavaScript, Node.js, Git, GitHub Actions); Docker from the CV.
 * - work, until August 2025: Reboot Academy, from the CV's project stacks (React, Express,
 *   MongoDB, WebSockets, Vue.js, Stellar, Stripe, Leaflet, D3) and the author's word
 *   (JavaScript, Node.js, Mongoose, MySQL, Sequelize, Git).
 * - personal: the manifests of the personal projects (all with commits in 2026); still in use
 *   unless they only appear in the finished TFM. Socket.io was also personal, but more than a
 *   year ago (the author): the table places it by its use in the last year, at work.
 * - n8n: at work, more than a year ago (the author); dated with the end of Reboot Academy.
 */
export const skills: readonly SkillGroup[] = [
  {
    id: "languages",
    title: { es: "Lenguajes", en: "Languages" },
    items: [
      { name: "TypeScript", contexts: BOTH, lastUsed: null },
      { name: "JavaScript", contexts: WORK, lastUsed: null },
      { name: "Python", contexts: BOTH, lastUsed: null },
      { name: "Dart", contexts: PERSONAL, lastUsed: null },
    ],
  },
  {
    id: "frontend",
    title: { es: "Front-end y móvil", en: "Front-end and mobile" },
    items: [
      { name: "React", contexts: BOTH, lastUsed: null },
      { name: "React Native", contexts: WORK, lastUsed: null },
      { name: "Expo", contexts: WORK, lastUsed: null },
      { name: "Vue.js", contexts: WORK, lastUsed: REBOOT_END },
      { name: "Leaflet", contexts: WORK, lastUsed: REBOOT_END },
      { name: "D3", contexts: WORK, lastUsed: REBOOT_END },
      { name: "Tailwind", contexts: WORK, lastUsed: null },
      { name: "Flutter", contexts: PERSONAL, lastUsed: null },
    ],
  },
  {
    id: "backend",
    title: { es: "Back-end", en: "Back-end" },
    items: [
      { name: "Node.js", contexts: BOTH, lastUsed: null },
      { name: "Express", contexts: WORK, lastUsed: REBOOT_END },
      { name: "Stripe", contexts: WORK, lastUsed: REBOOT_END },
      { name: "Stellar", contexts: WORK, lastUsed: REBOOT_END },
      { name: "NestJS", contexts: WORK, lastUsed: null },
      { name: "FastAPI", contexts: BOTH, lastUsed: null },
      { name: "WebSockets", contexts: WORK, lastUsed: null },
      { name: "Socket.io", contexts: WORK, lastUsed: null },
      { name: "MQTT", contexts: BOTH, lastUsed: null },
    ],
  },
  {
    id: "data",
    title: { es: "Bases de datos", en: "Databases" },
    items: [
      { name: "PostgreSQL", contexts: BOTH, lastUsed: null },
      { name: "MySQL", contexts: WORK, lastUsed: REBOOT_END },
      { name: "MongoDB", contexts: WORK, lastUsed: null },
      { name: "TimescaleDB", contexts: PERSONAL, lastUsed: null },
      { name: "Redis", contexts: PERSONAL, lastUsed: null },
      { name: "Sequelize", contexts: WORK, lastUsed: REBOOT_END },
      { name: "Mongoose", contexts: WORK, lastUsed: REBOOT_END },
    ],
  },
  {
    id: "ai",
    title: { es: "Datos e IA", en: "Data and AI" },
    items: [
      { name: "PyTorch", contexts: PERSONAL, lastUsed: null },
      { name: "scikit-learn", contexts: PERSONAL, lastUsed: TFM_END },
      { name: "pandas", contexts: PERSONAL, lastUsed: TFM_END },
      { name: "NumPy", contexts: PERSONAL, lastUsed: TFM_END },
      { name: "OpenCV", contexts: PERSONAL, lastUsed: TFM_END },
    ],
  },
  {
    id: "ops",
    title: { es: "Infraestructura y herramientas", en: "Infrastructure and tooling" },
    items: [
      { name: "Docker", contexts: BOTH, lastUsed: null },
      { name: "AWS CDK", contexts: PERSONAL, lastUsed: null },
      { name: "GitHub Actions", contexts: BOTH, lastUsed: null },
      { name: "Git", contexts: BOTH, lastUsed: null },
      { name: "Jest", contexts: BOTH, lastUsed: null },
      { name: "Vitest", contexts: PERSONAL, lastUsed: null },
      { name: "n8n", contexts: WORK, lastUsed: REBOOT_END },
    ],
  },
];
