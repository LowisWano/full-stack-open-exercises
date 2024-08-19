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
  console.log(blogs)
  return (
    
    <div className='flex gap-5'>
      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div className="card bg-base-100 w-96 shadow-xl" key={blog.id}>
            <div className="card-body">
              <h2 className="card-title">{blog.title}</h2>
              <p>Author: {blog.author}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary"><Link style={linkStyle} to={`/blogs/${blog.id}`} >view</Link></button>
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default BlogList