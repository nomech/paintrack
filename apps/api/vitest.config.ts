import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globalSetup: ["./src/db/tests/globalSetup.ts"],
    setupFiles: ["./src/db/tests/setupTests.ts"],
    // Tests share one remote Postgres schema (no per-worker isolation like an
    // in-memory DB would give), so files can't run concurrently without
    // truncation in one file racing assertions in another.
    fileParallelism: false,
  },
});
