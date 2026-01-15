import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {
  const [showFullDetails, setShowFullDetails] = useState(false)

  const blogLike = async () => {
    try {
      const newBlog = {
        ...blog,
        likes: blog.likes + 1,
      }
      await blogService.put(newBlog)
      updateBlog(newBlog)
    } catch (error) {
      console.error('failed to like', error)
    }
  }

  const blogDelete = async () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      return
    }

    try {
      await blogService.remove(blog)
      deleteBlog(blog)
    } catch (error) {
      console.error('failed to delete', error)
    }
  }

  const blogStyle = {
    border: '1px solid black',
    padding: 10,
  }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{' '}
      <button onClick={() => setShowFullDetails(!showFullDetails)}>view</button>
      {showFullDetails && (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={blogLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
          <div>
            {user.username === blog.user.username && <button onClick={blogDelete}>delete</button>}
          </div>
        </>
      )}
    </div>
  )
}

export default Blog
