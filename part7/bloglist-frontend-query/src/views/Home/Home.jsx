import { useRef } from "react"
import BlogList from "./BlogList"
import CreateBlog from "./CreateBlog"
import Togglable from "../../components/Togglable"

const Home = () => {
  const blogFormRef = useRef()
  return (
    <div className="flex justify-center items-center flex-col p-10">
      <BlogList/>
      <Togglable buttonLabelBefore="create new blog" buttonLabelAfter="cancel" ref={blogFormRef}>
        <CreateBlog blogFormRef={blogFormRef} />
      </Togglable>
    </div>
  )
}

export default Home