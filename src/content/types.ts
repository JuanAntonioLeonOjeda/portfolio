/** The two languages of the site. Spanish is the source; English mirrors it. */
export type Lang = "es" | "en";

/** A text written in both languages. Content always carries both (content.test.ts). */
export type Localized = Readonly<Record<Lang, string>>;

export function pick(text: Localized, lang: Lang): string {
  return text[lang];
}

export interface ExternalLink {
  readonly label: Localized;
  readonly href: string;
}

export interface Profile {
  readonly name: { readonly given: string; readonly family: string };
  readonly role: Localized;
  readonly summary: Localized;
  readonly email: string;
  readonly github: string;
  readonly linkedin: string;
}

/** Keys of the `--project-*` tokens in src/design/tokens.css. */
export type ProjectHue = "tfm" | "context" | "energy" | "ev" | "stocks";

export interface ProjectStat {
  readonly value: Localized;
  readonly label: Localized;
}

/** Phases are counted from the project's own roadmap, never estimated. */
export type ProjectStatus =
  | { readonly kind: "done"; readonly note: Localized }
  | { readonly kind: "phases"; readonly done: number; readonly total: number }
  | { readonly kind: "ongoing"; readonly note: Localized };

/**
 * A screenshot of the project. `file` is relative to `public/` (`projects/<id>.webp`) and is
 * served under the site's base path; content.test.ts checks the file exists.
 */
export interface ProjectPreview {
  readonly file: string;
  readonly alt: Localized;
}

export interface Project {
  readonly id: string;
  readonly name: string;
  readonly hue: ProjectHue;
  readonly tagline: Localized;
  readonly description: Localized;
  readonly highlights: readonly Localized[];
  /** Most important first: the folded card shows only the first four. */
  readonly stack: readonly string[];
  readonly status: ProjectStatus;
  readonly stats?: readonly ProjectStat[];
  readonly preview?: ProjectPreview;
  /** The project's public website or live demo (https). */
  readonly site?: string;
  /** Only public repositories: a private one is never linked. */
  readonly code?: readonly ExternalLink[];
}

/** Keys of the `--career-*` tokens. */
export type CareerKind = "work" | "teaching" | "study";

export interface CareerEntry {
  readonly id: string;
  readonly kind: CareerKind;
  readonly title: Localized;
  readonly place: string;
  readonly start: number;
  /** `null` while it is still going on. */
  readonly end: number | null;
  readonly detail?: Localized;
}

export interface SkillGroup {
  readonly id: string;
  readonly title: Localized;
  readonly items: readonly string[];
}
