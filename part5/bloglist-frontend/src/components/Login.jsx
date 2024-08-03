const Login = ({ handleLogin, username, setUsername, password, setPassword }) => {
  return (
    <form onSubmit={handleLogin}>
      <h2>Log in to Application</h2>
      <div>
        <p>username 
          <input type="text" name="Username" value={username} onChange={({ target }) => setUsername(target.value)}/>
        </p>
        <p>password 
          <input type="text" name="Password" value={password} onChange={({ target }) => setPassword(target.value)}/>
          </p>
        <button type="submit">login</button>
      </div>
    </form>
  )
}

export default Login