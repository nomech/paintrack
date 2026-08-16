# ADR-0002: Use pnpm + Turborepo for the monorepo

## Status
Accepted

## Context
Paintrack contains multiple applications and shared code that need consistent dependency management, fast local development, and repeatable CI workflows.

## Decision
We will use a pnpm workspace for package management and Turborepo for task orchestration across the monorepo.

- pnpm provides fast, deterministic installs with a shared lockfile.
- Turborepo coordinates tasks like `dev`, `build`, `lint`, `typecheck`, and `test` across projects.
- Repository-level scripts call Turborepo commands as the primary entry points.

## Consequences
- Developers get faster installs and more consistent dependency resolution.
- Cross-project task execution is standardized and easier to scale.
- Team members need familiarity with both pnpm workspaces and Turborepo conventions.
