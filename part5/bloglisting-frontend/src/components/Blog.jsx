import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, updateBlog }) => {
  const [showFullDetails, setShowFullDetails] = useState(false);

  const blogLike = async () => {
    try {
      const newBlog = {
        ...blog,
        likes: blog.likes + 1,
      };
      await blogService.put(newBlog);
      updateBlog(newBlog);
    } catch (error) {
      console.error('failed to like', error)
    }
  };

  const blogStyle = {
    border: "1px solid black",
    padding: 10,
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}{" "}
      <button onClick={() => setShowFullDetails(!showFullDetails)}>view</button>
      {showFullDetails && (
        <>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes} <button onClick={blogLike}>like</button>
          </div>
          <div>{blog.user.name}</div>
        </>
      )}
    </div>
  );
};

export default Blog;
