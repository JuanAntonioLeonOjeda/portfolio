---
paths:
  - "src/content/**"
  - "src/i18n/**"
description: How the site's copy is written — facts from sources, tone in both languages, privacy and the checks that enforce them.
---

# Writing the site's copy

## Facts

- Each content file names its sources in its header comment (the CV, a repository's README,
  roadmap or specs). Add the source when you add a fact.
- Numbers are copied from the source, not rounded or estimated (TFM metrics come from the
  thesis app's chapters). A project's phases are counted from its own roadmap.
- Status words are exact: "en curso" only if work is ongoing, "terminado" only if it is.
- Link a repository only if it is public (`gh repo view <owner>/<repo> --json visibility`).

## Tone

- Spanish: close and direct, first person ("hago", "estoy terminando"). English: the same
  meaning in natural English, not a word-for-word translation.
- Say what the thing does for its user, then what was interesting to build. Short sentences.
  No filler ("apasionado", "soluciones innovadoras", "passionate", "cutting-edge").
- Sentence case everywhere. No ALL-CAPS labels.

## Privacy

- No phone number, address or birth date. Email, GitHub and LinkedIn only.
- Nothing derived from patients (TFM) or from anyone's consumption data (Energy Analyzer).

## Checks

- `src/content/content.test.ts`: both languages present and non-empty, project hues exist as
  tokens, only the author's GitHub repos linked, phases within total, chronological career,
  no phone number.
- `en.ts` is typed as `Messages`: a missing key is a compile error.

Review with the `content-reviewer` agent.
