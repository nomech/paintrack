import { describe, it, expect } from "vitest";
import brandsRoute from "../brandsRoute.js";
import { db } from "../../../db/client.js";
import { brandTable } from "../../../db/schema.js";

describe("GET /brands", () => {
  it("returns the seeded brands", async () => {
    await db
      .insert(brandTable)
      .values([{ name: "Citadel" }, { name: "Vallejo" }]);

    const response = await brandsRoute.request("/brands");
    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body).toHaveLength(2);
  });
});
