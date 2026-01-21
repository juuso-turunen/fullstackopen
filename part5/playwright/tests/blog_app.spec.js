const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Juuso Turunen",
        username: "juuso",
        password: "juusonsalasana",
      },
    });

    await page.goto("http://localhost:5173");
  });
  
  test("Login form is shown", async ({ page }) => {
    await expect(page.getByText("log in to application")).toBeVisible();
    await expect(page.getByRole("button", { name: "login" })).toBeVisible();
  });
  
  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.goto("http://localhost:5173");

      await page.getByLabel('username').fill('juuso')
      await page.getByLabel('password').fill('juusonsalasana')

      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Juuso Turunen logged in')).toBeVisible()
    });
    
    test("fails with wrong credentials", async ({ page }) => {
      await page.goto("http://localhost:5173");
  
      await page.getByLabel('username').fill('juuso')
      await page.getByLabel('password').fill('pekansalasana')
  
      await page.getByRole('button', { name: 'login' }).click()
  
      await expect(page.getByText('Juuso Turunen logged in')).toBeHidden()
      await expect(page.getByText('wrong credentials')).toBeVisible()
    });
  });
});
