const Blog = require('../models/blog')

const initialBlogs = [
  {
    title:
      'Auto syttyi tuleen maan alla Tampereella – myös useita muita autoja tuhoutui rajussa parkkihalli­palossa',
    author: 'Kirsi Matson-Mäkelä, Antti Palomaa',
    url: 'https://yle.fi/a/74-20186043',
    likes: 2,
  },
  {
    title:
      'Auto syttyi tuleen maan alla Tampereella – myös useita muita autoja tuhoutui rajussa parkkihalli­palossa',
    author: 'Kirsi Matson-Mäkelä, Antti Palomaa',
    url: 'https://yle.fi/a/74-20186043',
    likes: 2,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const notesInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((note) => note.toJSON())
}

module.exports = {
  initialBlogs: initialBlogs,
  nonExistingId,
  notesInDb,
}
