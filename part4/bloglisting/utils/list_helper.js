// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const sum = blogs.reduce((acc, blog) => {
    return acc + blog.likes
  }, 0)

  return sum
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  const favoriteBlogIndex = blogs.reduce((acc, blog, index) => {
    if (blogs[acc].likes < blog.likes) return index
    return acc
  }, 0)

  return blogs[favoriteBlogIndex]
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}