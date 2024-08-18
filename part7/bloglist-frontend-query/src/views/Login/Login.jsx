import loginService from "../../services/loginService";

import { useRef } from "react";
import { useNavigate } from 'react-router-dom'
import { useNotify } from "../../context/notificationContext";
import { useAuthHooks } from "../../hooks/authHooks";

const Login = () => {
  // refs
  const usernameRef = useRef()
  const passwordRef = useRef()

  // hooks
  const navigate = useNavigate()
  const { displayNotif } = useNotify()
  const { loginUser } = useAuthHooks()

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
      loginUser(authenticatedUser)
      displayNotif("success", "Login Successfully");
      navigate('/')
    } catch (error) {
      displayNotif("error", error.response.data.error);
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