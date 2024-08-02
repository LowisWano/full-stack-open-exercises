import { useState, useEffect } from 'react'
// components
import Blog from './components/Blog'
import Login from './components/Login'

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
      clearLoginInputFields()
    } catch (exception){
      console.log('Wrong credentials, will implement notif react state later');
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
      // concat response to blog state
      console.log(response)
      setBlogs(blogs.concat(response))
      console.log("created blog successfully! will handle notif later")
      clearNewBlogInputFields()
    } catch (error) {
      console.log("Failed! ", error.response.data.error)
    }
  }

  if(user === null){
    return (
      <Login
        handleLogin = {handleLogin}
        username = {username}
        setUsername = {setUsername}
        password = {password}
        setPassword = {setPassword}
      />
    )
  }

  return (
    <div>
      <h1>blogs</h1>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>

      <form onSubmit={handleCreateBlog}>
        <h1>Create New</h1>
        <p>
          title: 
          <input type='text' value={title} onChange={({ target }) => setTitle(target.value)}/>
        </p>
        <p>
          author:
          <input type='text' value={author} onChange ={({ target }) => setAuthor(target.value)}/>
        </p>
        <p>
          url:
          <input type='text' value={url} onChange ={({ target }) => setUrl(target.value)}/>
        </p>
        <button type='text'>create</button>
      </form>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App