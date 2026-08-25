# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

## Environment variables

Copy `.env.example` to `.env` and adjust as needed:

| Variable            | Description                                | Example                   |
| ------------------- | ------------------------------------------- | -------------------------- |
| `VITE_API_BASEURL`  | Base URL of the API server used by the typed API client (`src/lib/api.ts`) | `http://localhost:3000/` |

Vite inlines `VITE_*` variables into the bundle at build time, not at server start — changing `.env` after `vite build` has already run has no effect on that build's output.

## Production-mode local run

Serves the built static bundle (`vite preview`) instead of the dev server, on a port separate from `pnpm dev` (`5173`) so both can run side by side:

```
pnpm build
pnpm start
```

`--strictPort` makes the command fail instead of silently moving to a different port if `4173` is already taken — matters once #32 automates restarting this process against a known port.

If this build should talk to the API's own production-mode run (`http://localhost:3001/`, see `apps/api/README.md`) rather than its dev port, set `VITE_API_BASEURL` for that build specifically — e.g. via a git-ignored `.env.production` (already covered by the `.env.*` gitignore pattern) — since it needs to be in place *before* `pnpm build`, not just before `preview`.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
