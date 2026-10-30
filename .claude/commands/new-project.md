---
description: Add a project to the portfolio (or update one) from its repository, in both languages, with every fact verified
argument-hint: <path to the project's repository, e.g. ../traffic>
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# New project: $ARGUMENTS

Follow `.claude/rules/content-authoring.md`.

1. Read the repository: README, `AGENTS.md`, roadmap or phase plan, specs, `package.json` /
   `pubspec.yaml` / `requirements.txt` for the stack, and `git log` for how alive it is. List
   what it does, what was interesting to build, its stack and its exact status.
2. Check whether the repository is public:
   `gh repo view <owner>/<repo> --json visibility` (no remote or private → no link).
3. Propose to the author, in Spanish and briefly: tagline, description, 1–3 highlights,
   stack, status (phases counted from the roadmap), the public website if there is one
   (`site`, https), a screenshot (`public/projects/<id>.webp`, 16:10, ideally 1600×1000,
   with an `alt` in both languages) and the hue (an existing
   `--project-*` token or a new pair, light and dark, checked for contrast). **Wait for
   confirmation** if the project is new; go ahead if it is an update the author asked for.
4. Add or edit the entry in `src/content/projects.ts`, naming the source in the header
   comment. A new hue goes into `src/design/tokens.css` (both themes).
5. Verify: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`.
6. Run the `content-reviewer` agent and fix or explicitly accept its findings.
7. Rebuild the Docker image and tell the author where to look
   (`http://localhost:3200/#projects`).
