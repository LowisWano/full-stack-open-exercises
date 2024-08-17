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
      <Link to='/'>blogs</Link>
      <Link to='/users'>users</Link>
      <button onClick={handleLogout} >logout</button>
    </div>
  )
}

export default Navbar