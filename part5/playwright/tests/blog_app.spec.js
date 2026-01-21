const { test, expect, beforeEach, describe } = require('@playwright/test');
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset');
    await request.post('/api/users', {
      data: {
        name: 'Juuso Turunen',
        username: 'juuso',
        password: 'juusonsalasana',
      },
    });

    await page.goto('/');
  });

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('log in to application')).toBeVisible();
    await expect(page.getByRole('button', { name: 'login' })).toBeVisible();
  });

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.goto('/');

      await loginWith(page, 'juuso', 'juusonsalasana')

      await expect(page.getByText('Juuso Turunen logged in')).toBeVisible()
    });

    test('fails with wrong credentials', async ({ page }) => {
      await page.goto('/');

      await loginWith(page, 'juuso', 'pekansalasana')

      await expect(page.getByText('Juuso Turunen logged in')).toBeHidden()
      await expect(page.getByText('wrong credentials')).toBeVisible()
    });
  });

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.goto('/');
      await loginWith(page, 'juuso', 'juusonsalasana')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'Uusi blogi!', 'Juuso Turunen', 'https://example.com/blogi')

      await expect(page.getByText('a new blog Uusi blogi! by Juuso Turunen added')).toBeVisible()

      await expect(page.getByText('Uusi blogi! Juuso Turunen')).toBeVisible()
      await expect(page.getByRole('button', { name: 'view' })).toBeVisible()
    })

    describe('When one blog is created', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'Uusi blogi!', 'Juuso Turunen', 'https://example.com/blogi')
      })

      test('it can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()

        await expect(page.getByText('likes 0')).toBeVisible()
        await page.getByRole('button', { name: 'like' }).click()

        await expect(page.getByText('likes 1')).toBeVisible()
        await page.getByRole('button', { name: 'like' }).click()

        await expect(page.getByText('likes 2')).toBeVisible()
        await page.getByRole('button', { name: 'like' }).click()
      })
    })
  })
});
