import type { CSSProperties } from "react";

import { LOGOS } from "./logos";
import styles from "./TechLogo.module.css";

/** A technology's logo, sized to the text. Decorative: the name is always written next to it. */
export function TechLogo({ name }: { name: string }): React.JSX.Element | null {
  const logo = LOGOS[name];
  if (logo === undefined) return null;

  if (logo.kind === "generic") {
    const Icon = logo.icon;
    return <Icon aria-hidden className={styles.logo} />;
  }

  const colours = { "--logo-light": logo.light, "--logo-dark": logo.dark } as CSSProperties;
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={styles.logo} data-brand style={colours}>
      <path d={logo.path} />
    </svg>
  );
}
