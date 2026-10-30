import { fileURLToPath, URL } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  // GitHub Pages serves a project site under `/<repo>/`: the deploy workflow passes that path
  // (from actions/configure-pages) as BASE_PATH. Locally and in Docker it is the root.
  base: process.env.BASE_PATH ?? "/",
  // One alias, `@/` → `src/` (.claude/rules/import-conventions.md); keep in sync with tsconfig.
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
});
