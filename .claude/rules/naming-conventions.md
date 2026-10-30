---
description: Naming conventions for files, components, hooks, content ids, i18n keys and tokens.
---

# Naming conventions

- Components `PascalCase.tsx` with their `PascalCase.module.css`; hooks `useXxx.ts`;
  everything else `kebab-case.ts` (or a single lowercase word: `timeline.ts`).
- Content ids: short kebab-case, unique in their list (`energy-analyzer`, `powerbim`). A
  project id is also its heading's `id`.
- Section ids are English nouns that match the header links (`projects`, `career`, `stack`,
  `contact`).
- One main responsibility per file; `utils.ts` or `helpers.ts` is a smell.
- Tests next to the code: `<file>.test.ts(x)`.
- `PascalCase` types and components, `camelCase` variables and functions,
  `SCREAMING_SNAKE_CASE` only for true module constants.
- Booleans as affirmative questions: `isOngoing`, `isDark`, `startsBefore`.
- i18n keys: `area.element` (`projects.repo`, `career.present`).
- Design tokens: semantic names (`--color-task`, `--project-tfm`, `--career-study`), never
  `--yellow-300` in components.
