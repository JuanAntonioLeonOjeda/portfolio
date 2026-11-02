import type { Messages } from "./es";

/** The English mirror of es.ts: the type makes a missing key a compile error. */
export const en: Messages = {
  app: {
    skipToContent: "Skip to content",
    description:
      "Portfolio of Juan Antonio León Ojeda, full-stack developer: personal and professional projects, experience, education and stack.",
  },
  nav: {
    label: "Sections",
    projects: "Personal",
    work: "Professional",
    experience: "Experience",
    education: "Education",
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
    heading: "Personal projects",
    lead: "My master's thesis and what I am building now, each one to learn something specific.",
    highlightsHeading: "What is interesting",
    stackLabel: "Technologies",
    site: "Visit the site",
    siteSoon: "Website coming soon",
    previewSoon: "Preview coming soon",
    privateRepo: "Private repository",
    phases: (done: number, total: number): string => `${done} of ${total} phases done`,
  },
  workProjects: {
    heading: "Professional projects",
    lead: "What I have built at work, at Reboot Academy and PowerBIM.",
    features: "Main features",
    stack: "Stack",
    others: "Other projects",
    count: (n: number): string => (n === 1 ? "1 project" : `${n} projects`),
  },
  experience: {
    heading: "Experience",
    lead: "From technical sales to software, by way of teaching.",
    chartLabel: "Timeline of jobs",
  },
  education: {
    heading: "Education",
    lead: "From mechanical engineering to artificial intelligence.",
    chartLabel: "Timeline of studies",
  },
  career: {
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
