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
    <>
      <div className="card bg-base-100 w-full max-w-screen-sm shrink-0 shadow-2xl">
        <form className="card-body" onSubmit={handleCreateBlogSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input placeholder="title" type="text" ref={titleRef} className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Author</span>
            </label>
            <input placeholder="author name" type="text" ref={authorRef} className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">URL</span>
            </label>
            <input placeholder="url" type="text" ref={urlRef} className="input input-bordered" required />
          </div>
          <div className="form-control mt-6">
            <button type="submit" className="btn btn-success">Create</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateBlog