/**
 * Placement of career entries on a horizontal year axis (the Gantt chart in Career.tsx).
 *
 * Years are coarse (the CV says "2018 – 2021"), so an entry covers [start, end) with both ends
 * on 1 January: consecutive entries touch without overlapping. An ongoing entry ends at `now`,
 * a fractional year. The axis starts at `from`; anything earlier is clipped to the left edge
 * and flagged, so the chart does not spend half its width on the degree.
 */

export interface TimelineAxis {
  readonly from: number;
  readonly to: number;
  readonly ticks: readonly number[];
}

export interface TimelineSpan {
  readonly start: number;
  readonly end: number | null;
}

export interface TimelineBar {
  /** Offset and width as percentages of the axis. */
  readonly left: number;
  readonly width: number;
  readonly startsBefore: boolean;
  readonly isOngoing: boolean;
}

/** The current moment as a fractional year: 30 October 2026 → ≈ 2026.83. */
export function fractionalYear(date: Date): number {
  const year = date.getFullYear();
  const startOfYear = new Date(year, 0, 1).getTime();
  const startOfNext = new Date(year + 1, 0, 1).getTime();
  return year + (date.getTime() - startOfYear) / (startOfNext - startOfYear);
}

/** One tick per year, from `from` to the first whole year after `now`. */
export function createAxis(from: number, now: number): TimelineAxis {
  const to = Math.floor(now) + 1;
  const ticks = Array.from({ length: to - from + 1 }, (_, i) => from + i);
  return { from, to, ticks };
}

/** Position of a year on the axis, as a percentage clamped to [0, 100]. */
export function positionOf(year: number, axis: TimelineAxis): number {
  const ratio = (year - axis.from) / (axis.to - axis.from);
  return Math.min(100, Math.max(0, ratio * 100));
}

export function placeSpan(span: TimelineSpan, axis: TimelineAxis, now: number): TimelineBar {
  const isOngoing = span.end === null;
  const left = positionOf(span.start, axis);
  const right = positionOf(span.end ?? now, axis);
  return {
    left,
    width: right - left,
    startsBefore: span.start < axis.from,
    isOngoing,
  };
}
