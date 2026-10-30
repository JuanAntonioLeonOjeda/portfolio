---
description: Import by alias, feature public entries only, no deep relative paths.
---

# Import conventions

- One alias, `@/` → `src/`. Relative imports only within the same folder (ESLint forbids
  `../`).
- A feature is imported through its `index.ts` (`@/features/shell`), never through its
  internal files.
- `src/content/` imports only its own `types.ts`: it is data, not UI.
- `import type` for type-only imports (enforced by `consistent-type-imports`).
- No barrel files outside feature entries.

## Why

Moving a file does not break importers, and the dependency direction
(`app → features → design/content/i18n`) is visible in the path.
