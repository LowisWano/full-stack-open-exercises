import { useState, useEffect } from 'react'
// components
import Blog from './components/Blog'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

//services
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notifMessage, setNotifMessage] = useState(null)
  const [notifType, setNotifType] = useState(null)

  useEffect(() => {
    blogService.getAllBlogs().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      setUser(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const displayNotif = (type, message)=>{
    setNotifType(type);
    setNotifMessage(message)
    setTimeout(() => {
      setNotifMessage(null)
    }, 5000);
  }

  const clearLoginInputFields = () => {
    setUsername('')
    setPassword('')
  }

  const clearNewBlogInputFields = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const authenticatedUser = await loginService.login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(authenticatedUser))
      blogService.setToken(authenticatedUser.token)
      setUser(authenticatedUser)
      displayNotif('success', 'Login Successfully')
      clearLoginInputFields()
    } catch (error){
      displayNotif('error', error.response.data.error)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try {
      const response = await blogService.createBlog({
        title: title,
        author: author,
        url: url,
      })
      setBlogs(blogs.concat(response))
      displayNotif('success', `a new blog ${title} by ${author} added`)
      clearNewBlogInputFields()
    } catch (error) {
      displayNotif('error', error.response.data.error)
    }
  }

  if(user === null){
    return (
      <div>
        <Notification
          message={notifMessage}
          notifType={notifType}
        />
        <Login
          handleLogin = {handleLogin}
          username = {username}
          setUsername = {setUsername}
          password = {password}
          setPassword = {setPassword}
        />
      </div>
    )
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification
        message={notifMessage}
        notifType={notifType}
      />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel='new blog'>
        <CreateBlog
          handleCreateBlog={handleCreateBlog}
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          url={url}
          setUrl={setUrl}
        />
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App