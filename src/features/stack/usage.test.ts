import { describe, expect, it } from "vitest";

import type { Skill, SkillGroup } from "@/content/types";

import { buildUsageTable, columnOf } from "./usage";

const skill = (name: string, contexts: Skill["contexts"], lastUsed?: string | null): Skill =>
  lastUsed === undefined ? { name, contexts } : { name, contexts, lastUsed };

describe("columnOf", () => {
  it("places a skill by where it was used", () => {
    expect(columnOf(skill("a", ["work"]))).toBe("work");
    expect(columnOf(skill("b", ["personal"]))).toBe("personal");
    expect(columnOf(skill("c", ["work", "personal"]))).toBe("both");
    expect(columnOf(skill("d", []))).toBeNull();
  });
});

describe("buildUsageTable", () => {
  const groups: SkillGroup[] = [
    {
      id: "front",
      title: { es: "Front", en: "Front" },
      items: [skill("React", ["work", "personal"], null), skill("Vue", ["work"], "2025-08")],
    },
    {
      id: "data",
      title: { es: "Datos", en: "Data" },
      items: [skill("MySQL", ["work"], "2025-08"), skill("n8n", [])],
    },
  ];

  it("keeps only the rows and columns with something in them", () => {
    const recent = buildUsageTable(groups, (s) => s.lastUsed === null);
    expect(recent.columns).toEqual(["both"]);
    expect(recent.rows.map((row) => row.group.id)).toEqual(["front"]);
    expect(recent.rows[0]?.cells.both.map((s) => s.name)).toEqual(["React"]);
  });

  it("sets apart what has no context instead of guessing a column", () => {
    const earlier = buildUsageTable(groups, (s) => s.lastUsed !== null);
    expect(earlier.columns).toEqual(["work"]);
    expect(earlier.rows.map((row) => row.group.id)).toEqual(["front", "data"]);
    expect(earlier.unplaced.map((s) => s.name)).toEqual(["n8n"]);
  });
});
