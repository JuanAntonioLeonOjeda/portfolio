---
description: TypeScript and React code style — strictness, lint/format, errors, accessibility basics and comments.
---

# Code style

Complements `naming-conventions.md`, `import-conventions.md` and `atomic-functions-solid.md`.

## Language

Code, identifiers, comments, commits, ADRs and specs in **English**. Visitor-facing strings
in Spanish and English: UI chrome in `src/i18n/`, content in `src/content/`.

## TypeScript

- `strict: true`, plus `noUncheckedIndexedAccess`, `noImplicitOverride`,
  `exactOptionalPropertyTypes`, `noFallthroughCasesInSwitch`.
- No `any`. Unknown external data (localStorage, attributes) is narrowed at the edge.
- No non-null assertions (`!`); model the absence (`?? fallback`).
- Explicit return types on exported functions; discriminated unions for states
  (`ProjectStatus`); exhaustive `switch` with a `never` check.

## React

- Function components and hooks. State as local as possible; derive instead of duplicating.
- External stores (theme, language) are read with `useSyncExternalStore`.
- No effects to derive state. Impure reads (`new Date()`) happen once, in a `useState`
  initialiser or at module level.
- No inline colours or sizes in components: tokens from `src/design/` (inline `style` that
  sets a token-based custom property, like `--hue`, or a computed position is fine).

## Accessibility basics (reviewed by `accessibility-reviewer`)

- Semantic HTML first (`section` + heading, `nav`, `ol`, `dl`); ARIA only to fill gaps.
- Visible focus, keyboard operation for everything interactive, contrast per WCAG 2.2 AA in
  light and dark. Targets at least 24×24 px.
- Colour is never the only cue (shape in the timeline, text next to the phase meter).
  Decorative duplicates of visible text are `aria-hidden`. Respect `prefers-reduced-motion`.
- External links open in a new tab and say so to screen readers (`ExternalLink`).

## Format and lint

- Prettier (print width 100) and ESLint (typescript-eslint type-aware, `react-hooks`,
  `jsx-a11y` strict). Zero warnings. No `eslint-disable` without a justification in the same
  comment.

## Errors

- Never an empty `catch` without a comment saying why it is safe (blocked storage).

## Comments

- Comment the **why**: layout tricks, accessibility decisions, ADR links, sources of facts.
- No commented-out code. `TODO` only with enough context to resume it.
