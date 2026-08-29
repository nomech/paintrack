```
pnpm install
PORT=3000 pnpm dev
```

```
open http://localhost:3000
```

## Environment variables

Set in `apps/api/.env` (git-ignored, never committed):

| Variable              | Description                                                        | Example                                |
| ---------------------- | ------------------------------------------------------------------- | --------------------------------------- |
| `PORT`                 | Port the Hono server listens on                                     | `3000` (dev), `3001` (production-mode run) |
| `DATABASE_URL`         | Postgres connection string (Supabase transaction-mode pooler)       | `postgresql://...pooler.supabase.com:6543/postgres` |
| `DATABASE_HEALTH_URL`  | Supabase REST endpoint used by the readiness check                  | `https://<project>.supabase.co/rest/v1/` |
| `DATABASE_SECRET_KEY`  | Supabase service secret key used for the readiness check            | `sb_secret_...`                        |

There's a single dev Supabase project and no separate staging database — the same `DATABASE_URL`/`DATABASE_HEALTH_URL`/`DATABASE_SECRET_KEY` values are used for both `pnpm dev` and the production-mode run below.

## Production-mode local run

Runs the compiled output directly (no `tsx`/watch mode), on a port separate from `pnpm dev` so both can run side by side:

```
pnpm build
PORT=3001 pnpm start
```

`PORT=3001` keeps this from colliding with the dev server on `3000`. `DATABASE_URL`, `DATABASE_HEALTH_URL` and `DATABASE_SECRET_KEY` stay whatever is already in `apps/api/.env` — same dev Supabase project either way.

## Database migrations

Migrations are generated locally with `pnpm db:generate`, committed to `apps/api/supabase/migrations/`, and applied only via `pnpm db:migrate`, run as an explicit, separate step. The app never runs migrations at process startup — `src/index.ts` and `src/db/client.ts` only open a connection, they never call a migrator.

## Seeding

`pnpm db:seed` (from `apps/api`) inserts two `brand` rows ("Citadel", "Vallejo") via `src/db/seed.ts`. It's a one-off script, not idempotent — running it twice inserts duplicate rows, since `brand.name` has no uniqueness constraint. Run it once after migrating a fresh database.

## Running tests

Tests run against a dedicated `test` schema in the same dev Supabase project — not Testcontainers, not the `public` schema used for manual dev work.

Set `apps/api/.env.test` (git-ignored; copy `.env.test.example`) to a connection string that targets the `test` schema. Two things matter here:

- Use the **session-mode pooler** (port `5432`), not the transaction-mode pooler (`6543`) used for `DATABASE_URL` elsewhere — transaction pooling doesn't reliably honor the `search_path` startup option across pooled connections, so migrations and queries can silently land back in `public`.
- Append `?options=-c%20search_path%3Dtest` so unqualified table names (as used in the migration SQL and Drizzle schema) resolve against `test` instead of `public`.

`pnpm test` then:
1. Runs a `globalSetup` (`src/db/tests/globalSetup.ts`) that applies all committed migrations to the `test` schema, tracked in its own `test.__drizzle_migrations` journal (kept separate from the dev schema's migration history so it doesn't think migrations already ran)
2. Truncates `brands`/`paints` after every test (`src/db/tests/setupTests.ts`)
3. Runs all test files **sequentially** (`fileParallelism: false` in `vitest.config.ts`) — since every file shares the same remote schema rather than an isolated in-memory DB, running files in parallel lets one file's truncation race another file's assertions

In CI, `DATABASE_URL` is injected directly from the `TEST_DATABASE_URL` secret (same test-schema connection string), so `.env.test` is only needed locally.
