const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')
require('express-async-errors')

commentsRouter.get('/:id/comments', async (request, response) => {
  const comments = await Comment.find({'blog': request.params.id}).populate('blog', { url: 1, title: 1, author: 1, id: 1})
  console.log(comments)
  response.json(comments)
})

commentsRouter.post('/:id/comments', async (request, response) => {
  console.log(request.params.id)
  const blog = await Blog.findById(request.params.id)

  const comment = new Comment({
    content: request.body.content,
    blog: blog
  })
  
  const result = await comment.save()
  blog.comments = blog.comments.concat(comment._id)
  await blog.save()
  console.log(blog)
  response.status(201).json(result)
})

module.exports = commentsRouter