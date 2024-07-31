const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const test_blogs = [
  {
    "title": "Oi Hughie, Homelander done killed me wife and took me bloody son",
    "author": "Butcher",
    "url": "https://www.youtube.com/watch?v=PmHlYDAxSOM",
    "likes": 0
  },
  {
    "title": "Flash is fast flash is cool",
    "author": "Soldier Boy",
    "url": "https://www.youtube.com/watch?v=li2WDMgHxD0",
    "likes": 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = test_blogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('GET requests to API', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('correct amount of blog posts', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, test_blogs.length)
  })

  test('unique identifier property of a blog post is named id instead of _id', async () => {
    const response = await api.get('/api/blogs')
    assert(response.body[0].hasOwnProperty("id"))
    assert(!response.body[0].hasOwnProperty("_id"))
  })

  test('a valid blog can be added', async () => {
    const new_blog = {
      'title': 'Ur ur ur ur ur',
      'author': 'Freddy Fazbear',
      'url': 'https://www.youtube.com/watch?v=PPSzurNBr8s',
      'likes': 0
    }

    await api.post('/api/blogs')
      .send(new_blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
      const response = await api.get('/api/blogs')
      const titles = response.body.map(r => r.title)
      assert.strictEqual(response.body.length, test_blogs.length + 1)
      assert(titles.includes(new_blog.title))
  })

})


after(async () => {
  await mongoose.connection.close()
})