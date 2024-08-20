import { useQuery } from '@tanstack/react-query'
import blogService from '../../services/blogService'
import { Link } from 'react-router-dom'
import { useBlogHooks } from '../../hooks/blogHooks'

const BlogList = () => {
  const blogsQuery = useBlogHooks().getQueryData()
  const blogs = blogsQuery.data
  
  if(blogsQuery.isLoading){
    return (
      <div className="flex justify-center items-center m-14" >
        <span className="loading loading-spinner loading-lg">loading</span>
      </div>
    )
  }
  console.log(blogs)
  return (
    <div className='flex gap-5 flex-col'>
      <h1 className='text-center font-bold text-4xl' >Blogs</h1>
      <div className='flex gap-5 m-5 flex-wrap'>
        {blogs
          .toSorted((a, b) => b.likes - a.likes)
          .map((blog) => (
            <div className="card bg-base-100 w-96 shadow-xl" key={blog.id}>
              <div className="card-body ">
                <h2 className="card-title">{blog.title}</h2>
                <p>Author: {blog.author}</p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary"><Link to={`/blogs/${blog.id}`}>view</Link></button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default BlogList