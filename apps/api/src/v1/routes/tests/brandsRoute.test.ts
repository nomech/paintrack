import { describe, it, expect, afterEach } from "vitest";
import { inArray } from "drizzle-orm";
import brandsRoute from "../brandsRoute.js";
import { db } from "../../../db/client.js";
import { brandTable } from "../../../db/schema.js";

const seededNames = ["Citadel", "Vallejo"];

afterEach(async () => {
  await db.delete(brandTable).where(inArray(brandTable.name, seededNames));
});

describe("GET /brands", () => {
  it("returns the seeded brands", async () => {
    await db.insert(brandTable).values(seededNames.map((name) => ({ name })));

    const response = await brandsRoute.request("/brands");
    expect(response.status).toBe(200);

    // This suite runs against a shared external test schema (not an
    // isolated in-memory DB), so a concurrent CI run for another PR can
    // leave extra rows here - assert the seeded brands are present rather
    // than an exact table length. The afterEach above cleans up what this
    // test itself inserted so repeated CI runs don't accumulate rows.
    const body = await response.json();
    const names = body.map((brand: { name: string }) => brand.name);
    expect(names).toEqual(expect.arrayContaining(seededNames));
  });
});
