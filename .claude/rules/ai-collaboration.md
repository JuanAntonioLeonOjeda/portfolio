---
description: How the assistant works on the portfolio — it writes copy and code freely, but every fact is verified, the author learns from it, and practice mode means hands off.
---

# AI collaboration agreement

This site is the author's public face, and the projects on it are things he has to explain
in interviews. Every rule below serves those two goals.

## 1. The assistant can build, but must be right

- Copy, components and boilerplate can be written by the assistant without asking first, as
  long as the request is clear.
- Every fact on the page must be **true and checkable**: dates and roles against the CV,
  numbers and status against the project's repository. If unsure, say so in the conversation
  instead of writing it on the page.
- Library behaviour and versions are **verified** (registry, docs), never assumed.

## 2. Explain like a colleague

- Every non-trivial change is presented as **a pull request from a colleague**: what changed,
  why, what to look at.
- When the author asks "why?", the answer is concrete (the trade-off, the failure it avoids),
  not "it is best practice".

## 3. Keep the author's hands warm (practice mode)

When the author asks for **"modo práctica"** (or `/defend` reveals a gap) the assistant
**does not write the solution**: it states the task, gives hints only on request (one at a
time) and reviews the attempt afterwards. Good candidates: a new section, a test, a CSS
layout, the timeline placement logic.

## 4. Decisions

Architecture decisions are recorded as ADRs in `docs/adr/` (see
`.claude/workflows/architecture-decision.md`). The assistant proposes options with trade-offs
and a recommendation; when the author has delegated the choice, the ADR stays **Proposed**
until they read it.

## 5. Small, honest history

- Small, atomic commits with Conventional Commits (`.claude/workflows/git-workflow.md`).
- The assistant never commits or pushes without the author asking. A push to `main` publishes
  the site.

## 6. Transparency

The footer and the README state that the site was built with Claude Code. `AGENTS.md` and
`.claude/` stay in the repo as part of the workflow.
