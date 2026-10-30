import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { career, skills } from "./career";
import { profile } from "./profile";
import { projects } from "./projects";
import type { Localized } from "./types";

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
    collectLocalized({ profile, projects, career, skills }, "content", found);
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
      if (project.repo !== undefined) {
        expect(project.repo.startsWith(`${profile.github}/`), project.id).toBe(true);
      }
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

  it("lists the career in chronological order with valid spans", () => {
    const starts = career.map((entry) => entry.start);
    expect(starts).toEqual([...starts].sort((a, b) => a - b));
    for (const entry of career) {
      if (entry.end !== null) {
        expect(entry.end, entry.id).toBeGreaterThan(entry.start);
      }
    }
  });

  it("does not publish a phone number", () => {
    const text = JSON.stringify({ profile, projects, career, skills });
    expect(text).not.toMatch(/\b[6-9]\d{2}\s?\d{3}\s?\d{3}\b/);
  });
});
