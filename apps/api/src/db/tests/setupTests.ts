import { afterEach } from "vitest";
import { sql } from "drizzle-orm";
import { db } from "../client.js";
import { brandTable, paintTable } from "../schema.js";

afterEach(async () => {
  await db.execute(
    sql`TRUNCATE TABLE ${paintTable}, ${brandTable} RESTART IDENTITY CASCADE`,
  );
});
