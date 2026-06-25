import { test, expect } from "@playwright/test";

test("landing renders and audience toggle reveals in-house sections", async ({ page }) => {
  await page.goto("/");

  // Stable hero element present on initial load
  await expect(page.getByTestId("text-recruiting-retention")).toBeVisible();

  // Before the click — the in-house section is hidden in the default (null) state
  await expect(
    page.getByRole("heading", { name: "Two-Stage Hiring Process" })
  ).not.toBeVisible();

  // Click the in-house card CTA button ("For In-House Teams")
  await page.getByTestId("button-hero-inhouse").click();

  // After selecting inhouse, the Two-Stage Hiring Process section appears
  await expect(
    page.getByRole("heading", { name: "Two-Stage Hiring Process" })
  ).toBeVisible();
});

test("newsletter endpoint works without a database", async ({ request }) => {
  const res = await request.post("/api/newsletter", {
    data: { email: "smoke@test.co" },
  });
  expect(res.status()).toBe(201);
  const body = await res.json();
  expect(body).toHaveProperty("message");
});

test("agency assessment submit returns a report (fallback)", async ({ request }) => {
  const responses = Array.from({ length: 20 }, (_, i) => ({
    questionId: `q${i + 1}`,
    responseValue: "test",
  }));
  const res = await request.post("/api/assessment/submit", {
    data: {
      user: { name: "Smoke", email: "smoke@test.co", company: "TestCo" },
      responses,
    },
  });
  expect(res.status()).toBe(201);
  const body = await res.json();
  expect(typeof body.report).toBe("string");
  expect(body.report.length).toBeGreaterThan(0);
});
