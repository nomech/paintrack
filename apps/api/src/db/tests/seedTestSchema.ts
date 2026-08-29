import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { brandTable } from "../schema.js";

const client = postgres(process.env.DATABASE_URL!, { max: 1 });
const db = drizzle({ client });

await migrate(db, {
  migrationsFolder: "./supabase/migrations",
  migrationsSchema: "test",
});

await db.delete(brandTable);
await db.insert(brandTable).values([{ name: "Citadel" }, { name: "Vallejo" }]);

await client.end();
