import loginService from "../services/loginService";
import blogService from "../services/blogService";

import { useRef } from "react";
import { useUserDispatch } from "../context/userContext";
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const usernameRef = useRef()
  const passwordRef = useRef()
  const userDispatch = useUserDispatch()
  const navigate = useNavigate()

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
      userDispatch(authenticatedUser);
      // notif.displayNotif("success", "Login Successfully");
      console.log("success!")
      navigate('/')
    } catch (error) {
      // notif.displayNotif("error", error.response.data.error);
      console.log("error")
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