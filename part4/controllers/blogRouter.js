const blogsRouter = require('express').Router()
const { response } = require('express')

const jwt = require('jsonwebtoken')

// importing blog and user model
const Blog = require('../models/blog')
const User = require('../models/user')

// const getTokenFrom = req => {
// 	const authorization = req.get('authorization')
// 	if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
// 		return authorization.substring(7)
// 	}
// 	return null
// }

// routes
blogsRouter.get('/', async (request, response) => {

  let blogs = await Blog.find({}).populate('user')

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	const body = request.body
	console.log(request.user)
	if (!request.user) {
		return response.status(401).json({ error: 'token missing or invalid'})
	}
	// const token = getTokenFrom(request)
	const user = request.user

	const blog = new Blog({
	title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes,
		user: user._id
	})

  // const blog = new Blog(request.body)
  let savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

  response.status(201).json(savedBlog)

})

blogsRouter.delete('/:id', async (req, res) => {
	// use token extractor middleware to get user
	// 
  const id = req.params.id

  const user = req.user
	const blog = await Blog.findById(id)

	if (user._id.toString() === blog.user.toString()) {
		await Blog.findByIdAndDelete(id)
  	res.status(204).end()
	} else {
		return response.status(401).json({ error: 'token does not match blog' })
	}

  await Blog.findByIdAndDelete(id)
  res.status(204).end()
})


blogsRouter.put('/:id', async (req, res) => {
  const body = req.body

  await Blog.findByIdAndUpdate(req.params.id, {likes: body.likes})

  res.status(204).end()
})




module.exports = blogsRouter