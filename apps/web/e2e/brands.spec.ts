import { test, expect } from "@playwright/test";

test("shows the seeded brands", async ({ page }) => {
  await page.goto("/brands");
  await expect(page.getByText("Citadel")).toBeVisible();
  await expect(page.getByText("Vallejo")).toBeVisible();
});
