import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogService'

const BlogList = () => {
  const blogsQuery = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAllBlogs,
    refetchOnWindowFocus: false
  })

  if(blogsQuery.isLoading){
    return <div>Loading data ...</div>
  }

  const blogs = blogsQuery.data

  return (
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <p key={blog.title} >{blog.title}</p>
        ))}
    </div>
  )
}

export default BlogList