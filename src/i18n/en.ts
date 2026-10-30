import type { Messages } from "./es";

/** The English mirror of es.ts: the type makes a missing key a compile error. */
export const en: Messages = {
  app: {
    skipToContent: "Skip to content",
    description:
      "Portfolio of Juan Antonio León Ojeda, full-stack developer: projects, career and stack.",
  },
  nav: {
    label: "Sections",
    projects: "Projects",
    career: "Career",
    stack: "Stack",
    contact: "Contact",
  },
  shell: {
    themeToLight: "Switch to light theme",
    themeToDark: "Switch to dark theme",
    languageLabel: "Language",
    footer: "Built with React and Vite, with help from Claude Code. No cookies, no analytics.",
  },
  hero: {
    contact: "Get in touch",
  },
  projects: {
    heading: "Projects",
    lead: "My master's thesis and what I am building now, each one to learn something specific.",
    highlightsHeading: "What is interesting",
    stackLabel: "Technologies",
    site: "Visit the site",
    siteSoon: "Website coming soon",
    previewSoon: "Preview coming soon",
    privateRepo: "Private repository",
    phases: (done: number, total: number): string => `${done} of ${total} phases done`,
  },
  career: {
    heading: "Career",
    lead: "From mechanical engineering to software, by way of teaching.",
    chartLabel: "Timeline of studies and jobs",
    present: "now",
    kinds: { work: "Work", teaching: "Work and teaching", study: "Education" },
    legend: "Legend",
  },
  stack: {
    heading: "Stack",
    lead: "What I work with every day and what I have used in projects.",
  },
  contact: {
    heading: "Let's talk",
    lead: "If you have a project, a role or a question about anything here, write to me.",
    github: "GitHub",
    linkedin: "LinkedIn",
    external: "(opens in a new tab)",
  },
};
