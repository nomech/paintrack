import { describe, it, expect } from "vitest";
import brandsRoute from "../brandsRoute.js";

describe("GET /brands", () => {
  it("returns the seeded brands", async () => {
    const response = await brandsRoute.request("/brands");
    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body).toHaveLength(2);
  });
});
