import loginService from "../../services/loginService";
import blogService from "../../services/blogService";

import { useRef } from "react";
import { useNavigate } from 'react-router-dom'
import { useUserDispatch } from "../../context/userContext";
import { useNotify } from "../../context/notificationContext";
import { useAuthHooks } from "../../hooks/authHooks";

const Login = () => {
  const usernameRef = useRef()
  const passwordRef = useRef()
  const userDispatch = useUserDispatch()
  const navigate = useNavigate()
  const notif = useNotify()
  const auth = useAuthHooks()

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const authenticatedUser = await loginService.login({
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      });
      window.localStorage.setItem(
        "loggedUser",
        JSON.stringify(authenticatedUser),
      );
      blogService.setToken(authenticatedUser.token);
      auth.loginUser(authenticatedUser)
      notif.displayNotif("success", "Login Successfully");
      navigate('/')
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
            ref={usernameRef}
          />
        </p>
        <p>
          password
          <input
            type="password"
            name="Password"
            data-testid="password"
            ref={passwordRef}
          />
        </p>
        <button type="submit">login</button>
      </div>
    </form>
  );
}

export default Login