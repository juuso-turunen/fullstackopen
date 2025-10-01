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

  const favoriteBlogIndex = blogs.reduce((acc, blog, index, array) => {
    if (array[acc].likes < blog.likes) return index
    return acc
  }, 0)

  return blogs[favoriteBlogIndex]
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  // Calculate how many each author does have blogs
  const authorsWithCount = blogs.reduce((acc, currentValue) => {
    const author = currentValue.author
    acc[author] >= 0
      ? acc[author] += 1
      : acc[author] = 1

    return acc
  }, {})

  // Object to array
  const authorsWithCountArray = Object.entries(authorsWithCount)

  // Calculate the author who has the most blogs
  const mostBlogsAuthor = authorsWithCountArray.reduce((acc, author) => {
    if (acc[1] < author[1]) return author

    return acc
  })

  return { 'author': mostBlogsAuthor[0], 'blogs': mostBlogsAuthor[1] }
}


const mostLikes = (blogs) => {
  if (blogs.length === 0) return null

  // Calculate how many likes each author got
  const authorsWithCount = blogs.reduce((acc, currentValue) => {
    const author = currentValue.author
    const likes = currentValue.likes

    acc[author] >= 0
      ? acc[author] += likes
      : acc[author] = likes

    return acc
  }, {})

  // Object to array
  const authorsWithCountArray = Object.entries(authorsWithCount)

  // Calculate the author who has the most likes
  const mostLikesAuthor = authorsWithCountArray.reduce((acc, author) => {
    if (acc[1] < author[1]) return author

    return acc
  })

  return { 'author': mostLikesAuthor[0], 'likes': mostLikesAuthor[1] }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}