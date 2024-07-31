const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors') // no need to use try and catch with this library

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => { 
  const blog = await Blog.findById(request.params.id)
  if(blog){
    response.json(blog)
  }else {
    response.status(404).end()
  }
})

blogsRouter.post('/', async (request, response, next) => {
  const blog = new Blog({
    'title': request.body.title,
    'author': request.body.author,
    'url': request.body.url,
    'likes': request.body.likes || 0
  })
  const result = await blog.save()
  response.status(201).json(result)
})

module.exports = blogsRouter