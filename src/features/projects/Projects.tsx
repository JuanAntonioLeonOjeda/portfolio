import type { CSSProperties } from "react";

import { projects } from "@/content/projects";
import { pick, type Lang, type Project, type ProjectStatus } from "@/content/types";
import { useLanguage, useMessages } from "@/features/shell";
import { ExternalLink, Section } from "@/features/ui";

import styles from "./Projects.module.css";

/** Each project paints itself with its own token pair (`--project-<hue>` and `-soft`). */
function hueStyle(project: Project): CSSProperties {
  return {
    "--hue": `var(--project-${project.hue})`,
    "--hue-soft": `var(--project-${project.hue}-soft)`,
  } as CSSProperties;
}

export function Projects(): React.JSX.Element {
  const t = useMessages();
  const [featured, ...rest] = projects;

  return (
    <Section id="projects" heading={t.projects.heading} lead={t.projects.lead}>
      {featured !== undefined && <FeaturedProject project={featured} />}
      <ul className={styles.list}>
        {rest.map((project) => (
          <li key={project.id}>
            <ProjectRow project={project} />
          </li>
        ))}
      </ul>
    </Section>
  );
}

function FeaturedProject({ project }: { project: Project }): React.JSX.Element {
  const lang = useLanguage();

  return (
    <article className={styles.featured} style={hueStyle(project)} aria-labelledby={project.id}>
      <div className={styles.featuredHead}>
        <StatusLabel status={project.status} />
        <h3 id={project.id}>{project.name}</h3>
        <p className={styles.tagline}>{pick(project.tagline, lang)}</p>
      </div>
      {project.stats !== undefined && (
        <dl className={styles.stats}>
          {project.stats.map((stat) => (
            <div key={stat.label.en}>
              <dt>{pick(stat.label, lang)}</dt>
              <dd>{pick(stat.value, lang)}</dd>
            </div>
          ))}
        </dl>
      )}
      <div className={styles.featuredBody}>
        <p>{pick(project.description, lang)}</p>
        <ProjectDetails project={project} lang={lang} />
      </div>
    </article>
  );
}

function ProjectRow({ project }: { project: Project }): React.JSX.Element {
  const lang = useLanguage();

  return (
    <article className={styles.row} style={hueStyle(project)} aria-labelledby={project.id}>
      <div className={styles.rowHead}>
        <h3 id={project.id}>{project.name}</h3>
        <p className={styles.tagline}>{pick(project.tagline, lang)}</p>
        <StatusLabel status={project.status} />
      </div>
      <div className={styles.rowBody}>
        <p>{pick(project.description, lang)}</p>
        <ProjectDetails project={project} lang={lang} />
      </div>
    </article>
  );
}

function ProjectDetails({ project, lang }: { project: Project; lang: Lang }): React.JSX.Element {
  const t = useMessages();

  return (
    <>
      <div>
        <h4 className={styles.subheading}>{t.projects.highlightsHeading}</h4>
        <ul className={styles.highlights}>
          {project.highlights.map((highlight) => (
            <li key={highlight.en}>{pick(highlight, lang)}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className={styles.subheading}>{t.projects.stackLabel}</h4>
        <ul className={styles.stack}>
          {project.stack.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <p className={styles.repo}>
        {project.repo !== undefined ? (
          <ExternalLink href={project.repo}>{t.projects.repo}</ExternalLink>
        ) : (
          t.projects.privateRepo
        )}
      </p>
    </>
  );
}

function StatusLabel({ status }: { status: ProjectStatus }): React.JSX.Element {
  const lang = useLanguage();
  const t = useMessages();

  switch (status.kind) {
    case "done":
    case "ongoing":
      return <p className={styles.status}>{pick(status.note, lang)}</p>;
    case "phases":
      return (
        <div className={styles.status}>
          {/* The segments repeat the sentence next to them, so they are hidden from AT. */}
          <span className={styles.meter} aria-hidden>
            {Array.from({ length: status.total }, (_, i) => (
              <span key={i} data-done={i < status.done} />
            ))}
          </span>
          <p>{t.projects.phases(status.done, status.total)}</p>
        </div>
      );
    default: {
      const unreachable: never = status;
      return unreachable;
    }
  }
}
