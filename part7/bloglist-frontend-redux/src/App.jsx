import { useState, useEffect, useRef } from "react";
// components
import Blog from "./components/Blog";
import Login from "./components/Login";
import CreateBlog from "./components/CreateBlog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

//services
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notifMessage, setNotifMessage] = useState(null);
  const [notifType, setNotifType] = useState(null);

  useEffect(() => {
    blogService.getAllBlogs().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

  const blogFormRef = useRef();

  const displayNotif = (type, message) => {
    setNotifType(type);
    setNotifMessage(message);
    setTimeout(() => {
      setNotifMessage(null);
    }, 5000);
  };

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
      setUser(authenticatedUser);
      displayNotif("success", "Login Successfully");
      clearLoginInputFields();
    } catch (error) {
      displayNotif("error", error.response.data.error);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedUser");
    setUser(null);
  };

  const createNewBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility();
    try {
      const response = await blogService.createBlog(newBlog);
      console.log(response);
      setBlogs(blogs.concat(response));
      displayNotif(
        "success",
        `a new blog ${response.title} by ${response.author} added`,
      );
    } catch (error) {
      displayNotif("error", error.response.data.error);
    }
  };

  const updateLikesBlog = async (blog) => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    try {
      const response = await blogService.likeBlog(likedBlog);
      setBlogs(
        blogs.map((blog) => (blog.id !== response.id ? blog : response)),
      );
    } catch (error) {
      displayNotif("error", error.response.data.error);
    }
  };

  const deleteBlog = async (blogToBeDeleted) => {
    if (
      window.confirm(
        `Remove ${blogToBeDeleted.title} by ${blogToBeDeleted.author}?`,
      )
    ) {
      try {
        await blogService.deleteBlog(blogToBeDeleted.id);
        setBlogs(blogs.filter((blogObj) => blogObj.id !== blogToBeDeleted.id));
        displayNotif(
          "success",
          `Successfully deleted ${blogToBeDeleted.title} by ${blogToBeDeleted.author}`,
        );
      } catch (error) {
        displayNotif("error", error.response.data.error);
      }
    }
  };

  if (user === null) {
    return (
      <div>
        <Notification message={notifMessage} notifType={notifType} />
        <Login
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    );
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notifMessage} notifType={notifType} />
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable
        buttonLabelBefore="create new blog"
        buttonLabelAfter="cancel"
        ref={blogFormRef}
      >
        <CreateBlog createNewBlog={createNewBlog} />
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            updateLikesBlog={updateLikesBlog}
            deleteBlog={deleteBlog}
            user={user}
          />
        ))}
    </div>
  );
};

export default App;
