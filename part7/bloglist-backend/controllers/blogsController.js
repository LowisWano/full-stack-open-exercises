const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')
require('express-async-errors') // no need to use try and catch with this library


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1, id: 1})
    .populate('comments', { content: 1, id: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => { 
  const blog = await Blog.findById(request.params.id)
  .populate('user', { username: 1, name: 1, id: 1})
  .populate('comments', { content: 1, id: 1 });

  if(blog){
    response.json(blog)
  }else {
    response.status(404).end()
  }
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const user = request.user

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: user
  })
  
  const result = await blog.save()
  user.blogs = user.blogs.concat(blog._id)
  await user.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', middleware.userExtractor ,async (request, response) => { 
  const blog = await Blog.findById(request.params.id)
  const user = request.user

  if(!blog){
    return response.status(404).json({ error: 'blog not found' })
  }

  if(blog.user.toString() !== user.id){
    return response.status(401).json({ error: 'unauthorized'})
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, 
    {
      new:true,
      runValidators:true,
      context:'query' 
    })
    .populate('user', { username: 1, name: 1, id: 1})
    .populate('comments', { content: 1, id: 1 });
    response.json(updatedBlog)
})

module.exports = blogsRouter