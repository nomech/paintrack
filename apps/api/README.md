```
npm install
PORT=3000 npm run dev
```

```
open http://localhost:3000
```

## Database migrations

Migrations are generated locally with `pnpm db:generate`, committed to `apps/api/supabase/migrations/`, and applied only via `pnpm db:migrate`, run as an explicit, separate step. The app never runs migrations at process startup — `src/index.ts` and `src/db/client.ts` only open a connection, they never call a migrator.

## Seeding

`pnpm db:seed` (from `apps/api`) inserts two `brand` rows ("Citadel", "Vallejo") via `src/db/seed.ts`. It's a one-off script, not idempotent — running it twice inserts duplicate rows, since `brand.name` has no uniqueness constraint. Run it once after migrating a fresh database.
