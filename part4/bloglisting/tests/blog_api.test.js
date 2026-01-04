const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const assert = require('node:assert')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('all blogs have id field', async () => {
  const response = await api.get('/api/blogs')

  const blogsWithoudId = response.body.filter(blog => !Object.prototype.hasOwnProperty.call(blog, 'id'))

  assert.strictEqual(blogsWithoudId.length, 0)
})

test('blog can be added', async () => {
  const newBlog = {
    title: 'Yhdysvallat tiesi kaiken jopa Maduron ruokavaliosta ja lemmikeistä – näin hämmästyttävä sieppaus­operaatio toteutettiin',
    url: 'https://yle.fi/a/74-20202504',
    likes: 40,
    author: 'Sakari Nuuttila'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
})

test('the default value to likes is 0', async () => {
  const newBlog = {
    title: 'Yhdysvallat tiesi kaiken jopa Maduron ruokavaliosta ja lemmikeistä – näin hämmästyttävä sieppaus­operaatio toteutettiin',
    url: 'https://yle.fi/a/74-20202504',
    author: 'Sakari Nuuttila'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const idOfAddedBlog = response.body.id

  const blogsAtEnd = await helper.blogsInDb()

  const addedBlog = blogsAtEnd.find(blog => blog.id === idOfAddedBlog)

  assert.strictEqual(addedBlog.likes, 0)
})

after(async () => {
  await mongoose.connection.close()
})