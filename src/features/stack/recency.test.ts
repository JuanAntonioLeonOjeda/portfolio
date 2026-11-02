import { describe, expect, it } from "vitest";

import { isRecent } from "./recency";

const now = new Date(2026, 10, 2); // 2 November 2026

describe("isRecent", () => {
  it("counts what is still in use", () => {
    expect(isRecent(null, now)).toBe(true);
  });

  it("never counts an unknown date", () => {
    expect(isRecent(undefined, now)).toBe(false);
  });

  it("counts the last twelve months, this one included", () => {
    expect(isRecent("2026-11", now)).toBe(true);
    expect(isRecent("2026-10", now)).toBe(true);
    expect(isRecent("2025-11", now)).toBe(true);
  });

  it("stops counting a month a year after it ended", () => {
    expect(isRecent("2025-10", now)).toBe(false);
    expect(isRecent("2025-08", now)).toBe(false);
  });
});
