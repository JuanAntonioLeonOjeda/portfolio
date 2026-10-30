import type { CSSProperties } from "react";

import { skills } from "@/content/career";
import { pick } from "@/content/types";
import { useLanguage, useMessages } from "@/features/shell";
import { Section } from "@/features/ui";

import { LOGOS } from "./logos";
import styles from "./Stack.module.css";

/** A spec sheet: one ruled line per group, the group on the left and its tools on the right. */
export function Stack(): React.JSX.Element {
  const lang = useLanguage();
  const t = useMessages();

  return (
    <Section id="stack" heading={t.stack.heading} lead={t.stack.lead}>
      <dl className={styles.sheet}>
        {skills.map((group) => (
          <div key={group.id} className={styles.line}>
            <dt>{pick(group.title, lang)}</dt>
            <dd>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>
                    <TechLogo name={item} />
                    {item}
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

/** Decorative: the technology's name is written next to it. */
function TechLogo({ name }: { name: string }): React.JSX.Element | null {
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
