import { useNavigate } from 'react-router-dom'
import { useNotify } from '../context/notificationContext'
import blogService from '../services/blogService'
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'

export const useBlogHooks = () => {
  const queryClient = useQueryClient()
  const { displayNotif } = useNotify()
  const navigate = useNavigate()

  const blogsQuery = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAllBlogs,
    refetchOnWindowFocus: false
  })

  const newBlogMutation = useMutation({
    mutationFn: blogService.createBlog,
    onMutate: async (newBlog) => {
      return { clearFields: newBlog.clearFields };
    },
    onSuccess: (newBlog, variables, context) => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog));
      displayNotif(
        "success",
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
      );
      if (context?.clearFields) {
        context.clearFields();
      }
    },
    onError: (error) => {
      displayNotif("error", error.response.data.error);
    }
  });

  const updateBlogMutation = useMutation({
    mutationFn: blogService.likeBlog,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.map(blog=>blog.id !== updatedBlog.id ? blog: updatedBlog))
    },
    onError: (error) => {
      displayNotif("error", error.response.data.error)
    }
  })

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
    onError: (error) => {
      displayNotif("error", error.response.data.error);
    }
  })

  const commentBlogMutation = useMutation({
    mutationFn: blogService.commentBlog,
    onSuccess: (comment) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.map(blog => blog.id !== comment.blog.id ? blog : { ...blog, comments: blog.comments.concat(comment)}))
    },
    onError: (error) => {
      displayNotif("error", error.response.data.error);
    }
  })

  const getQueryData = () => {
    return blogsQuery
  }

  const createNewBlog = async (newBlog, clearFields) => {
    newBlogMutation.mutate({ ...newBlog, clearFields });
  };

  const updateLikesBlog = async (blog) => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    updateBlogMutation.mutate(likedBlog);
  }

  const deleteBlog = async (blogToBeDeleted) => {
    if (window.confirm(`Remove ${blogToBeDeleted.title} by ${blogToBeDeleted.author}?`)) {
      deleteBlogMutation.mutate(blogToBeDeleted.id)
      displayNotif(
        "success",
        `Successfully deleted ${blogToBeDeleted.title}`,
      );
      navigate('/')
    }
  };

  const commentBlog = (comment, id) => {
    commentBlogMutation.mutate({ content: comment, blogId: id })
  }

  return {
    getQueryData,
    createNewBlog,
    updateLikesBlog,
    deleteBlog,
    commentBlog
  }
}