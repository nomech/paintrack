import { describe, it, expect } from "vitest";
import { db } from "../client.js";
import { brandTable } from "../schema.js";

describe("brand table", () => {
  it("inserts and reads back a row", async () => {
    const [inserted] = await db
      .insert(brandTable)
      .values({ name: "Scale75" })
      .returning();

    const rows = await db.select().from(brandTable);

    expect(rows).toHaveLength(1);
    expect(rows[0].id).toBe(inserted.id);
    expect(rows[0].name).toBe("Scale75");
  });

  it("starts empty, proving truncation ran between tests", async () => {
    const rows = await db.select().from(brandTable);

    expect(rows).toHaveLength(0);
  });
});
