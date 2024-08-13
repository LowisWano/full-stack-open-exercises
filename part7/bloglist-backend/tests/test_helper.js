const User = require('../models/user')
const Blog = require('../models/blog')

const test_blogs = [
  {
    title: "Oi Hughie, Homelander done killed me wife and took me bloody son",
    author: "Butcher",
    url: "https://www.youtube.com/watch?v=PmHlYDAxSOM",
    likes: 0
  },
  {
    title: "Flash is fast flash is cool",
    author: "Soldier Boy",
    url: "https://www.youtube.com/watch?v=li2WDMgHxD0",
    likes: 4
  }
]


const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = {
  test_blogs,
  blogsInDb,
  usersInDb
}