import { Moon, Sun } from "lucide-react";

import { profile } from "@/content/profile";
import type { Lang } from "@/content/types";

import { setLanguage, useLanguage, useMessages } from "./language";
import styles from "./Shell.module.css";
import { setTheme, useTheme } from "./theme";

const LANGUAGES: readonly { lang: Lang; label: string; name: string }[] = [
  { lang: "es", label: "ES", name: "Español" },
  { lang: "en", label: "EN", name: "English" },
];

const SECTIONS = ["projects", "career", "stack", "contact"] as const;

export function Header(): React.JSX.Element {
  const t = useMessages();

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <a href="#top" className={styles.brand}>
          {profile.name.given} {profile.name.family}
        </a>
        <nav aria-label={t.nav.label} className={styles.nav}>
          <ul>
            {SECTIONS.map((id) => (
              <li key={id}>
                <a href={`#${id}`}>{t.nav[id]}</a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.tools}>
          <LanguageSwitch />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function LanguageSwitch(): React.JSX.Element {
  const t = useMessages();
  const current = useLanguage();

  return (
    <div role="group" aria-label={t.shell.languageLabel} className={styles.segmented}>
      {LANGUAGES.map(({ lang, label, name }) => (
        <button
          key={lang}
          type="button"
          lang={lang}
          aria-label={name}
          aria-pressed={lang === current}
          onClick={() => {
            setLanguage(lang);
          }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function ThemeToggle(): React.JSX.Element {
  const t = useMessages();
  const isDark = useTheme() === "dark";

  return (
    <button
      type="button"
      className={styles.iconButton}
      aria-label={isDark ? t.shell.themeToLight : t.shell.themeToDark}
      onClick={() => {
        setTheme(isDark ? "light" : "dark");
      }}
    >
      {isDark ? <Sun aria-hidden size={18} /> : <Moon aria-hidden size={18} />}
    </button>
  );
}
