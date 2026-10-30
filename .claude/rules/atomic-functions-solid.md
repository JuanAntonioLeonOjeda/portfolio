---
description: Atomic functions and the practical SOLID that applies to this React project.
---

# Atomic functions and SOLID

- A function or component does **one** thing. If its description needs an "and", split it.
- Logic that can be wrong (timeline placement, anything computed from content) is a pure
  function with hand-checkable inputs and outputs; components stay thin and only draw.
- Past ~25 lines or 2–3 levels of nesting in a function, extract named sub-functions. More than
  3 positional parameters → an options object.
- Open/closed: a new project, career entry or skill group is a new entry in `src/content/`,
  not another `if` in a component.
- Over-engineering is as costly as messy code: no abstraction for a single use.
