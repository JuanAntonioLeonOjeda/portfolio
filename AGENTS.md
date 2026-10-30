# AGENTS.md — Portfolio (personal site of Juan Antonio León Ojeda)

Route index.

Project context, scope, commands, the Docker rebuild rule and what not to do live in
`.claude/rules/project-policies.md`. How the assistant must collaborate (verify, explain,
practice mode) lives in `.claude/rules/ai-collaboration.md`. Both are always loaded with this
index. Writing the site's copy: `.claude/rules/content-authoring.md` (loaded when touching
`src/content/` or `src/i18n/`).

## Code map

Status: ⏳ planned (does not exist yet) · 🚧 in progress · ✅ done.
Update the status column when a change creates or finishes a path.

| Path                                                                | Content                                                                                                                                                                   | Status |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `package.json`, `pnpm-lock.yaml`, `vite.config.ts`, `tsconfig.json` | pnpm project, Vite (base path from `BASE_PATH` for GitHub Pages), strict TypeScript, `@/` alias                                                                           | ✅     |
| `src/content/`                                                      | the site's facts in both languages: `profile.ts`, `projects.ts` (featured first), `career.ts` (timeline and skills), `types.ts`; `content.test.ts`                        | ✅     |
| `src/design/`                                                       | tokens (light/dark, project hues, career hues, the "task" highlighter), base styles; fonts from `@fontsource-variable` (Geist, Figtree)                                   | ✅     |
| `src/i18n/`                                                         | every UI string: `es.ts` (source, defines `Messages`), `en.ts` (typed mirror), `index.ts`                                                                                 | ✅     |
| `src/app/`                                                          | the single page: skip link, header, sections, footer; `App.test.tsx`                                                                                                      | ✅     |
| `src/features/shell/`                                               | header (section nav, language switch, theme toggle), footer, theme and language stores (applied before first paint by `index.html`)                                       | ✅     |
| `src/features/hero/`                                                | the name, role, summary and the contact call to action                                                                                                                    | ✅     |
| `src/features/projects/`                                            | featured project (stats band) and project rows with a phase meter, a 16:10 preview (placeholder only on the dev server) and links to the live site and the code           | ✅     |
| `src/features/career/`                                              | the career as a Gantt chart on a year axis; `timeline.ts` (pure placement) and its tests                                                                                  | ✅     |
| `src/features/stack/`                                               | skills as a ruled spec sheet with logos: `logos.ts` (Simple Icons, generic icon when there is no honest one), `colour.ts` (brand colour made legible per theme) and tests | ✅     |
| `src/features/contact/`                                             | email, GitHub and LinkedIn                                                                                                                                                | ✅     |
| `src/features/ui/`                                                  | `Section`, `ExternalLink`                                                                                                                                                 | ✅     |
| `public/projects/`                                                  | project screenshots, `<id>.webp`, referenced from `projects.ts`                                                                                                           | ⏳     |
| `.github/workflows/deploy.yml`                                      | checks on every push/PR; build with the Pages base path and deploy `main` to GitHub Pages                                                                                 | ✅     |
| `Dockerfile`, `nginx.conf`, `docker-compose.yml`, `.dockerignore`   | local check of the real build: pnpm build, unprivileged nginx on 8080; host port `PORTFOLIO_PORT` (3200)                                                                  | ✅     |
| `docs/adr/`                                                         | ADRs, index and template                                                                                                                                                  | ✅     |
| `specs/`                                                            | specs and task lists of non-trivial changes (created with the first one)                                                                                                  | ⏳     |

Dependency rules: `.claude/rules/architecture.md` and `.claude/rules/import-conventions.md`.

## `.claude/` map and agent config

| Path                                         | What it holds                                                                                           |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `.claude/settings.json`                      | team permissions: allowed checks and Docker rebuild, `.env` blocked                                     |
| `.claude/rules/project-policies.md`          | what this is, content principles, commands, Docker rebuild rule, dependencies, language, what not to do |
| `.claude/rules/ai-collaboration.md`          | verify before writing, explain like a colleague, practice mode, small commits                           |
| `.claude/rules/architecture.md`              | layout, how content, i18n and sections fit together, dependency rules                                   |
| `.claude/rules/content-authoring.md`         | (path-scoped to `src/content/`, `src/i18n/`) facts from sources, tone in both languages, privacy        |
| `.claude/rules/code-style.md`                | strict TypeScript, React, accessibility basics, lint/format, errors                                     |
| `.claude/rules/naming-conventions.md`        | files, components, content ids, i18n keys, tokens                                                       |
| `.claude/rules/import-conventions.md`        | `@/` alias, feature public entries                                                                      |
| `.claude/rules/atomic-functions-solid.md`    | atomic functions and the SOLID that applies here                                                        |
| `.claude/rules/testing-conventions.md`       | Vitest, content consistency, pure logic, page behaviour                                                 |
| `.claude/agents/content-reviewer.md`         | copy reviewer (read-only): facts against their sources, both languages, privacy, tone                   |
| `.claude/agents/ts-reviewer.md`              | app reviewer (read-only): boundaries, typed edges, React, tokens, strings                               |
| `.claude/agents/accessibility-reviewer.md`   | WCAG 2.2 AA reviewer (read-only)                                                                        |
| `.claude/agents/code-reviewer.md`            | generic reviewer (read-only): security, correctness, performance, maintainability                       |
| `.claude/commands/new-project.md`            | `/new-project <repo path>`: from a repository to a verified project entry in both languages             |
| `.claude/commands/defend.md`                 | `/defend <project>`: interview drill on a portfolio project, in Spanish                                 |
| `.claude/commands/create-pr.md`              | `/create-pr`: PR with `gh`, local checks, generated description                                         |
| `.claude/commands/new-adr.md`                | `/new-adr <title>`: ADR skeleton filled in with the author                                              |
| `.claude/workflows/spec-driven-phase.md`     | plan (and wait) → spec → tasks → implementation → tests → review → ADR                                  |
| `.claude/workflows/git-workflow.md`          | `main`/`develop`, branch naming, Conventional Commits                                                   |
| `.claude/workflows/architecture-decision.md` | when an ADR is needed and how to write one                                                              |
| `.claude/skills/frontend-design/`            | design guidance for new UI                                                                              |
| `.claude/skills/ui-ux-pro-max/`              | (link to `.agents/skills/`) UI/UX reference data and search scripts                                     |
