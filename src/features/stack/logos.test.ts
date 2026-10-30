import { readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

import { skills } from "@/content/career";

import { contrastRatio, legibleColour, MIN_LOGO_CONTRAST } from "./colour";
import { LOGOS, THEME_COLOURS } from "./logos";

describe("contrastRatio", () => {
  it("is 21 for black on white and 1 for a colour on itself", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 5);
    expect(contrastRatio("#3178c6", "#3178c6")).toBe(1);
  });

  it("is symmetric", () => {
    expect(contrastRatio("#61dafb", "#f4f6f9")).toBe(contrastRatio("#f4f6f9", "#61dafb"));
  });
});

describe("legibleColour", () => {
  const { background, ink } = THEME_COLOURS.light;

  it("keeps a brand colour that is already legible", () => {
    // TypeScript blue on the light page: about 4.3:1.
    expect(legibleColour("#3178c6", background, ink)).toBe("#3178c6");
  });

  it("darkens a pale brand colour just enough on the light page", () => {
    const result = legibleColour("#61dafb", background, ink); // React cyan, ~1.5:1
    expect(result).not.toBe("#61dafb");
    expect(contrastRatio(result, background)).toBeGreaterThanOrEqual(MIN_LOGO_CONTRAST);
    expect(contrastRatio(result, background)).toBeLessThan(4);
  });

  it("lightens a near-black brand colour on the dark page", () => {
    const dark = THEME_COLOURS.dark;
    const result = legibleColour("#0a0a0a", dark.background, dark.ink); // Express
    expect(contrastRatio(result, dark.background)).toBeGreaterThanOrEqual(MIN_LOGO_CONTRAST);
  });
});

describe("LOGOS", () => {
  it("has a mark for every technology in the stack", () => {
    for (const group of skills) {
      for (const item of group.items) {
        expect(LOGOS[item], item).toBeDefined();
      }
    }
  });

  it("makes every brand mark legible in both themes", () => {
    for (const [name, logo] of Object.entries(LOGOS)) {
      if (logo.kind !== "brand") continue;
      expect(
        contrastRatio(logo.light, THEME_COLOURS.light.background),
        name,
      ).toBeGreaterThanOrEqual(MIN_LOGO_CONTRAST);
      expect(contrastRatio(logo.dark, THEME_COLOURS.dark.background), name).toBeGreaterThanOrEqual(
        MIN_LOGO_CONTRAST,
      );
    }
  });

  it("uses the same background and ink as the design tokens", () => {
    // Vitest runs from the project root and does not process CSS imports, so the file is read.
    const tokens = readFileSync("src/design/tokens.css", "utf8");
    const [light = "", dark = ""] = tokens.split(':root[data-theme="dark"]');
    expect(light).toContain(`--color-bg: ${THEME_COLOURS.light.background};`);
    expect(light).toContain(`--color-ink: ${THEME_COLOURS.light.ink};`);
    expect(dark).toContain(`--color-bg: ${THEME_COLOURS.dark.background};`);
    expect(dark).toContain(`--color-ink: ${THEME_COLOURS.dark.ink};`);
  });
});
