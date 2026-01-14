import { useState } from "react";

const Blog = ({ blog }) => {
  const [showFullDetails, setShowFullDetails] = useState(false);

  const blogStyle = {
    border: "1px solid black",
    padding: 10,
  };

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author} <button onClick={() => setShowFullDetails(!showFullDetails)}>view</button>
      {showFullDetails && (
        <>
          <div>{blog.url}</div>
          <div>likes {blog.likes} <button>like</button></div>
          <div>{blog.user.name}</div>
        </>
      )}
    </div>
  );
};

export default Blog;
