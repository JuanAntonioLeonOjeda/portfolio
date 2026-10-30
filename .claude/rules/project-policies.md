---
description: What this project is, its scope, commands, the Docker rebuild rule, language and what not to do.
---

# Project policies and context

## What this is

**Portfolio**: the public personal site of Juan Antonio León Ojeda, full-stack developer
finishing a master's in AI. One page in Spanish and English: who he is, the featured projects,
the career, the stack and how to get in touch.

- A static single-page app published on **GitHub Pages** from `main` (ADR-0001). No backend,
  no accounts, **no cookies, no analytics**.
- Two languages with no i18n library (ADR-0002): UI strings in `src/i18n/`, content with both
  languages side by side in `src/content/`.
- Projects featured: the master's thesis (LumosNet, `../../master/tfm`) and the author's
  personal projects in progress (`../aws`, `../traffic`, `../stock-app`). Work projects from
  the CV appear only as part of the career.
- Sources of truth for facts: the CV (`../ai-job-search/documents/cv/`) and each project's
  repository (README, roadmap, specs). The site never states what those do not say.

Priority: **true and current over impressive**. A wrong number or an overstated claim on a
public CV page is a bug of the highest severity; a missing feature is not.

## Content principles

- Every fact is checkable against a source named in the file's header comment.
- Both languages say the same thing; Spanish is written first.
- Plain, specific copy: what the project does and what was interesting to build, not
  adjectives.
- Privacy: the page is public. No phone number, no address, no private repository links, no
  data derived from patients or personal consumption.

Authoring rules: `.claude/rules/content-authoring.md`.

## Commands

```bash
pnpm install
pnpm dev               # Vite dev server on :5173
pnpm lint
pnpm typecheck
pnpm test              # Vitest: content consistency, timeline logic, page behaviour
pnpm build
docker compose up -d --build                 # the built site on http://localhost:3200
```

### Rebuild the Docker image after every change

The author checks the real build through the container (`portfolio-web-1`, port
`PORTFOLIO_PORT`, 3200 by default), which serves the image built at that moment: `pnpm dev`
or green tests do not update it. After any change in `src/`, `public/`, styles, `index.html`,
`nginx.conf` or dependencies, and before saying the work is done, run
`docker compose up -d --build` and say in the final message that the image was rebuilt (or
why it was not).

## Dependencies

- Versions are pinned exactly and come from the registry or the lockfile, never from memory.
- pnpm enforces a minimum release age: do not bypass it (no `minimumReleaseAgeExclude`);
  pick an older version instead.
- GitHub Actions are referenced by the major tag of their latest release, checked with
  `gh api repos/<owner>/<action>/releases/latest`.
- When a main dependency is added or upgraded, update its badge in the README.

## Language

- Conversation with the author: Spanish.
- Code, identifiers, comments, commits, ADRs, specs and `.claude/`: English.
- Everything the visitor reads: Spanish and English (`src/i18n/`, `src/content/`).

## What NOT to do

- Do not add a backend, a contact form that stores data, cookies or analytics.
- Do not publish the phone number, the CV PDF or private repository URLs.
- Do not add a dependency without saying why; prefer hand-written CSS and SVG.
- Do not commit secrets or `.env`.
- Do not create content in `.claude/` just to fill a folder: add it when the need is real.
