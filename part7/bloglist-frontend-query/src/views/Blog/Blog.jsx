import { useParams } from "react-router-dom"
import { useBlogHooks } from '../../hooks/blogHooks'
import { useUserValue } from "../../context/userContext"

const Blog = () => {
  const blogsQuery = useBlogHooks().getQueryData()
  const blogs = blogsQuery.data
  const id = useParams().id
  const { updateLikesBlog, deleteBlog } = useBlogHooks()
  const user = useUserValue()
  
  if(blogsQuery.isLoading){
    return <div>Loading data ...</div>
  }

  const blog = blogs.find(b => b.id === id)
  console.log(blog.comments)
  return (
    <>
      <h1>{blog.title} {blog.author}</h1>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes <button onClick={() => updateLikesBlog(blog)} >like</button></p>
      <p>added by {blog.user.name}</p>
      { user.username === blog.user.username && <button onClick={() => deleteBlog(blog)} >remove</button>}
      <h3>comments</h3>
      <ul>
        {
          blog.comments.map((comment) => (
            <li key={comment.id} >{comment.content}</li>
          ))
        }
      </ul>
    </>
  )
}

export default Blog