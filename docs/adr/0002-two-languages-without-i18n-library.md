# ADR-0002: Spanish and English without an i18n library

- **Status:** Proposed
- **Date:** 2026-10-30

## Context

The site must be in Spanish and English (the author's choice). It is one page with about forty
UI strings and a few dozen content texts. No plurals beyond "N of M", no dates to localise
beyond years.

## Options considered

### Option A — Typed message objects and `Localized` content, no library

- Pros: zero dependencies; `en.ts` typed as `Messages`, so a missing key fails the build;
  content keeps both languages side by side, which makes a mismatch easy to spot in review;
  the language lives in `<html lang>` and is set before first paint.
- Cons: no ICU message format; one URL for both languages, so search engines index only the
  default (Spanish) text.

### Option B — react-i18next (or similar)

- Pros: plurals, interpolation, lazy-loaded namespaces, language detection.
- Cons: a dependency and a runtime for needs this page does not have; keys as strings are not
  checked by the compiler unless extra typing is set up.

### Option C — One route per language (`/es/`, `/en/`)

- Pros: each language indexable with `hreflang`.
- Cons: needs a router or two HTML entries and a redirect on GitHub Pages.

## Decision

Option A, recommended by the assistant (the author delegated it). The page is small enough
that a library would cost more than it saves, and the compiler check on `en.ts` covers the
main risk (a missing translation).

## Consequences

- What gets easier: adding a string is one line per language; tests read the same objects.
- What gets harder / what we accept: English is not separately indexed.
- What would make us revisit this: SEO in English becomes important (→ Option C), or a
  third language or real pluralisation appears (→ Option B).

## Verification

- `pnpm typecheck` fails if `en.ts` lacks a key of `es.ts` (`en: Messages`).
- `src/app/App.test.tsx` switches to English and checks `<html lang>` and the stored choice.
