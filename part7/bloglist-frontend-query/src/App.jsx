// hooks
import { useEffect } from 'react'
import { Routes, Route, Link, useMatch, useNavigate } from 'react-router-dom'
import { useUserValue } from './context/userContext'

// components
import BlogList from './views/BlogList'
import Login from './views/Login'
import Notification from './components/Notification'


const App = () => {
  const navigate = useNavigate()
  const user = useUserValue()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if(!loggedUserJSON){
      navigate('/login')
    }
  }, [])

  return (
    <Routes>
      <Route path='/login' element={ <Login/> } />
      <Route path='/' element={ <BlogList/> } />
    </Routes>
  )
  
}

export default App