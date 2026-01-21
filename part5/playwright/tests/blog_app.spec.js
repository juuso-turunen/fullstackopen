const { test, expect, beforeEach, describe } = require('@playwright/test');
const { loginWith, createBlog, logOut } = require('./helper')

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
    await request.post('/api/users', {
      data: {
        name: 'Pekka Kiitotie',
        username: 'pekka',
        password: 'pekansalasana',
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
      await createBlog(page, 'Juuson blogi!', 'Juuso Turunen', 'https://juuso.example.com/')

      await expect(page.getByText('a new blog Juuson blogi! by Juuso Turunen added')).toBeVisible()

      await expect(page.getByText('Juuson blogi! Juuso Turunen')).toBeVisible()
      await expect(page.getByRole('button', { name: 'view' })).toBeVisible()
    })

    describe('When one blog is created', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'Juuson blogi!', 'Juuso Turunen', 'https://juuso.example.com/')
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
      
      test('it can be deleted', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept());
        
        await expect(page.getByText('Juuson blogi! Juuso Turunen')).toBeVisible()
        
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'delete' }).click()
        
        await expect(page.getByText('Juuson blogi! Juuso Turunen')).toBeHidden()
      })
      
    })
  })
  
  test('only blog author see the delete button', async ({ page }) => {
    await loginWith(page, 'pekka', 'pekansalasana')
    await createBlog(page, 'Pekan blogi!', 'Pekka Kiitotie', 'https://pekka.example.org/')
    
    await logOut(page)
    
    await loginWith(page, 'juuso', 'juusonsalasana')
    await createBlog(page, 'Juuson blogi!', 'Juuso Turunen', 'https://juuso.example.org/')
    
    const juusoBlog = page.getByText('Juuson blogi! Juuso Turunen')
    await juusoBlog.getByRole('button', { name: 'view' }).click()
    await expect(juusoBlog.getByRole('button', { name: 'delete' })).toBeVisible()
    
    const pekkaBlog = page.getByText('Pekan blogi! Pekka Kiitotie')
    await pekkaBlog.getByRole('button', { name: 'view' }).click()
    await expect(pekkaBlog.getByRole('button', { name: 'delete' })).toBeHidden()
  })
});
