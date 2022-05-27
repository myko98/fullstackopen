const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blogsRouter = require('../controllers/blogRouter')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())

  await Promise.all(promiseArray)
  // let blogObject = new Blog(helper.initialBlogs[0])
  // await blogObject.save()
  // blogObject = new Blog(helper.initialBlogs[1])
  // await blogObject.save()
})


// test('number of blogs', async () => {
//   let response = await api.get('/api/blogs')
//   expect(response.body).toHaveLength(2)
// })

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('blog id exists', async () => {
  let response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined();
})

test('Adding a blog works', async () => {

  const blog = {
    "title": "adding a blog works",
    "author": "captain underpants",
    "url": "abcd",
    "likes": 100
  }

  //added blog above
  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-type', /application\/json/)

  //get all blogs (including one added above)
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.author)

  //expect the length of blogs to increase by 1
  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  //make sure blog added is within body
  expect(contents).toContain('captain underpants')
})

test('default like set to 0', async () => {
  const blog = {
    "title": "default like",
    "author": "Steven Kellogg",
    "url": "abcd"
  }

  //first we add the blog above with no likes
  await api
    .post('/api/blogs')
    .send(blog)
    .expect(201)
    .expect('Content-type', /application\/json/)

  //after blog is added we get all blogs and check that most recent blog added has default likes of 0
  let response = await api.get('/api/blogs')
  expect(response.body[2].likes).toBe(0)

})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )
  })
})


test('editing a blog', async () => {

  const blogsAtStart = await helper.blogsInDb()
  const blogToEdit = blogsAtStart[0]

  await api
    .put(`/api/blogs/${blogToEdit.id}`)
    .send({"likes":888})
    .expect(204)

  let response = await api.get('/api/blogs')

  expect(response.body[0].likes).toBe(888)
})

afterAll(() => {
  mongoose.connection.close()
})