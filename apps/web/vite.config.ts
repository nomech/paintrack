import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { tanstackRouter } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }),
    react(),
    babel({ presets: [reactCompilerPreset()] }),
  ],
  optimizeDeps: {
    // Rolldown's dep pre-bundler inlines its own copy of React into this
    // package instead of sharing the app's instance, which breaks hooks
    // (null dispatcher). Excluding it forces native ESM, which resolves
    // react through the same optimized dep as the rest of the app.
    exclude: ["@tanstack/react-router-devtools"],
  },
});
