const { test, after, describe, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')

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

// save thru api nalang first rather than direct querying
beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const test_valid_user = {
    username: "validUser",
    name: "luis",
    password: "luis"
  }
  const test_unauthorized_user = {
    username: "invalidUser",
    name: "notluis",
    password: "notluis"
  }

  await api.post('/api/users').send(test_valid_user)
  await api.post('/api/users').send(test_unauthorized_user)

  const response = await api.post('/api/login').send({ username: "validUser", password: "luis" })
  const token = response.body.token

  const promiseArray = test_blogs.map(blog => api.post('/api/blogs').send(blog).set({ Authorization: `Bearer ${token}` }))
  await Promise.all(promiseArray)
})

describe('POST /api/users', () => {
  test('invalid users cannot be created and is responded with status code 400', async () => {
    const usersBefore = await helper.usersInDb()

    const invalid_user = {
      username: 'HL',
      name: 'Benjamin Gillman',
      password: 'ui'
    }

    const result = await api.post('/api/users')
      .send(invalid_user)
      .expect(400)

    const usersAfter = await helper.usersInDb()
    assert(usersAfter.length === usersBefore.length)
    assert(result.body.error === 'password is too short')
  })
})

describe('GET /blogs', () => {
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
})

describe('POST /blogs', () => {
  let token
  beforeEach(async () => {
    const response = await api.post('/api/login').send({ username: "validUser", password: "luis" })
    token = response.body.token
  })

  test('a valid blog can be added', async () => {
    const new_blog = {
      title: 'Ur ur ur ur ur',
      author: 'Freddy Fazbear',
      url: 'https://www.youtube.com/watch?v=PPSzurNBr8s',
      likes: 5
    }
    await api.post('/api/blogs')
      .send(new_blog)
      .set({ Authorization: `Bearer ${token}` })
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .expect((response) => {
        assert.strictEqual(response.body.title, new_blog.title)
        assert.strictEqual(response.body.author, new_blog.author)
        assert.strictEqual(response.body.url, new_blog.url)
        assert.strictEqual(response.body.likes, new_blog.likes)
      })
    
      const response = await api.get('/api/blogs')
      assert.strictEqual(response.body.length, test_blogs.length + 1)
  })

  test('adding a blog fails with status code 401 if token is not provided', async () => {
    const new_blog = {
      title: 'Ur ur ur ur ur',
      author: 'Freddy Fazbear',
      url: 'https://www.youtube.com/watch?v=PPSzurNBr8s',
      likes: 5
    }
    await api.post('/api/blogs')
      .send(new_blog)
      .set({ Authorization: `Bearer ${null}` })
      .expect(401)
  })

  test('likes property default value is 0 if it is missing from request', async () => {
    const new_blog = {
      title: 'Despite everything, its still you.',
      author: 'Determination',
      url: 'https://www.youtube.com/watch?v=x41MhOJIVOc'
    }

    await api.post('/api/blogs')
      .send(new_blog)
      .set({ Authorization: `Bearer ${token}` })
      .expect(201)
      .expect('Content-Type', /application\/json/)
      .expect((response) => {
        assert.strictEqual(response.body.likes, 0)
      })
  })

  test('respond with status code 400 if title and url is missing', async () => {
    const new_blog = {
      author: 'Freddy Fazbear',
      likes: 3
    }

    await api.post('/api/blogs')
      .send(new_blog)
      .set({ Authorization: `Bearer ${token}` })
      .expect(400)
  })
})

describe('DELETE /blogs/:id', () => {
  let token
  beforeEach(async () => {
    const response = await api.post('/api/login').send({ username: "validUser", password: "luis" })
    token = response.body.token
  })

  test('delete a single blog resource', async () => {
    const blogsBeforeDelete = await api.get('/api/blogs')
    const idToDelete = blogsBeforeDelete.body[0].id 
    
    await api.delete(`/api/blogs/${idToDelete}`)
      .set({ Authorization: `Bearer ${token}` })
      .expect(204)
    
    const blogsAfterDelete = await api.get('/api/blogs')
    assert.strictEqual(blogsAfterDelete.body.length, test_blogs.length - 1)
    assert(!blogsAfterDelete.body.some((blog) => blog.id === idToDelete))
  })
})

describe('UPDATE /blogs/:id', () => {
  test('update a single blog resource', async () => {
    const blogsBeforeUpdate = await api.get('/api/blogs')
    const sample_blog = blogsBeforeUpdate.body[0]
    const idToUpdate = sample_blog.id

    const updatedBlog = {
      ...sample_blog,
      likes: sample_blog.likes + 1
    }

    await api.put(`/api/blogs/${idToUpdate}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .expect((response) => {
        assert.strictEqual(response.body.title, updatedBlog.title)
        assert.strictEqual(response.body.author, updatedBlog.author)
        assert.strictEqual(response.body.url, updatedBlog.url)
        assert.strictEqual(response.body.likes, updatedBlog.likes)
      })
  })
})

after(async () => {
  await mongoose.connection.close()
})