# ADR-0004: Use Drizzle over Prisma

## Status
Accepted

## Context
The project needs a type-safe database access layer with explicit SQL visibility, manageable migrations, and low runtime overhead for backend services.

## Decision
We will use Drizzle as the primary ORM/query layer instead of Prisma.

- Drizzle provides strongly typed schema/query APIs while staying close to SQL.
- It supports explicit, code-first schema definitions and migration workflows.
- It keeps runtime dependencies light and gives fine-grained control over queries.

## Consequences
- Database logic stays transparent and SQL-oriented.
- The team gains tighter control over generated queries and migrations.
- Contributors familiar with Prisma will need to adapt to Drizzle’s model and tooling.
