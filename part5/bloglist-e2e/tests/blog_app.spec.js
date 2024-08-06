const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'luis',
        username: 'validUser',
        password: 'luis'
      }
    })
    await request.post('/api/users', {
      data: {
        name: 'notLuis',
        username: 'invalidUser',
        password: 'notLuis'
      }
    })

    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const loginText = await page.getByText('Log in to Application')
    await expect(loginText).toBeVisible()
  })

  describe('Login ', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'validUser', 'luis')
      await expect(page.getByText('luis logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'validUser', 'notLuis')
      await expect(page.getByText('luis logged in')).not.toBeVisible()
      const errorDiv = await page.locator('.error')
      await expect(errorDiv).toContainText('invalid username or password')
    })
  })

  describe.only('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'validUser', 'luis')
    })
  
    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 
        'blog_1', 
        'Luis', 
        'http://localhost:5173'
      )
      await expect(page.getByText('blog_1 Luis')).toBeVisible()
      await expect(page.getByRole('button', { name: 'view' })).toBeVisible()
      await expect(page.getByText('a new blog blog_1 by luis added')).toBeVisible()
    })

    describe.only('prepopulated with several other blogs', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page,'blog_2','Luis','http://localhost:5173')
        await createBlog(page,'blog_3','Andrei','http://localhost:5173')
        await createBlog(page,'blog_4','Ouano','http://localhost:5173')
      })

      test('a blog can be liked', async ({ page }) => {
        const blog = page.locator('.blogItem').filter({ hasText: 'blog_2' })
        await blog.getByRole('button', { name: 'view' }).click()

        await expect(blog.getByText('likes: 0')).toBeVisible()
        await blog.getByRole('button', { name: 'like' }).click()

        await expect(blog.getByText('likes: 1')).toBeVisible()
        await expect(blog.getByText('likes: 0')).not.toBeVisible()
      })

      test('only user who added the blog can delete it', async ({ page }) => {
        const blog = page.locator('.blogItem').filter({ hasText: 'blog_2' })
        await blog.getByRole('button', { name: 'view' }).click()

        await expect(blog.getByRole('button', { name: 'remove' })).toBeVisible()
        
        page.on('dialog', async (dialog) => {
          await dialog.accept()
        })
        await page.getByRole('button', { name: 'remove' }).click()

        await expect(blog.getByText('blog-2')).not.toBeVisible()
        await expect(blog).not.toBeVisible()
      })

      test('only the user who added the blog sees the delete button', async ({ page }) => {
        const blog = page.locator('.blogItem').filter({ hasText: 'blog_2' })
        await blog.getByRole('button', { name: 'view' }).click()
        await expect(blog.getByRole('button', { name: 'remove' })).toBeVisible()

        await page.getByRole('button', { name: 'logout' }).click()
        await loginWith(page, 'invalidUser', 'notLuis')

        const blogAfter = page.locator('.blogItem').filter({ hasText: 'blog_2' })
        await blogAfter.getByRole('button', { name: 'view' }).click()
        await expect(blogAfter.getByRole('button', { name: 'remove' })).not.toBeVisible()
      })
      
    })


  })


})

