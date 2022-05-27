const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    "title": "test blog1",
    "author": "Steven Kellogg",
    "url": "abcd",
    "likes": 1
  },
  {
    "title": "test blog2",
    "author": "loius clarkson",
    "url": "abcd",
    "likes": 2
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ "title": "delete",
  "author": "Mark Delete",
  "url": "delete", })

  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
	//find all users
	const users = await User.find({})

	//return array of JSON
	return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}