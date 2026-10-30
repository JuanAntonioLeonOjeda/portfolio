import { Mail } from "lucide-react";

import { profile } from "@/content/profile";
import { useMessages } from "@/features/shell";
import { ExternalLink, Section } from "@/features/ui";

import styles from "./Contact.module.css";

export function Contact(): React.JSX.Element {
  const t = useMessages();

  return (
    <Section id="contact" heading={t.contact.heading} lead={t.contact.lead}>
      <p>
        <a href={`mailto:${profile.email}`} className={styles.email}>
          <Mail aria-hidden size="0.8em" />
          {profile.email}
        </a>
      </p>
      <ul className={styles.links}>
        <li>
          <ExternalLink href={profile.github}>{t.contact.github}</ExternalLink>
        </li>
        <li>
          <ExternalLink href={profile.linkedin}>{t.contact.linkedin}</ExternalLink>
        </li>
      </ul>
    </Section>
  );
}
