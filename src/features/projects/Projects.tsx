import { useState } from "react";

import { projects } from "@/content/projects";
import { useMessages } from "@/features/shell";
import { Section } from "@/features/ui";

import { ProjectCard } from "./ProjectCard";
import { ProjectDetail } from "./ProjectDetail";
import styles from "./Projects.module.css";

/** The one place the open project's details render, below the row of cards. */
const DETAIL_ID = "project-detail";

/**
 * The projects as one row of cards; choosing a card unfolds its details below the row (a
 * disclosure: one project open at a time, the same card closes it).
 */
export function Projects(): React.JSX.Element {
  const t = useMessages();
  const [openId, setOpenId] = useState<string | null>(null);
  const open = projects.find((project) => project.id === openId);

  return (
    <Section id="projects" heading={t.projects.heading} lead={t.projects.lead}>
      <ul className={styles.cards}>
        {projects.map((project) => (
          <li key={project.id}>
            <ProjectCard
              project={project}
              isOpen={project.id === openId}
              controls={DETAIL_ID}
              onToggle={() => {
                setOpenId((current) => (current === project.id ? null : project.id));
              }}
            />
          </li>
        ))}
      </ul>
      <div id={DETAIL_ID} hidden={open === undefined}>
        {open !== undefined && <ProjectDetail key={open.id} project={open} />}
      </div>
    </Section>
  );
}
