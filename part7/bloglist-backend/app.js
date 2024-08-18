// dependencies
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

// controllers
const blogsRouter = require('./controllers/blogsController')
const usersRouter = require('./controllers/usersController')
const loginRouter = require('./controllers/loginController')
const commentsRouter = require('./controllers/commentsController')

// utilities
const config = require('./utils/config')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')


mongoose.set('strictQuery',false)
const connectDatabase = async () => {
  try{
    await mongoose.connect(config.MONGODB_URI)
    logger.info('Successfully connected to MongoDB.')
  } catch(error){
    logger.error('Error connecting to MongoDB: ', error)
  }
}
connectDatabase()


app.use(cors())
// app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/blogs', commentsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
