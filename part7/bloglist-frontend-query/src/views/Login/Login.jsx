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
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
            quasi. In deleniti eaque aut repudiandae et a id nisi.
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-screen-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleLogin}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="text" name="Username" data-testid="username" ref={usernameRef} className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type="password" name="Password" data-testid="password" ref={passwordRef} className="input input-bordered" required />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login