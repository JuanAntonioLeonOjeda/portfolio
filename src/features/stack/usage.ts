import type { Skill, SkillGroup } from "@/content/types";

/** The columns of the stack tables: where a technology has been used. */
export type UsageColumn = "work" | "both" | "personal";

export const USAGE_COLUMNS: readonly UsageColumn[] = ["work", "both", "personal"];

/** `null` when no source says where it was used: it goes in no column. */
export function columnOf(skill: Skill): UsageColumn | null {
  const isWork = skill.contexts.includes("work");
  const isPersonal = skill.contexts.includes("personal");
  if (isWork && isPersonal) return "both";
  if (isWork) return "work";
  if (isPersonal) return "personal";
  return null;
}

export interface UsageRow {
  readonly group: SkillGroup;
  readonly cells: Readonly<Record<UsageColumn, readonly Skill[]>>;
}

export interface UsageTable {
  /** Only the columns with something in them, in the order of USAGE_COLUMNS. */
  readonly columns: readonly UsageColumn[];
  /** Only the groups with something in them, in the content's order. */
  readonly rows: readonly UsageRow[];
  /** Skills that pass the filter but have no context. */
  readonly unplaced: readonly Skill[];
}

/** One table (groups × columns) of the skills that pass `include`, e.g. "used in the last year". */
export function buildUsageTable(
  groups: readonly SkillGroup[],
  include: (skill: Skill) => boolean,
): UsageTable {
  const rows: UsageRow[] = [];
  const unplaced: Skill[] = [];
  for (const group of groups) {
    const cells: Record<UsageColumn, Skill[]> = { work: [], both: [], personal: [] };
    for (const skill of group.items.filter(include)) {
      const column = columnOf(skill);
      if (column === null) unplaced.push(skill);
      else cells[column].push(skill);
    }
    if (USAGE_COLUMNS.some((column) => cells[column].length > 0)) rows.push({ group, cells });
  }
  const columns = USAGE_COLUMNS.filter((column) =>
    rows.some((row) => row.cells[column].length > 0),
  );
  return { columns, rows, unplaced };
}
