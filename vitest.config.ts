import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    // Match the tsconfig "@/*" -> "./src/*" path alias for runtime imports.
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  test: {
    environment: "node",
    // Unit tests only. Playwright specs in e2e/ run under their own runner
    // (`playwright test`) and break when collected by vitest.
    include: ["src/**/*.test.ts"],
  },
});
