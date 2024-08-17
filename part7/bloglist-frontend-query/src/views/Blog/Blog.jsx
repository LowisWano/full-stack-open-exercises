import { useParams } from "react-router-dom"
import { useBlogHooks } from '../../hooks/blogHooks'

const Blog = () => {
  const blogsQuery = useBlogHooks().getQueryData()
  const blogs = blogsQuery.data
  const id = useParams().id
  
  if(blogsQuery.isLoading){
    return <div>Loading data ...</div>
  }

  const blog = blogs.find(b => b.id === id)
  console.log(blog)

  return (
    <>
      <h1>hello</h1>
    </>
  )
}

export default Blog