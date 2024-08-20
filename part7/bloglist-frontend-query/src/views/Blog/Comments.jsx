import { useRef } from "react"
import blogService from "../../services/blogService"
import { useBlogHooks } from "../../hooks/blogHooks"

const Comments = ({ blog }) => {
  const commentRef = useRef()
  const { commentBlog } = useBlogHooks()
  const handleCommentSubmit = (event) => {
    event.preventDefault()
    commentBlog({ content: commentRef.current.value }, blog.id)
    commentRef.current.value = ""
  }

  return (
    <>
      <div className="flex flex-col gap-2" >
        <h3 className="font-bold text-2xl">comments</h3>
        <form onSubmit={handleCommentSubmit} className="space-x-2">
          <input className="input input-bordered input-sm w-full max-w-xs" type="text" ref={commentRef} />
          <button className="btn btn-sm" >add comment</button>
        </form>
        <div className="flex flex-col justify-center items-center gap-4 p-3">
          {
            blog.comments.map((comment) => (
              <div key={comment.id}  className="card bg-base-100 w-full shadow-md">
                <div className="flex justify-center p-4">
                  <p>
                    {comment.content}
                  </p>
                </div>
              </div>
        
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Comments