import { client, db } from "./client.js";
import { brandTable } from "./schema.js";

const brands = [{ brandName: "Citadel" }, { brandName: "Vallejo" }];

async function seed() {
  const inserted = await db.insert(brandTable).values(brands).returning();
  console.log(`Seeded ${inserted.length} brand row(s):`, inserted);
}

seed()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await client.end();
  });
