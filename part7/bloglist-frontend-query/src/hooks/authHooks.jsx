import { useNavigate } from "react-router-dom"
import { useUserDispatch } from "../context/userContext"
import blogService from '../services/blogService'

export const useAuthHooks = () => {
  const userDispatch = useUserDispatch()
  const navigate = useNavigate()

  const loginUser = (user) => {
    blogService.setToken(user.token)
    userDispatch({
      type: 'LOGIN',
      payload: user
    })
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

