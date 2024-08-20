import { useParams } from "react-router-dom"
import { useBlogHooks } from '../../hooks/blogHooks'
import { useUserValue } from "../../context/userContext"
import Comments from "./Comments"

const Blog = () => {
  const blogsQuery = useBlogHooks().getQueryData()
  const blogs = blogsQuery.data
  const id = useParams().id
  const { updateLikesBlog, deleteBlog } = useBlogHooks()
  const user = useUserValue()
  
  if(blogsQuery.isLoading){
    return (
      <div className="flex justify-center items-center m-14" >
        <span className="loading loading-spinner loading-lg">loading</span>
      </div>
    )
  }
  const blog = blogs.find(b => b.id === id)
  console.log(blog.comments)
  return (
    <>
      <div>
        <div className="hero p-6">
          <div className="hero-content text-center">
            <div className="">
              <div className="p-9 rounded-box bg-base-300" >
                <h1 className="text-5xl font-bold">{blog.title} {blog.author}</h1>
                <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href={blog.url}>{blog.url}</a>
                <p>{blog.likes} likes <button className="btn btn-primary btn-sm" onClick={() => updateLikesBlog(blog)} >like</button></p>
                <p>added by {blog.user.name}</p>
                { user.username === blog.user.username && <button className="btn btn-error btn-sm" onClick={() => deleteBlog(blog)} >remove</button>}
              </div>
              <div className="divider"></div>
              <Comments blog={blog} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Blog