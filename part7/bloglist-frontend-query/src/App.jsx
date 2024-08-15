// hooks
import { useEffect } from 'react'
import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'
import { useUserDispatch, useUserValue } from './context/userContext'

// components
import Home from './views/Home/Home'
import Login from './views/Login/Login'
import Notification from './components/Notification'
import Navbar from './components/Navbar'

import blogService from './services/blogService'
import { useAuthHooks } from './hooks/authHooks'

const App = () => {
  const navigate = useNavigate()
  const user = useUserValue()
  const auth = useAuthHooks()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if(loggedUserJSON){
      const loggedUser = JSON.parse(loggedUserJSON)
      auth.loginUser(loggedUser)
      blogService.setToken(loggedUser.token)
      navigate('/')
    }else {
      navigate('/login')
    }
  }, [])
  
  return (
    <>
      {user && <Navbar/>}
      <Notification/>
      <Routes>
        <Route path='/login' element={ <Login/> } />
        <Route path='/' element={ <Home/> } />
      </Routes>
    </>
  )
  
}

export default App