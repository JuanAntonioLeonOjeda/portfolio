import { existsSync, readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { education, experience, skills } from "./career";
import { profile } from "./profile";
import { projects } from "./projects";
import type { Localized } from "./types";
import { workProjects } from "./work-projects";

/** Every Localized value reachable from a content object, with its path for the message. */
function collectLocalized(value: unknown, path: string, found: [string, Localized][]): void {
  if (typeof value !== "object" || value === null) return;
  const keys = Object.keys(value);
  if (keys.length === 2 && keys.includes("es") && keys.includes("en")) {
    found.push([path, value as Localized]);
    return;
  }
  for (const [key, child] of Object.entries(value)) {
    collectLocalized(child, `${path}.${key}`, found);
  }
}

// Vitest runs from the project root and does not process CSS imports, so the file is read.
const tokens = readFileSync("src/design/tokens.css", "utf8");

describe("content", () => {
  it("has every text in both languages, none of them empty", () => {
    const found: [string, Localized][] = [];
    collectLocalized(
      { profile, projects, workProjects, experience, education, skills },
      "content",
      found,
    );
    expect(found.length).toBeGreaterThan(0);
    for (const [path, text] of found) {
      expect(text.es.trim(), `${path}.es`).not.toBe("");
      expect(text.en.trim(), `${path}.en`).not.toBe("");
    }
  });

  it("gives every project a unique id and a hue defined in the tokens", () => {
    const ids = projects.map((project) => project.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const project of projects) {
      expect(tokens, project.id).toContain(`--project-${project.hue}:`);
      expect(tokens, project.id).toContain(`--project-${project.hue}-soft:`);
    }
  });

  it("links only GitHub repositories of the author", () => {
    for (const project of projects) {
      for (const link of project.code ?? []) {
        expect(link.href.startsWith(`${profile.github}/`), project.id).toBe(true);
      }
    }
  });

  it("links project websites over https only", () => {
    for (const project of projects) {
      if (project.site !== undefined) {
        expect(new URL(project.site).protocol, project.id).toBe("https:");
      }
    }
  });

  it("has every declared preview in public/, named after its project", () => {
    for (const project of projects) {
      if (project.preview === undefined) continue;
      expect(project.preview.file, project.id).toMatch(
        new RegExp(`^projects/${project.id}\\.(webp|avif|png|jpg)$`),
      );
      expect(existsSync(`public/${project.preview.file}`), project.preview.file).toBe(true);
    }
  });

  it("counts project phases within their total", () => {
    for (const project of projects) {
      if (project.status.kind === "phases") {
        expect(project.status.done, project.id).toBeGreaterThanOrEqual(0);
        expect(project.status.done, project.id).toBeLessThanOrEqual(project.status.total);
      }
    }
  });

  it.each([
    ["experience", experience],
    ["education", education],
  ])("lists the %s in chronological order with valid spans", (_, entries) => {
    const starts = entries.map((entry) => entry.start);
    expect(starts).toEqual([...starts].sort((a, b) => a - b));
    for (const entry of entries) {
      if (entry.end !== null) {
        expect(entry.end, entry.id).toBeGreaterThan(entry.start);
      }
      if (entry.endMonth !== undefined) {
        expect(entry.end, entry.id).not.toBeNull();
        expect(entry.endMonth, entry.id).toBeGreaterThanOrEqual(1);
        expect(entry.endMonth, entry.id).toBeLessThanOrEqual(12);
      }
    }
  });

  it("ties each group of work projects to a job, in the order of the experience", () => {
    const jobs = experience.map((entry) => entry.id);
    const groups = workProjects.map((group) => group.id);
    for (const id of groups) {
      expect(jobs, id).toContain(id);
    }
    expect(groups).toEqual([...groups].sort((a, b) => jobs.indexOf(a) - jobs.indexOf(b)));
    const ids = workProjects.flatMap((group) => [
      ...group.projects.map((project) => project.id),
      ...(group.others ?? []).map((project) => project.id),
    ]);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("keeps work in experience and studies in education", () => {
    expect(experience.every((entry) => entry.kind !== "study")).toBe(true);
    expect(education.every((entry) => entry.kind === "study")).toBe(true);
  });

  it("dates and places every skill in a valid way", () => {
    for (const item of skills.flatMap((group) => group.items)) {
      expect(new Set(item.contexts).size, item.name).toBe(item.contexts.length);
      if (typeof item.lastUsed === "string") {
        expect(item.lastUsed, item.name).toMatch(/^\d{4}-(0[1-9]|1[0-2])$/);
      }
      // A date says when it was used, so it must also say where.
      if (item.lastUsed !== undefined) {
        expect(item.contexts.length, item.name).toBeGreaterThan(0);
      }
    }
  });

  it("does not publish a phone number", () => {
    const text = JSON.stringify({ profile, projects, workProjects, experience, education, skills });
    expect(text).not.toMatch(/\b[6-9]\d{2}\s?\d{3}\s?\d{3}\b/);
  });
});
