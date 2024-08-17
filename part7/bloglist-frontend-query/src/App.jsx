// react hooks
import { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'

// components
import Home from './views/Home/Home'
import Login from './views/Login/Login'
import Blog from './views/Blog/Blog'
import Notification from './components/Notification'
import Navbar from './components/Navbar'


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
        </Route>
      </Routes>
    </>
  )
  
}

export default App