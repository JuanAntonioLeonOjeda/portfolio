import { ChevronDown } from "lucide-react";

import { pick, type Project } from "@/content/types";
import { useLanguage } from "@/features/shell";

import { hueStyle } from "./hue";
import styles from "./Projects.module.css";

/** The card shows only the first technologies: `stack` lists the most important first. */
export const MAIN_STACK_SIZE = 4;

interface ProjectCardProps {
  project: Project;
  isOpen: boolean;
  /** Id of the region the button opens. */
  controls: string;
  onToggle: () => void;
}

/**
 * A folded project: its tag, name, short description and main technologies. The name is the button
 * (inside the heading, the accordion pattern); its hit area covers the whole card.
 */
export function ProjectCard({
  project,
  isOpen,
  controls,
  onToggle,
}: ProjectCardProps): React.JSX.Element {
  const lang = useLanguage();

  return (
    <article className={styles.card} style={hueStyle(project)} data-open={isOpen}>
      <p className={styles.tag}>{pick(project.tag, lang)}</p>
      <h3>
        <button
          type="button"
          id={`${project.id}-card`}
          className={styles.cardButton}
          aria-expanded={isOpen}
          aria-controls={controls}
          onClick={onToggle}
        >
          {project.name}
          <ChevronDown aria-hidden size={20} className={styles.chevron} />
        </button>
      </h3>
      <p className={styles.cardTagline}>{pick(project.tagline, lang)}</p>
      <ul className={styles.stack}>
        {project.stack.slice(0, MAIN_STACK_SIZE).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
