# ADR-0009: Single-environment automation against the dev Supabase project

## Status
Accepted

## Context
This is a solo local project with one Supabase project already provisioned — tables and migrations run against it during normal development. #32 adds automation (a self-hosted GitHub Actions runner) that migrates and restarts the local build on every merge to `main`. This raises the question of whether that automation should target its own staging database, separate from the one used during manual development.

## Decision
- One Supabase project is shared by both manual dev work and the automated migrate+restart pipeline. No separate staging or production database is created.
- The automation reads `DATABASE_URL` and Supabase keys directly from the same `apps/api/.env` the dev server already uses, rather than mirroring those values into a GitHub Environment for an audit trail. The runner executes on this same machine, so a second copy of the secrets in GitHub's secret store adds a place for them to drift or leak without adding meaningful audit value for a single-person, single-machine setup.

## Consequences
- No redundant second Supabase project to provision, migrate, or pay for.
- Secrets stay in exactly one place (`apps/api/.env`), which is git-ignored and has never been committed.
- If this project ever grows beyond a solo local setup — multiple contributors, a real deployment target — this decision should be revisited, since the rationale here is specifically "solo project, pipeline exists for the practice of having one," not genuine environment isolation.
