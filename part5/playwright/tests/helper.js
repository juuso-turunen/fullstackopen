const loginWith = async (page, username, password) => {  
  await page.getByLabel('username').fill(username)
  await page.getByLabel('password').fill(password)

  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'create a new blog' }).click()
  
  await page.getByLabel('title:').fill(title)
  await page.getByLabel('author:').fill(author)
  await page.getByLabel('url:').fill(url)
  
  await page.getByRole('button', { name: 'create' }).click()
}

const logOut = async (page) => {
  await page.getByRole('button', { name: 'logout' }).click()
}

const likeBlog = async (page, blogName) => {
  const blog = await page.getByText(blogName)

  if (await blog.getByRole('button', { name: 'like' }).isHidden()) {
    await blog.getByRole('button', { name: 'view' }).click()
  }

  const currentLikes = Number((await blog.getByText('likes').innerText()).replace('likes ', '').replace('like', ''))

  await blog.getByRole('button', { name: 'like' }).click()

  await page.getByText(blogName).getByText(`likes ${currentLikes + 1}`).waitFor()
}

export { loginWith, logOut, createBlog, likeBlog }