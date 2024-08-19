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
      <form onSubmit={handleCommentSubmit} >
        <input type="text" ref={commentRef} />
        <button>add comment</button>
      </form>
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

export default Comments