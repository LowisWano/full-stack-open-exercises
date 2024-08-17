import { useUserValue } from "../context/userContext";
import { useAuthHooks } from "../hooks/authHooks";

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
      <button onClick={handleLogout} >logout</button>
    </div>
  )
}

export default Navbar