import { useState } from 'react'

const Blog = ({ blog, updateLikesBlog, deleteBlog, user }) => {
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

  const deleteButton = () => {
    return (
      <button onClick={() => deleteBlog(blog)} >remove</button>
    )
  }

  return (
    <div style={blogStyle} className='blogItem'>
      <div>
        {blog.title} {blog.author}
        <button style={hideWhenVisible} onClick={() => setVisible(!visible)}>view</button>
        <button style={showWhenVisible} onClick={() => setVisible(!visible)}>hide</button>
      </div>

      <div style={showWhenVisible} className='showWhenVisible'>
        <a href={blog.url}>{blog.url}</a>
        <p>
          likes: {blog.likes}
          <button onClick={() => updateLikesBlog(blog)}>like</button>
        </p>
        <p>{blog.user.name}</p>
        { blog.user.username === user.username && deleteButton() }
      </div>
    </div>
  )
}

export default Blog