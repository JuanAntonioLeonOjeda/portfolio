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
        <div className={styles.featuredTitle}>
          <StatusLabel status={project.status} />
          <h3 id={project.id}>{project.name}</h3>
          <p className={styles.tagline}>{pick(project.tagline, lang)}</p>
        </div>
        <ProjectPreview project={project} lang={lang} />
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
        <ProjectPreview project={project} lang={lang} />
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
      <ProjectLinks project={project} lang={lang} />
    </>
  );
}

/**
 * The screenshot, in a fixed 16:10 frame so the layout does not jump while it loads. Without
 * one, production shows nothing; the dev server shows where the file goes.
 */
function ProjectPreview({
  project,
  lang,
}: {
  project: Project;
  lang: Lang;
}): React.JSX.Element | null {
  if (project.preview === undefined) {
    if (!import.meta.env.DEV) return null;
    // Developer hint, never built into production: not translated on purpose.
    return (
      <div className={styles.preview} data-placeholder aria-hidden>
        public/projects/{project.id}.webp
      </div>
    );
  }

  return (
    <img
      className={styles.preview}
      src={`${import.meta.env.BASE_URL}${project.preview.file}`}
      alt={pick(project.preview.alt, lang)}
      loading="lazy"
      decoding="async"
    />
  );
}

/** The live site first (the highlighter's quieter sibling), then the code. */
function ProjectLinks({ project, lang }: { project: Project; lang: Lang }): React.JSX.Element {
  const t = useMessages();
  const code = project.code ?? [];

  return (
    <ul className={styles.links}>
      {project.site !== undefined && (
        <li>
          <ExternalLink href={project.site} className={styles.siteLink}>
            {t.projects.site}
          </ExternalLink>
        </li>
      )}
      {code.map((link) => (
        <li key={link.href}>
          <ExternalLink href={link.href}>{pick(link.label, lang)}</ExternalLink>
        </li>
      ))}
      {code.length === 0 && <li className={styles.private}>{t.projects.privateRepo}</li>}
    </ul>
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
