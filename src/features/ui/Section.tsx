import type { ReactNode } from "react";

import styles from "./Section.module.css";

interface SectionProps {
  id: string;
  heading: string;
  lead?: string;
  children: ReactNode;
}

/** A page section reachable from the header: the id is the anchor, the heading names it. */
export function Section({ id, heading, lead, children }: SectionProps): React.JSX.Element {
  const headingId = `${id}-heading`;

  return (
    <section id={id} aria-labelledby={headingId} className={styles.section}>
      <header className={styles.header}>
        <h2 id={headingId}>{heading}</h2>
        {lead !== undefined && <p>{lead}</p>}
      </header>
      {children}
    </section>
  );
}
