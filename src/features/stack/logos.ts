import { Cable, Cloud, type LucideIcon } from "lucide-react";
import {
  siDart,
  siDocker,
  siExpo,
  siExpress,
  siFastapi,
  siFlutter,
  siGit,
  siGithubactions,
  siJavascript,
  siJest,
  siMongodb,
  siMongoose,
  siMqtt,
  siMysql,
  siN8n,
  siNestjs,
  siNodedotjs,
  siNumpy,
  siOpencv,
  siPandas,
  siPostgresql,
  siPython,
  siPytorch,
  siReact,
  siRedis,
  siScikitlearn,
  siSequelize,
  siTailwindcss,
  siTimescale,
  siTypescript,
  siVitest,
  siVuedotjs,
  type SimpleIcon,
} from "simple-icons";

import { legibleColour } from "./colour";

/**
 * Page background and ink of each theme, as in src/design/tokens.css (`--color-bg`,
 * `--color-ink`); logos.test.ts checks they stay in step.
 */
export const THEME_COLOURS = {
  light: { background: "#f4f6f9", ink: "#162033" },
  dark: { background: "#0e1320", ink: "#e8edf6" },
} as const;

/**
 * A technology's mark: its Simple Icons logo, or a generic icon when there is no honest logo
 * (Simple Icons dropped Amazon's marks; WebSockets is a protocol, not Socket.io).
 */
export type Logo =
  | { readonly kind: "brand"; readonly path: string; readonly light: string; readonly dark: string }
  | { readonly kind: "generic"; readonly icon: LucideIcon };

function brand(icon: SimpleIcon): Logo {
  const hex = `#${icon.hex}`;
  return {
    kind: "brand",
    path: icon.path,
    light: legibleColour(hex, THEME_COLOURS.light.background, THEME_COLOURS.light.ink),
    dark: legibleColour(hex, THEME_COLOURS.dark.background, THEME_COLOURS.dark.ink),
  };
}

/** Keyed by the names used in `skills` (src/content/career.ts); a test checks none is missing. */
export const LOGOS: Readonly<Record<string, Logo>> = {
  TypeScript: brand(siTypescript),
  JavaScript: brand(siJavascript),
  Python: brand(siPython),
  Dart: brand(siDart),
  React: brand(siReact),
  // React Native's own mark is React's.
  "React Native": brand(siReact),
  Expo: brand(siExpo),
  "Vue.js": brand(siVuedotjs),
  Tailwind: brand(siTailwindcss),
  Flutter: brand(siFlutter),
  "Node.js": brand(siNodedotjs),
  Express: brand(siExpress),
  NestJS: brand(siNestjs),
  FastAPI: brand(siFastapi),
  WebSockets: { kind: "generic", icon: Cable },
  MQTT: brand(siMqtt),
  PostgreSQL: brand(siPostgresql),
  MySQL: brand(siMysql),
  MongoDB: brand(siMongodb),
  TimescaleDB: brand(siTimescale),
  Redis: brand(siRedis),
  Sequelize: brand(siSequelize),
  Mongoose: brand(siMongoose),
  PyTorch: brand(siPytorch),
  "scikit-learn": brand(siScikitlearn),
  pandas: brand(siPandas),
  NumPy: brand(siNumpy),
  OpenCV: brand(siOpencv),
  Docker: brand(siDocker),
  "AWS CDK": { kind: "generic", icon: Cloud },
  "GitHub Actions": brand(siGithubactions),
  Git: brand(siGit),
  Jest: brand(siJest),
  Vitest: brand(siVitest),
  n8n: brand(siN8n),
};
