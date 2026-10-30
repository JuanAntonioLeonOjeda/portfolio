/**
 * Brand colours made legible on the page background. A logo keeps its brand hue unless it
 * would vanish (Express is near-black, Vitest near-neon): then it is mixed step by step toward
 * the theme's ink until it reaches the minimum contrast: 3:1, WCAG's bar for graphics. (At
 * 2:1 the near-black marks looked dim on the dark page.)
 */

export const MIN_LOGO_CONTRAST = 3;

type Rgb = readonly [number, number, number];

function parseHex(hex: string): Rgb {
  const value = Number.parseInt(hex.replace("#", ""), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}

function toHex(rgb: Rgb): string {
  return `#${rgb.map((c) => Math.round(c).toString(16).padStart(2, "0")).join("")}`;
}

/** sRGB channel (0–255) to linear light, per WCAG 2. */
function linear(channel: number): number {
  const s = channel / 255;
  return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

function luminance([r, g, b]: Rgb): number {
  return 0.2126 * linear(r) + 0.7152 * linear(g) + 0.0722 * linear(b);
}

/** WCAG 2 contrast ratio between two hex colours, from 1 to 21. */
export function contrastRatio(a: string, b: string): number {
  const la = luminance(parseHex(a));
  const lb = luminance(parseHex(b));
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

function mix(from: Rgb, to: Rgb, amount: number): Rgb {
  return [
    from[0] + (to[0] - from[0]) * amount,
    from[1] + (to[1] - from[1]) * amount,
    from[2] + (to[2] - from[2]) * amount,
  ];
}

/** The brand colour, or the closest mix toward `ink` (10% steps) that is legible on `background`. */
export function legibleColour(brand: string, background: string, ink: string): string {
  const from = parseHex(brand);
  const to = parseHex(ink);
  for (let step = 0; step <= 10; step++) {
    const candidate = toHex(mix(from, to, step / 10));
    if (contrastRatio(candidate, background) >= MIN_LOGO_CONTRAST) return candidate;
  }
  return ink;
}
