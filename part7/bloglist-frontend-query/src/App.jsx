// react hooks
import { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom'

// components
import Home from './views/Home/Home'
import Login from './views/Login/Login'
import Blog from './views/Blog/Blog'
import Notification from './components/Notification'
import Navbar from './components/Navbar'
import Users from './views/Users/Users'
import User from './views/User/User'

// custom 
import { useAuthHooks } from './hooks/authHooks'
import ProtectedRoutes from './utils/ProtectedRoutes'

const App = () => {
  const navigate = useNavigate()
  const { loginUser } = useAuthHooks()
  const location = useLocation()

  useEffect(() => {
    const cachedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if(cachedUser){
      loginUser(cachedUser)
      if(location.pathname !== '/login'){
        navigate(location.pathname)
      }else{
        navigate('/')
      }
    }
  }, [])

  return (
    <>
      <Navbar/>
      <Notification/>
      <Routes>
        <Route path='/login' element={ <Login/> } />
        <Route element={<ProtectedRoutes/>}>
            <Route path='/' element={ <Home/> } />
            <Route path='/blogs/:id' element={ <Blog/> } />
            <Route path='/users' element={ <Users/> } />
            <Route path='/users/:id' element={ <User/> } />
            <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  )
  
}

export default App