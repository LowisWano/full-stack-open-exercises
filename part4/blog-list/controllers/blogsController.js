const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
require('express-async-errors') // no need to use try and catch with this library

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => { 
  const blog = await Blog.findById(request.params.id)
  if(blog){
    response.json(blog)
  }else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response) => {
  const user = await User.findOne()

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: user.id
  })
  const result = await blog.save()
  user.blogs = user.blogs.concat(blog._id)
  await user.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  const result = await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    'title': request.body.title,
    'author': request.body.author,
    'url': request.body.url,
    'likes': request.body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, 
    {
      new:true,
      runValidators:true,
      context:'query' 
    })
    response.json(updatedBlog)
})

module.exports = blogsRouter