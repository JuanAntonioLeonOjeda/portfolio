import type { Profile } from "./types";

/**
 * Source: the author's CV (ai-job-search/documents/cv). The phone number in the CV is left out
 * on purpose: this page is public (see AGENTS.md, "What not to do").
 */
export const profile: Profile = {
  name: { given: "Juan Antonio", family: "León Ojeda" },
  role: {
    es: "Desarrollador full-stack",
    en: "Full-stack developer",
  },
  summary: {
    es: "Hago aplicaciones web y móviles de principio a fin, ahora en PowerBIM. Vengo de la ingeniería mecánica y de enseñar a programar, y estoy terminando un máster en inteligencia artificial con un TFM de deep learning sobre radiografías.",
    en: "I build web and mobile apps end to end, currently at PowerBIM. I come from mechanical engineering and from teaching people to code, and I am finishing a master's degree in artificial intelligence with a deep-learning thesis on X-rays.",
  },
  email: "jalojr70@gmail.com",
  github: "https://github.com/JuanAntonioLeonOjeda",
  linkedin: "https://www.linkedin.com/in/juan-antonio-leon-ojeda/",
};
