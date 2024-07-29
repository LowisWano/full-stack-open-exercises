const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')

const blogsRouter = require('./controllers/blogsController')

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

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
