import { useUsersHook } from "../../hooks/usersHooks"
import { useParams } from "react-router-dom"

const User = () => {
  const users = useUsersHook().getAllUsers()
  const id = useParams().id

  if (!users){
    return <div>loading data...</div>
  }

  const user = users.find((user) => user.id === id)
  console.log(user)
  return (
    <>
      <h1>{user.name}</h1>
      <h2>added blogs</h2>
      <ul>
        {
          user.blogs.map((blog) => (
            <li key={blog.id}>{blog.title}</li>
          ))
        }
      </ul>
    </>
  )
}

export default User