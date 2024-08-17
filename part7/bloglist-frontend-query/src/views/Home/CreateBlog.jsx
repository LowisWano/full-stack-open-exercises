import { useRef } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import blogService from "../../services/blogService";
import { useNotify } from "../../context/notificationContext";

const CreateBlog = () => {

  const titleRef = useRef()
  const authorRef = useRef()
  const urlRef = useRef()

  const notif = useNotify()
  const queryClient = useQueryClient()
  
  const newBlogMutation = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog));
      notif.displayNotif(
        "success",
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
      );
      titleRef.current.value = "";
      authorRef.current.value = "";
      urlRef.current.value = "";
    },
    onError: (error) => {
      notif.displayNotif("error", error.response.data.error);
    }
  })

  // reminder to use tests instead of manually inputting forms
  const handleCreateBlogSubmit = (event) => {
    event.preventDefault()
    newBlogMutation.mutate({
      title: titleRef.current.value,
      author: authorRef.current.value,
      url: urlRef.current.value
    })
  }

  return (
    <form onSubmit={handleCreateBlogSubmit}>
      <h2>Create new blog</h2>
      <p>
        title:
        <input
          placeholder="title"
          type="text"
          ref={titleRef}
        />
      </p>
      <p>
        author:
        <input
          placeholder="author"
          type="text"
          ref={authorRef}
        />
      </p>
      <p>
        url:
        <input
          placeholder="url"
          type="text"
          ref={urlRef}
        />
      </p>
      <button type="submit">create</button>
    </form>
  );
}

export default CreateBlog