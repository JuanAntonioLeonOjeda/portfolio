import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { experience } from "@/content/career";
import {
  pick,
  type Lang,
  type MinorWorkProject,
  type WorkProject,
  type WorkProjectGroup,
} from "@/content/types";
import { workProjects } from "@/content/work-projects";
import { useLanguage, useMessages } from "@/features/shell";
import { TechLogo } from "@/features/stack";
import { Section } from "@/features/ui";

import styles from "./WorkProjects.module.css";

/** What I built at each job, grouped by employer in the order of the experience section. */
export function WorkProjects(): React.JSX.Element {
  const t = useMessages();

  return (
    <Section id="work" heading={t.workProjects.heading} lead={t.workProjects.lead}>
      <div className={styles.groups}>
        {workProjects.map((group) => (
          <Group key={group.id} group={group} />
        ))}
      </div>
    </Section>
  );
}

/**
 * One employer, folded: its name, years (from its `experience` entry, painted in that entry's
 * hue, as in the timeline) and how many projects it holds. Unfolded: the projects as cards and
 * the smaller ones as a list. A disclosure button inside the heading, like the personal cards.
 */
function Group({ group }: { group: WorkProjectGroup }): React.JSX.Element | null {
  const lang = useLanguage();
  const t = useMessages();
  const [isOpen, setIsOpen] = useState(false);
  const job = experience.find((entry) => entry.id === group.id);
  if (job === undefined) return null;

  const headingId = `work-${group.id}`;
  const panelId = `work-${group.id}-projects`;
  const count = group.projects.length + (group.others?.length ?? 0);

  return (
    <section
      className={styles.group}
      data-kind={job.kind}
      data-open={isOpen}
      aria-labelledby={headingId}
    >
      <h3 className={styles.groupHeading}>
        <button
          id={headingId}
          type="button"
          className={styles.groupButton}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => {
            setIsOpen((open) => !open);
          }}
        >
          <span className={styles.groupName}>{job.place}</span>
          <span className={styles.years}>
            {job.start} – {job.end ?? t.career.present}
          </span>
          <span className={styles.count}>{t.workProjects.count(count)}</span>
          <ChevronDown aria-hidden size={20} className={styles.chevron} />
        </button>
      </h3>
      <div id={panelId} className={styles.panel} hidden={!isOpen}>
        <ul className={styles.cards}>
          {group.projects.map((project) => (
            <li key={project.id}>
              <ProjectCard project={project} lang={lang} />
            </li>
          ))}
        </ul>
        {group.others !== undefined && <OtherProjects projects={group.others} lang={lang} />}
      </div>
    </section>
  );
}

function ProjectCard({ project, lang }: { project: WorkProject; lang: Lang }): React.JSX.Element {
  const t = useMessages();

  return (
    <article className={styles.card}>
      <h4>{pick(project.name, lang)}</h4>
      <p className={styles.description}>{pick(project.description, lang)}</p>
      <h5 className={styles.subheading}>{t.workProjects.features}</h5>
      <ul className={styles.features}>
        {project.features.map((feature) => (
          <li key={feature.en}>{pick(feature, lang)}</li>
        ))}
      </ul>
      <h5 className={styles.subheading}>{t.workProjects.stack}</h5>
      <StackList items={project.stack} />
    </article>
  );
}

function OtherProjects({
  projects,
  lang,
}: {
  projects: readonly MinorWorkProject[];
  lang: Lang;
}): React.JSX.Element {
  const t = useMessages();

  return (
    <div className={styles.others}>
      <h4 className={styles.subheading}>{t.workProjects.others}</h4>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <span className={styles.otherName}>{pick(project.name, lang)}</span>
            <StackList items={project.stack} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function StackList({ items }: { items: readonly string[] }): React.JSX.Element {
  return (
    <ul className={styles.stack}>
      {items.map((item) => (
        <li key={item}>
          <TechLogo name={item} />
          {item}
        </li>
      ))}
    </ul>
  );
}
