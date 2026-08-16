# ADR-0003: Use Hono over Express, Fastify, and NestJS

## Status
Accepted

## Context
The API requires a lightweight, TypeScript-friendly framework with good performance and straightforward middleware/routing for a modular codebase.

## Decision
We will build the backend API with Hono instead of Express, Fastify, or NestJS.

- Hono provides a small, modern API surface with first-class TypeScript support.
- It supports middleware composition and routing patterns aligned with our needs.
- It avoids introducing heavier framework abstractions while keeping the architecture flexible.

## Consequences
- The API remains lightweight and quick to iterate on.
- Contributors need to learn Hono-specific patterns rather than more common Express/NestJS patterns.
- Some ecosystem examples and integrations may be less extensive than larger frameworks.
