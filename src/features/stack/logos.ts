import {
  Cable,
  ChartLine,
  Cloud,
  Database,
  FileImage,
  HardDrive,
  Inbox,
  Rotate3d,
  ScanSearch,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import {
  siD3,
  siDart,
  siDocker,
  siExpo,
  siExpress,
  siFastapi,
  siFlutter,
  siGit,
  siGithubactions,
  siHuggingface,
  siJavascript,
  siJest,
  siLeaflet,
  siMongodb,
  siMongoose,
  siMqtt,
  siMysql,
  siN8n,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siNumpy,
  siNuxt,
  siOpencv,
  siPandas,
  siPostgresql,
  siPython,
  siPytorch,
  siReact,
  siReactquery,
  siRedis,
  siScikitlearn,
  siSequelize,
  siSqlalchemy,
  siStellar,
  siStripe,
  siTailwindcss,
  siTimescale,
  siTypescript,
  siUltralytics,
  siVitest,
  siVuedotjs,
  siZapier,
  siZod,
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
 * (Simple Icons dropped Amazon's and OpenAI's marks; WebSockets is a protocol, not Socket.io;
 * AR and web scraping are techniques, not products; pgvector, pydicom and fl_chart have none).
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

/**
 * Keyed by the names used in `skills` (src/content/career.ts), in the personal projects
 * (src/content/projects.ts) and in the work projects (src/content/work-projects.ts); a test
 * checks none is missing.
 */
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
  // Only in the personal projects. TanStack Query keeps React Query's mark; SetFit is a
  // Hugging Face library.
  "Ultralytics YOLO": brand(siUltralytics),
  pydicom: { kind: "generic", icon: FileImage },
  pgvector: { kind: "generic", icon: Database },
  SetFit: brand(siHuggingface),
  SQLAlchemy: brand(siSqlalchemy),
  "TanStack Query": brand(siReactquery),
  Zod: brand(siZod),
  Lambda: { kind: "generic", icon: Zap },
  S3: { kind: "generic", icon: HardDrive },
  SQS: { kind: "generic", icon: Inbox },
  DynamoDB: { kind: "generic", icon: Database },
  fl_chart: { kind: "generic", icon: ChartLine },
  // Only in the work projects.
  "Next.js": brand(siNextdotjs),
  Nuxt: brand(siNuxt),
  Leaflet: brand(siLeaflet),
  D3: brand(siD3),
  Stripe: brand(siStripe),
  Stellar: brand(siStellar),
  Zapier: brand(siZapier),
  OpenAI: { kind: "generic", icon: Sparkles },
  AR: { kind: "generic", icon: Rotate3d },
  "Web scraping": { kind: "generic", icon: ScanSearch },
};
