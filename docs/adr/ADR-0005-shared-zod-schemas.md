# ADR-0005: Share Zod schemas in `packages/shared`

## Status
Accepted

## Context
Input/output contracts are used across backend and frontend boundaries. Duplicated validation and type definitions increase drift risk and maintenance cost.

## Decision
We will define shared Zod schemas in `packages/shared` and consume them from applications.

- Shared schemas are the source of truth for cross-app contracts.
- TypeScript types are inferred from shared Zod schemas to avoid duplicate type definitions.
- Applications can extend or compose shared schemas when app-specific rules are needed.

## Consequences
- Contract drift between apps is reduced.
- Validation logic and types are reused consistently.
- Changes to shared schemas require coordinated updates for dependent apps.
