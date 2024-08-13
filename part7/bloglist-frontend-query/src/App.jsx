// react hooks
import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notifMessage, setNotifMessage] = useState(null);
  const [notifType, setNotifType] = useState(null);

  const blogsQuery = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAllBlogs
  })

  // there's probably a way to seperate the logic for this portion somewhere else..
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);

  const blogFormRef = useRef();

  // also this one as well for anything mutation related
  const queryClient = useQueryClient()

  const newBlogMutation = useMutation({
    mutationFn: blogService.createBlog,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(['blogs'], blogs.concat(newBlog));
      displayNotif(
        "success",
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
      );
    },
    onError: (error) => {
      displayNotif("error", error.response.data.error);
    }
  })

  const updateBlogMutation = useMutation({
    mutationFn: blogService.likeBlog,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blogs.map(blog=>blog.id !== updatedBlog.id ? blog: updatedBlog))

    },
    onError: (error) => {
      displayNotif("error", error.response.data.error)
    }
  })

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
    newBlogMutation.mutate(newBlog)
  };

  const updateLikesBlog = async (blog) => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    updateBlogMutation.mutate(likedBlog);
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

  if(blogsQuery.isLoading){
    return <div>Loading data ...</div>
  }

  const blogs = blogsQuery.data

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
