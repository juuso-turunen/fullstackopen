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
  
  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.goto("http://localhost:5173");
      
      await page.getByLabel('username').fill('juuso')
      await page.getByLabel('password').fill('juusonsalasana')
      
      await page.getByRole('button', { name: 'login' }).click()
    })
    
    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create a new blog' }).click()
      
      await page.getByLabel('title:').fill('Uusi blogi!')
      await page.getByLabel('author:').fill('Juuso Turunen')
      await page.getByLabel('url:').fill('https://example.com/blogi')
      
      await page.getByRole('button', { name: 'create' }).click()
      
      await expect(page.getByText('a new blog Uusi blogi! by Juuso Turunen added')).toBeVisible()
      
      await expect(page.getByText('Uusi blogi! Juuso Turunen')).toBeVisible()
      await expect(page.getByRole('button', { name: 'view' })).toBeVisible()
    })
  })
});
