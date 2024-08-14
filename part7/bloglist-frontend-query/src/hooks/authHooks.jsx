import { useNavigate } from "react-router-dom"
import { useUserDispatch } from "../context/userContext"

export const useAuthHooks = () => {
  const userDispatch = useUserDispatch()
  const navigate = useNavigate()

  const loginUser = (user) => {
    userDispatch({
      type: 'LOGIN',
      payload: user
    })
    navigate('/login')
  }

  const logoutUser = () => {
    userDispatch({
      type: 'LOGOUT',
      payload: null
    })
    navigate('/login')
  }

  return {
    logoutUser,
    loginUser
  }
}

