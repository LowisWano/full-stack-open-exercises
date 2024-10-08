import { useUserValue } from "../context/userContext";
import { useAuthHooks } from "../hooks/authHooks";
import { Link } from "react-router-dom";

const Navbar = () => {
  const auth = useAuthHooks()
  const user = useUserValue()

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    auth.logoutUser()
  };

  if(!user){
    return null
  }
  
  return (
    <div>
      <div className="navbar bg-base-300">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
              <li><Link to='/'>blogs</Link></li>
              <li><Link to='/users'>users</Link></li>
            </ul>
          </div>
          <Link className="btn btn-ghost text-xl" to='/'>blogify</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><Link to='/'>blogs</Link></li>
            <li><Link to='/users'>users</Link></li>
          </ul>
        </div>
        <div className="navbar-end space-x-9">
          <span>logged in as {user.name}</span>
          <a className="btn" onClick={handleLogout}>Logout</a>
        </div>
      </div>
    </div>
  )
}

export default Navbar