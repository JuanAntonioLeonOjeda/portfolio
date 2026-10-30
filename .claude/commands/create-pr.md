---
description: Create a pull request into develop with conventional commits, local checks and a generated description
allowed-tools: Bash, Read
---

# Create PR

Create a pull request with `gh` from the current branch into `develop` (never into `main`,
except the `develop → main` release PR, which publishes the site).

## Workflow

1. Check the branch name follows `.claude/workflows/git-workflow.md`.
2. Run the local checks and stop if any fails: `pnpm format:check`, `pnpm lint`,
   `pnpm typecheck`, `pnpm test`, `pnpm build`. Report the exact output of failures.
3. Analyse the commits (`git log develop..HEAD`) and the diff (`git diff develop...HEAD`). If
   there are uncommitted changes, ask before committing them, and propose a Conventional
   Commit message `<type>(<scope>): <subject>` (scopes: `content`, `i18n`, `ui`, `a11y`, `ci`,
   `adr`, `repo`).
4. Generate the title and description:
   - **Context**: what and why.
   - **Changes**: grouped by area (copy, sections, design, CI).
   - **Decisions**: ADRs added or updated (links). If the change contains a decision without
     an ADR, say so.
   - **How to verify**: commands and the sections to look at, in both languages and themes.
   - **Checklist** (below).
5. Show title and description and **wait for confirmation** before publishing.
6. `gh pr create --base develop --title ... --body ...`.

## PR checklist

- [ ] Commits are small and follow Conventional Commits
- [ ] Format, lint, typecheck, tests and build pass locally
- [ ] Every new or changed fact was checked against its source, in both languages
- [ ] `AGENTS.md` code map updated if paths were created or finished
- [ ] No phone number, CV, private repository URL, secrets or `.env` in the diff
