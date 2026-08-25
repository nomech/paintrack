import { describe, it, expect } from "vitest";
import brandsRoute from "../healthRoutes.js";

describe("GET /health", () => {
  it("returns the seeded brands", async () => {
    const response = await brandsRoute.request("/health");
    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body.status).toBe("OK");
  });
});
