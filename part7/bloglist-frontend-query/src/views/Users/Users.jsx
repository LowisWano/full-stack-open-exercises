import { useUsersHook } from "../../hooks/usersHooks"
import { Link } from "react-router-dom"

const Users = () => {

  const users = useUsersHook().getAllUsers()

  if (!users){
    return <div>loading data...</div>
  }

  console.log(users)
  return (
    <>
      <h1>Users</h1>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
            {
              users.map((user) => (
                <tr key={user.id} >
                  <td>
                    <Link to={`/users/${user.id}`} >{user.name}</Link>
                  </td>
                  <td>{user.blogs.length}</td>
                </tr>
              ))
            }
        </tbody>
      </table>
    </>
  )
}

export default Users