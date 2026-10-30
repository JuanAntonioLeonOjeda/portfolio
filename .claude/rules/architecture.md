---
description: Site layout, feature folders, how content, i18n and sections fit together, and the dependency rules.
---

# Architecture

A static single-page app (Vite + React), no router: one page with anchored sections. GitHub
Pages serves the build; nginx serves the same build locally in Docker.

## Layout

```
src/
  app/                  # App: skip link, header, sections in order, footer
  content/              # the facts, both languages side by side
    types.ts            # Lang, Localized, Project, CareerEntry, SkillGroup
    profile.ts          # name, role, summary, public links
    projects.ts         # featured project first
    career.ts           # career entries (chronological) and skill groups
  design/               # tokens (light/dark), base styles
  i18n/                 # es.ts (source, defines Messages), en.ts, index.ts
  features/
    shell/              # header, footer, theme and language stores
    hero/ projects/ career/ stack/ contact/   # one section each
    ui/                 # Section, ExternalLink
```

## How languages work (ADR-0002)

- The language lives in `<html lang>`. `index.html` sets it before first paint (stored choice,
  else the browser language); `features/shell/language.ts` changes it and notifies React
  through `useSyncExternalStore`.
- UI strings: `useMessages()` returns `es` or `en`; `en.ts` is typed as `Messages`, so a
  missing key fails the build.
- Content: every visitor-facing text is a `Localized` (`{ es, en }`), read with
  `pick(text, lang)`. Names of products and technologies are plain strings.

## How sections work

- Each section is a feature with an `index.ts` and wraps itself in `Section` (anchor id,
  `h2`, lead). The header lists the same ids.
- Colours by meaning: a project paints itself with `--project-<hue>`, a career entry with
  `--career-<kind>`; components set `--hue`/`--kind` and CSS does the rest.

## Dependency rules

- `app → features → design / i18n / content`. Features import other features only through
  their `index.ts`.
- `content/` imports only its own types: no React, no i18n.
- Logic that can be wrong (timeline placement) lives in plain `.ts` modules and is
  unit-tested; components only draw.

## When NOT to apply this literally

- Tiny presentational components do not need a folder each.
- Do not add a router, a context or a global store before a second page or a second consumer
  needs it.
