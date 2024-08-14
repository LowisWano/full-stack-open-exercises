import PropTypes from "prop-types";
import { useState } from "react";
import { useUserDispatch } from "../context/userContext";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { useNotify } from "../context/notificationContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const userDispatch = useUserDispatch()
  const notif = useNotify()

  const clearLoginInputFields = () => {
    setUsername("");
    setPassword("");
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const authenticatedUser = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem(
        "loggedUser",
        JSON.stringify(authenticatedUser),
      );
      blogService.setToken(authenticatedUser.token);
      userDispatch(authenticatedUser);
      notif.displayNotif("success", "Login Successfully");
      clearLoginInputFields();
    } catch (error) {
      notif.displayNotif("error", error.response.data.error);
    }
  };
  

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

export default Login;
