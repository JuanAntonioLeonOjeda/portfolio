/**
 * Every user-facing string of the page chrome, in Spanish (the source language). Content
 * (projects, career, skills) lives in src/content/ with both languages side by side.
 */
export const es = {
  app: {
    skipToContent: "Saltar al contenido",
    description:
      "Portfolio de Juan Antonio León Ojeda, desarrollador full-stack: proyectos, trayectoria y stack.",
  },
  nav: {
    label: "Secciones",
    projects: "Proyectos",
    career: "Trayectoria",
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
    heading: "Proyectos",
    lead: "El TFM del máster y lo que estoy construyendo ahora, cada uno para aprender algo concreto.",
    highlightsHeading: "Lo interesante",
    stackLabel: "Tecnologías",
    repo: "Ver el código",
    privateRepo: "Repositorio privado",
    phases: (done: number, total: number): string => `${done} de ${total} fases terminadas`,
  },
  career: {
    heading: "Trayectoria",
    lead: "De la ingeniería mecánica al software, pasando por la docencia.",
    chartLabel: "Cronología de estudios y trabajos",
    present: "hoy",
    kinds: { work: "Trabajo", teaching: "Trabajo y docencia", study: "Formación" },
    legend: "Leyenda",
  },
  stack: {
    heading: "Stack",
    lead: "Con lo que trabajo a diario y lo que he usado en proyectos.",
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
