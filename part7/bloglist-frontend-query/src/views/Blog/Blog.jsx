import { useParams } from "react-router-dom"
import { useBlogHooks } from '../../hooks/blogHooks'

const Blog = () => {
  const blogsQuery = useBlogHooks().getQueryData()
  const blogs = blogsQuery.data
  const id = useParams().id
  const { updateLikesBlog } = useBlogHooks()
  
  if(blogsQuery.isLoading){
    return <div>Loading data ...</div>
  }

  const blog = blogs.find(b => b.id === id)
  console.log(blog)

  return (
    <>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes <button onClick={ () => updateLikesBlog(blog) } >like</button></p>
      <p>added by {blog.user.name}</p>
    </>
  )
}

export default Blog