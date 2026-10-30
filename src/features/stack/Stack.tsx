import { skills } from "@/content/career";
import { pick } from "@/content/types";
import { useLanguage, useMessages } from "@/features/shell";
import { Section } from "@/features/ui";

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
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
