import { Outlet, Navigate } from "react-router-dom";
import { useUserValue } from "../context/userContext";

const ProtectedRoutes = () => {
  const user = useUserValue()
  return user ? <Outlet/> : <Navigate to='/login' replace/>
}

export default ProtectedRoutes