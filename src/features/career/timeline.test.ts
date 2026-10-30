import { describe, expect, it } from "vitest";

import { createAxis, fractionalYear, placeSpan, positionOf } from "./timeline";

describe("fractionalYear", () => {
  it("is the whole year on 1 January", () => {
    expect(fractionalYear(new Date(2026, 0, 1))).toBe(2026);
  });

  it("is about halfway on 2 July", () => {
    // 2026 is not a leap year: 2 July is day 182 of 365. Local dates: a daylight-saving
    // shift moves the result by one hour (~0.0001 of a year), hence 3 decimals.
    expect(fractionalYear(new Date(2026, 6, 2))).toBeCloseTo(2026 + 182 / 365, 3);
  });
});

describe("createAxis", () => {
  it("ends at the first whole year after now and ticks every year", () => {
    const axis = createAxis(2017, 2026.83);
    expect(axis.to).toBe(2027);
    expect(axis.ticks).toEqual([2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027]);
  });

  it("still leaves room after now on 1 January", () => {
    expect(createAxis(2017, 2026).to).toBe(2027);
  });
});

describe("positionOf", () => {
  const axis = createAxis(2017, 2026.5); // 2017 → 2027, 10 years

  it("maps the axis ends to 0 and 100", () => {
    expect(positionOf(2017, axis)).toBe(0);
    expect(positionOf(2027, axis)).toBe(100);
  });

  it("is linear in between", () => {
    expect(positionOf(2022, axis)).toBe(50);
  });

  it("clamps years outside the axis", () => {
    expect(positionOf(2006, axis)).toBe(0);
    expect(positionOf(2030, axis)).toBe(100);
  });
});

describe("placeSpan", () => {
  const now = 2026.5;
  const axis = createAxis(2017, now);

  it("places a closed span from 1 January to 1 January", () => {
    expect(placeSpan({ start: 2018, end: 2021 }, axis, now)).toEqual({
      left: 10,
      width: 30,
      startsBefore: false,
      isOngoing: false,
    });
  });

  it("makes consecutive spans touch without overlapping", () => {
    const first = placeSpan({ start: 2021, end: 2022 }, axis, now);
    const second = placeSpan({ start: 2022, end: 2025 }, axis, now);
    expect(first.left + first.width).toBe(second.left);
  });

  it("ends an ongoing span at now", () => {
    const bar = placeSpan({ start: 2025, end: null }, axis, now);
    expect(bar.isOngoing).toBe(true);
    expect(bar.left).toBe(80);
    expect(bar.width).toBeCloseTo(15, 10);
  });

  it("clips a span that starts before the axis and flags it", () => {
    const bar = placeSpan({ start: 2006, end: 2019 }, axis, now);
    expect(bar.startsBefore).toBe(true);
    expect(bar.left).toBe(0);
    expect(bar.width).toBe(20);
  });
});
