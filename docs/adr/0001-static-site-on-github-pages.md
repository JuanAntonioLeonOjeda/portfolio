# ADR-0001: A static site published on GitHub Pages

- **Status:** Accepted
- **Date:** 2026-10-30

## Context

The portfolio is public: recruiters and tech leads must reach it at a stable URL. It has no
dynamic data, no forms that store anything and no accounts. The author's other projects
(Repaso, the TFM app) run locally in Docker, which is not enough for a public page.

## Options considered

### Option A — GitHub Pages with GitHub Actions

- Pros: free; the code already lives on GitHub (`github.com/JuanAntonioLeonOjeda`); deploy on
  merge to `main` with the official Pages actions; HTTPS included.
- Cons: a project site lives under `/<repo>/`, so the build needs a base path; no preview
  deployments per pull request; custom headers (CSP, cache) cannot be set.

### Option B — Vercel or Netlify

- Pros: preview per pull request, custom headers, simple custom domains.
- Cons: another account and service to depend on, for a single static page.

### Option C — Docker + nginx on own hosting

- Pros: full control of headers and caching; the same image as local.
- Cons: a server to pay for, patch and monitor.

## Decision

Option A, chosen by the author. A one-page static site gains nothing from a platform with
previews or a server, and GitHub Pages keeps everything next to the code. The Docker image is
kept, but only to check the real build locally.

## Consequences

- What gets easier: publishing is merging `develop` into `main`.
- What gets harder / what we accept: Vite's `base` comes from `BASE_PATH` (set by the workflow
  from `actions/configure-pages`); no custom security headers in production.
- What would make us revisit this: needing server-side features (a contact form that sends
  mail, analytics with consent) or per-PR previews.

## Verification

- Action versions checked on 2026-10-30 with `gh api repos/<action>/releases/latest`:
  checkout v7, setup-node v7, pnpm/action-setup v6, configure-pages v6,
  upload-pages-artifact v5, deploy-pages v5.
- `BASE_PATH=/portfolio/ pnpm vite build` emits `/portfolio/assets/…` and
  `/portfolio/favicon.svg` in `dist/index.html`.
