import PropTypes from "prop-types";

const Login = ({
  handleLogin,
  username,
  setUsername,
  password,
  setPassword,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <h2>Log in to Application</h2>
      <div>
        <p>
          username
          <input
            type="text"
            name="Username"
            data-testid="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </p>
        <p>
          password
          <input
            type="password"
            name="Password"
            data-testid="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </p>
        <button type="submit">login</button>
      </div>
    </form>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
};

export default Login;
