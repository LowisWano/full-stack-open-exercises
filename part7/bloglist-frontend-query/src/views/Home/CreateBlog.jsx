import { useRef } from "react";
import { useBlogHooks } from "../../hooks/blogHooks";

const CreateBlog = ({ blogFormRef }) => {
  const titleRef = useRef()
  const authorRef = useRef()
  const urlRef = useRef()
  const { createNewBlog } = useBlogHooks()

  const handleCreateBlogSubmit = (event) => {
    event.preventDefault()
    createNewBlog(
      {
        title: titleRef.current.value,
        author: authorRef.current.value,
        url: urlRef.current.value
      },
      () => {
        titleRef.current.value = "";
        authorRef.current.value = "";
        urlRef.current.value = "";
        blogFormRef.current.toggleVisibility()
      }
    )
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