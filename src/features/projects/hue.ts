import type { CSSProperties } from "react";

import type { Project } from "@/content/types";

/** Each project paints itself with its own token pair (`--project-<hue>` and `-soft`). */
export function hueStyle(project: Project): CSSProperties {
  return {
    "--hue": `var(--project-${project.hue})`,
    "--hue-soft": `var(--project-${project.hue}-soft)`,
  } as CSSProperties;
}
