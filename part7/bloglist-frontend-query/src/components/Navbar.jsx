import { useUserDispatch } from "../context/userContext";
import { useAuthHooks } from "../hooks/authHooks";

const Navbar = () => {
  const userDispatch = useUserDispatch()
  const auth = useAuthHooks()

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    auth.logoutUser()
  };

  return (
    <div>
      <button onClick={handleLogout} >logout</button>
    </div>
  )
}

export default Navbar