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

module.exports = {
  dummy, totalLikes
}