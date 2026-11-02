import { useState, type CSSProperties } from "react";

import { skills } from "@/content/career";
import { pick, type Skill } from "@/content/types";
import { useLanguage, useMessages } from "@/features/shell";
import { Section } from "@/features/ui";

import { isRecent } from "./recency";
import styles from "./Stack.module.css";
import { TechLogo } from "./TechLogo";
import { buildUsageTable, type UsageTable } from "./usage";

/**
 * Two tables: what I have used in the last year, then what I used before. In each, a row per
 * group (languages, back-end…) and a column per context (professional, both, personal).
 */
export function Stack(): React.JSX.Element {
  const t = useMessages();
  // Read once per mount: whether something is recent does not change while the page is open.
  const [now] = useState(() => new Date());
  const recent = buildUsageTable(skills, (skill) => isRecent(skill.lastUsed, now));
  const earlier = buildUsageTable(skills, (skill) => !isRecent(skill.lastUsed, now));

  return (
    <Section id="stack" heading={t.stack.heading} lead={t.stack.lead}>
      <div className={styles.tables}>
        <UsageBlock table={recent} heading={t.stack.recent} />
        <UsageBlock table={earlier} heading={t.stack.earlier} isEarlier />
      </div>
    </Section>
  );
}

interface UsageBlockProps {
  table: UsageTable;
  heading: string;
  isEarlier?: boolean;
}

function UsageBlock({ table, heading, isEarlier = false }: UsageBlockProps): React.JSX.Element {
  const lang = useLanguage();
  const t = useMessages();

  return (
    <div className={styles.block} data-earlier={isEarlier}>
      <table
        className={styles.table}
        style={{ "--columns": table.columns.length } as CSSProperties}
      >
        <caption>{heading}</caption>
        <thead>
          <tr>
            <td />
            {table.columns.map((column) => (
              <th key={column} scope="col">
                {t.stack.columns[column]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row.group.id}>
              <th scope="row">{pick(row.group.title, lang)}</th>
              {table.columns.map((column) => (
                // The column's name is repeated for the stacked phone layout.
                <td key={column} data-column={t.stack.columns[column]}>
                  <SkillList items={row.cells[column]} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {table.unplaced.length > 0 && (
        <p className={styles.unplaced}>
          {t.stack.unplaced} {table.unplaced.map((skill) => skill.name).join(", ")}
        </p>
      )}
    </div>
  );
}

function SkillList({ items }: { items: readonly Skill[] }): React.JSX.Element | null {
  if (items.length === 0) return null;

  return (
    <ul className={styles.skills}>
      {items.map((item) => (
        <li key={item.name}>
          <TechLogo name={item.name} />
          {item.name}
        </li>
      ))}
    </ul>
  );
}
