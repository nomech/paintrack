import { config } from "dotenv";

config({ path: process.env.NODE_ENV === "test" ? ".env.test" : ".env" });

export default async function setup() {
  const postgres = (await import("postgres")).default;
  const { drizzle } = await import("drizzle-orm/postgres-js");
  const { migrate } = await import("drizzle-orm/postgres-js/migrator");

  const migrationClient = postgres(process.env.DATABASE_URL!, { max: 1 });
  const db = drizzle({ client: migrationClient });

  try {
    await migrate(db, {
      migrationsFolder: "./supabase/migrations",
      migrationsSchema: "test",
    });
  } finally {
    await migrationClient.end();
  }
}
