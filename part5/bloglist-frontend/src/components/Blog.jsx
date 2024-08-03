import { useState } from 'react'
import Togglable from "./Togglable"

const Blog = ({ blog, updateLikesBlog }) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} 
        <button style={hideWhenVisible} onClick={() => setVisible(!visible)}>view</button>
        <button style={showWhenVisible} onClick={() => setVisible(!visible)}>hide</button> 
      </div>

      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>
          likes: {blog.likes}
          <button onClick={() => updateLikesBlog(blog)}>like</button>
        </p>
        <p>{blog.user.name}</p>
      </div>
    </div>
  )
}

export default Blog