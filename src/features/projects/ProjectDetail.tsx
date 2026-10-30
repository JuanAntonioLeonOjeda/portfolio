import { Globe, Image as ImageIcon } from "lucide-react";

import { pick, type Lang, type Project, type ProjectStatus } from "@/content/types";
import { useLanguage, useMessages } from "@/features/shell";
import { ExternalLink } from "@/features/ui";

import { hueStyle } from "./hue";
import styles from "./Projects.module.css";

/**
 * Everything about one project, unfolded below the row of cards. It is a region named by the
 * card's button; the name is repeated large but is not a heading (the card's `h3` is).
 */
export function ProjectDetail({ project }: { project: Project }): React.JSX.Element {
  const lang = useLanguage();

  return (
    <article
      className={styles.detail}
      style={hueStyle(project)}
      aria-labelledby={`${project.id}-card`}
    >
      <div className={styles.detailHead}>
        <div className={styles.detailTitle}>
          <StatusLabel status={project.status} />
          <p className={styles.detailName}>{project.name}</p>
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
      <div className={styles.detailBody}>
        <p>{pick(project.description, lang)}</p>
        <ProjectFacts project={project} lang={lang} />
      </div>
    </article>
  );
}

function ProjectFacts({ project, lang }: { project: Project; lang: Lang }): React.JSX.Element {
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
 * The screenshot, in a fixed 16:10 frame so the layout does not jump while it loads. Until a
 * project has one, the same frame says it is coming (and, on the dev server, where it goes).
 */
function ProjectPreview({ project, lang }: { project: Project; lang: Lang }): React.JSX.Element {
  const t = useMessages();

  if (project.preview === undefined) {
    return (
      <div className={styles.preview} data-placeholder>
        <ImageIcon aria-hidden size={28} />
        <p>{t.projects.previewSoon}</p>
        {/* Developer hint, never built into production: not translated on purpose. */}
        {import.meta.env.DEV && <code>public/projects/{project.id}.webp</code>}
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
      <li>
        {project.site !== undefined ? (
          <ExternalLink href={project.site} className={styles.siteLink}>
            {t.projects.site}
          </ExternalLink>
        ) : (
          // Same place and shape as the button, but not a link: there is nowhere to go yet.
          <span className={styles.siteLink} data-placeholder>
            <Globe aria-hidden size="1em" />
            {t.projects.siteSoon}
          </span>
        )}
      </li>
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
