/**
 * Whether a technology counts as used in the last year. `lastUsed` is "YYYY-MM" (the last month
 * of use), `null` while in use, or `undefined` when no source says (never recent). A month
 * counts while fewer than twelve whole months have passed: on 2 November 2026, "2025-11" is
 * still recent and "2025-10" is not.
 */
export function isRecent(lastUsed: string | null | undefined, now: Date): boolean {
  if (lastUsed === null) return true;
  if (lastUsed === undefined) return false;
  const [year = 0, month = 0] = lastUsed.split("-").map(Number);
  const monthsAgo = (now.getFullYear() - year) * 12 + (now.getMonth() + 1 - month);
  return monthsAgo <= 12;
}
