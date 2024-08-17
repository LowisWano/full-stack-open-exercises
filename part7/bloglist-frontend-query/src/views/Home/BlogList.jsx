import { useQuery } from '@tanstack/react-query'
import blogService from '../../services/blogService'
import { Link } from 'react-router-dom'
import { useBlogHooks } from '../../hooks/blogHooks'

const BlogList = () => {
  const blogsQuery = useBlogHooks().getQueryData()
  const blogs = blogsQuery.data
  const linkStyle = {
    display: 'block',
    margin: '5px'
  }
  
  if(blogsQuery.isLoading){
    return <div>Loading data ...</div>
  }

  return (
    
    <div>
      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Link style={linkStyle} key={blog.id} to={`/blogs/${blog.id}`} >{blog.title}</Link>
        ))}
    </div>
  )
}

export default BlogList