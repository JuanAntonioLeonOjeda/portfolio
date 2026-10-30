import { useState, type CSSProperties } from "react";

import { career } from "@/content/career";
import { pick, type CareerEntry, type CareerKind } from "@/content/types";
import { useLanguage, useMessages } from "@/features/shell";
import { Section } from "@/features/ui";

import styles from "./Career.module.css";
import { createAxis, fractionalYear, placeSpan, positionOf, type TimelineAxis } from "./timeline";

/** The degree started earlier; it shows as a clipped stub so the working years get the width. */
const AXIS_START = 2016;

const KINDS: readonly CareerKind[] = ["work", "teaching", "study"];

export function Career(): React.JSX.Element {
  const t = useMessages();
  // Read once per mount: the chart does not need to move while the page is open.
  const [now] = useState(() => fractionalYear(new Date()));
  const axis = createAxis(AXIS_START, now);

  const chartStyle = {
    "--steps": axis.ticks.length - 1,
    "--now": `${positionOf(now, axis)}%`,
  } as CSSProperties;

  return (
    <Section id="career" heading={t.career.heading} lead={t.career.lead}>
      <ul className={styles.legend} aria-label={t.career.legend}>
        {KINDS.map((kind) => (
          <li key={kind} data-kind={kind}>
            <span className={styles.swatch} aria-hidden />
            {t.career.kinds[kind]}
          </li>
        ))}
      </ul>
      <div className={styles.chart} style={chartStyle}>
        <Axis axis={axis} nowLabel={t.career.present} />
        <ol className={styles.rows} aria-label={t.career.chartLabel}>
          {career.map((entry) => (
            <CareerRow key={entry.id} entry={entry} axis={axis} now={now} />
          ))}
        </ol>
      </div>
    </Section>
  );
}

function Axis({ axis, nowLabel }: { axis: TimelineAxis; nowLabel: string }): React.JSX.Element {
  return (
    <div className={styles.axis} aria-hidden>
      <span />
      <div className={styles.ticks}>
        {axis.ticks.map((year) => (
          <span key={year} style={{ left: `${positionOf(year, axis)}%` }}>
            {/* Two-digit years from the second tick on: the axis stays legible on a tablet. */}
            {year === axis.from ? year : `’${String(year).slice(2)}`}
          </span>
        ))}
        <span className={styles.nowLabel}>{nowLabel}</span>
      </div>
    </div>
  );
}

interface CareerRowProps {
  entry: CareerEntry;
  axis: TimelineAxis;
  now: number;
}

function CareerRow({ entry, axis, now }: CareerRowProps): React.JSX.Element {
  const lang = useLanguage();
  const t = useMessages();
  const bar = placeSpan(entry, axis, now);
  const years = `${entry.start} – ${entry.end ?? t.career.present}`;

  return (
    <li className={styles.row} data-kind={entry.kind}>
      <div className={styles.label}>
        <h3>{pick(entry.title, lang)}</h3>
        <p className={styles.place}>{entry.place}</p>
        <p className={styles.years}>{years}</p>
        {entry.detail !== undefined && <p className={styles.detail}>{pick(entry.detail, lang)}</p>}
      </div>
      {/* The bar repeats the years written next to it. */}
      <div className={styles.track} aria-hidden>
        <span
          className={styles.bar}
          data-clipped={bar.startsBefore}
          data-ongoing={bar.isOngoing}
          style={{ left: `${bar.left}%`, width: `${bar.width}%` }}
        />
      </div>
    </li>
  );
}
