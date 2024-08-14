import axios from "axios";
const baseUrl = "http://localhost:3001/api/blogs";

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAllBlogs = async () => {
  const response = await axios.get(baseUrl);
  console.log(response.data)
  return response.data;
};

const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const likeBlog = async (likedBlog) => {
  const response = await axios.put(`${baseUrl}/${likedBlog.id}`, likedBlog);
  return response.data;
};

const deleteBlog = async (blogToDeleteId) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${blogToDeleteId}`, config);
  return response.data;
};

export default {
  setToken,
  getAllBlogs,
  createBlog,
  likeBlog,
  deleteBlog,
};
