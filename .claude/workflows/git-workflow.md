---
description: Permanent branches (main, develop), branch naming, Conventional Commits and small atomic commits.
---

# Git workflow

## Permanent branches

| Branch    | Purpose                                                                             |
| --------- | ----------------------------------------------------------------------------------- |
| `main`    | Published: every push deploys to GitHub Pages. Only receives merges from `develop`. |
| `develop` | Integration branch. Every work branch starts from it and returns to it.             |

## Naming

| Kind of work                           | Branch                        | Example                           |
| -------------------------------------- | ----------------------------- | --------------------------------- |
| New or updated copy (projects, career) | `content/<kebab-description>` | `content/energy-analyzer-phase-3` |
| Site feature or section                | `feature/<kebab-description>` | `feature/project-detail-pages`    |
| Bug fix (also a wrong fact)            | `fix/<kebab-description>`     | `fix/tfm-auc-value`               |
| Config/tooling (`.claude/`, CI, deps)  | `chore/<kebab-description>`   | `chore/bump-vite`                 |
| Docs only                              | `docs/<kebab-description>`    | `docs/adr-i18n`                   |

## Commits

- **Conventional Commits**: `<type>(<scope>): <subject>`, imperative, English, ≤ 72 chars.
  Types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `build`, `perf`, `content`.
  Scopes: `content`, `i18n`, `ui`, `a11y`, `ci`, `adr`, `repo`.
- **Small and atomic**: one logical step per commit, building and passing tests on its own.
- Body when the why is not obvious; reference the ADR (`Refs: ADR-0002`).
- The assistant proposes commit messages and commits **only when the author asks**.

## What NOT to do

- No direct commits to `main`.
- No force-push to `develop` or `main`.
- Never commit the CV, a phone number or anything from `.env`.
