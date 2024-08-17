import blogService from '../services/blogService'
import { useQuery } from '@tanstack/react-query'

export const useBlogHooks = () => {
  const blogsQuery = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAllBlogs,
    refetchOnWindowFocus: false
  })

  const getQueryData = () => {
    return blogsQuery
  }

  return {
    getQueryData
  }
}