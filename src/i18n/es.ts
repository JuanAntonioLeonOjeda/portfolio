/**
 * Every user-facing string of the page chrome, in Spanish (the source language). Content
 * (projects, work projects, experience, education, skills) lives in src/content/ with both languages side by side.
 */
export const es = {
  app: {
    skipToContent: "Saltar al contenido",
    description:
      "Portfolio de Juan Antonio León Ojeda, desarrollador full-stack: proyectos personales y profesionales, experiencia, formación y stack.",
  },
  nav: {
    label: "Secciones",
    projects: "Personales",
    work: "Profesionales",
    experience: "Experiencia",
    education: "Formación",
    stack: "Stack",
    contact: "Contacto",
  },
  shell: {
    themeToLight: "Cambiar a tema claro",
    themeToDark: "Cambiar a tema oscuro",
    languageLabel: "Idioma",
    footer: "Hecho con React y Vite, con ayuda de Claude Code. Sin cookies ni analítica.",
  },
  hero: {
    contact: "Escríbeme",
  },
  projects: {
    heading: "Proyectos personales",
    lead: "El TFM del máster y lo que estoy construyendo ahora, cada uno para aprender algo concreto.",
    highlightsHeading: "Lo interesante",
    stackLabel: "Tecnologías",
    site: "Ver la web",
    siteSoon: "Web próximamente",
    previewSoon: "Vista previa próximamente",
    privateRepo: "Repositorio privado",
    phases: (done: number, total: number): string => `${done} de ${total} fases terminadas`,
  },
  workProjects: {
    heading: "Proyectos profesionales",
    lead: "Lo que he construido en el trabajo, en Reboot Academy y en PowerBIM.",
    features: "Funcionalidades principales",
    stack: "Stack",
    count: (n: number): string => (n === 1 ? "1 proyecto" : `${n} proyectos`),
  },
  experience: {
    heading: "Experiencia",
    lead: "De técnico comercial a desarrollador, pasando por la docencia.",
    chartLabel: "Cronología de trabajos",
  },
  education: {
    heading: "Formación",
    lead: "De la ingeniería mecánica a la inteligencia artificial.",
    chartLabel: "Cronología de estudios",
  },
  /** Shared by both timelines. */
  career: {
    present: "hoy",
    kinds: { work: "Trabajo", teaching: "Trabajo y docencia", study: "Formación" },
    legend: "Leyenda",
  },
  stack: {
    heading: "Stack",
    lead: "Arriba, lo que he usado en el último año; debajo, las anteriores. Por columnas, si ha sido en el trabajo, en mis proyectos o en ambos.",
    recent: "Último año",
    earlier: "Anteriores",
    columns: { work: "Profesional", both: "Profesional y personal", personal: "Personal" },
    unplaced: "También:",
  },
  contact: {
    heading: "Hablemos",
    lead: "Si tienes un proyecto, un puesto o una duda sobre algo de lo que hay aquí, escríbeme.",
    github: "GitHub",
    linkedin: "LinkedIn",
    external: "(se abre en otra pestaña)",
  },
};

export type Messages = typeof es;
