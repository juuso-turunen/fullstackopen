const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const users = await User.find({})
  const currentUser = users[0]

  const blog = new Blog({ ...request.body, user: currentUser })

  const savedBlog = await blog.save()

  currentUser.blogs = currentUser.blogs.concat(savedBlog._id)
  await currentUser.save()

  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)

  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (!blog) return response.status(404).end()

  blog.likes = request.body.likes

  const updatedBlog = await blog.save()
  response.json(updatedBlog)
})

module.exports = blogRouter