---
description: Testing conventions — Vitest and Testing Library, content consistency, pure logic and page behaviour.
---

# Testing conventions

## Tools

- **Vitest** with **Testing Library** (`@testing-library/react`, `user-event`); query by role
  and accessible name.
- No snapshot tests of whole pages.

## What must be tested

- **Content consistency** (`src/content/content.test.ts`): see
  `.claude/rules/content-authoring.md`, "Checks". A new kind of fact gets a new check.
- **Pure logic** (`src/features/career/timeline.test.ts`): against hand-computed values.
- **Page** (`src/app/App.test.tsx`): every section and project rendered, header links reach
  real anchors, language switch (and it is remembered), theme toggle, external links.

## Determinism

- No network. Dates passed in explicitly to pure functions; components read the clock once.

## Before saying something is done

`pnpm lint && pnpm typecheck && pnpm test && pnpm build`, plus a Docker rebuild (see
`project-policies.md`).
