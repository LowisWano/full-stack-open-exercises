import { useRef } from "react"
import BlogList from "./BlogList"
import CreateBlog from "./CreateBlog"
import Togglable from "../../components/Togglable"

const Home = () => {
  const blogFormRef = useRef()
  return (
    <div>
      <Togglable buttonLabelBefore="create new blog" buttonLabelAfter="cancel" ref={blogFormRef}>
        <CreateBlog blogFormRef={blogFormRef} />
      </Togglable>
      <BlogList/>
    </div>
  )
}

export default Home