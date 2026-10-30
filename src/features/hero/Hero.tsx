import { profile } from "@/content/profile";
import { pick } from "@/content/types";
import { useLanguage, useMessages } from "@/features/shell";
import { ExternalLink } from "@/features/ui";

import styles from "./Hero.module.css";

export function Hero(): React.JSX.Element {
  const lang = useLanguage();
  const t = useMessages();

  return (
    <section id="top" aria-labelledby="hero-name" className={styles.hero}>
      <h1 id="hero-name" className={styles.name}>
        <span>{profile.name.given}</span> <span>{profile.name.family}</span>
      </h1>
      <div className={styles.body}>
        <p className={styles.role}>{pick(profile.role, lang)}</p>
        <p className={styles.summary}>{pick(profile.summary, lang)}</p>
        <div className={styles.actions}>
          <a href="#contact" className={styles.cta}>
            {t.hero.contact}
          </a>
          <ExternalLink href={profile.github} className={styles.link}>
            {t.contact.github}
          </ExternalLink>
          <ExternalLink href={profile.linkedin} className={styles.link}>
            {t.contact.linkedin}
          </ExternalLink>
        </div>
      </div>
    </section>
  );
}
