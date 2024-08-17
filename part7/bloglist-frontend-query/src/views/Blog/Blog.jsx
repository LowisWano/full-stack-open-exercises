import { useParams } from "react-router-dom"
import { useBlogHooks } from '../../hooks/blogHooks'

const Blog = () => {
  const blogsQuery = useBlogHooks().getQueryData()
  const blogs = blogsQuery.data
  const id = useParams().id
  const { updateLikesBlog, deleteBlog } = useBlogHooks()
  
  if(blogsQuery.isLoading){
    return <div>Loading data ...</div>
  }

  const blog = blogs.find(b => b.id === id)

  return (
    <>
      <h1>{blog.title} {blog.author}</h1>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes <button onClick={() => updateLikesBlog(blog)} >like</button></p>
      <p>added by {blog.user.name}</p>
      <button onClick={() => deleteBlog(blog)} >remove</button>
    </>
  )
}

export default Blog