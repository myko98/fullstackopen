const bcrypt = require('bcrypt')
const { response } = require('express')
const usersRouter = require('express').Router()
const User = require('../models/user')

//HTTP POST request in order to add a user
usersRouter.post('/', async (req, res) => {
	//grab info from request
	const { username, name, password } = req.body
	
	// ensures uniqueness 
	const existingUser = await User.findOne({ username })

	if (existingUser) {
		console.log(existingUser)
		return res.status(400).json({
			error: 'username must be unique'
		})
	}

	//encrypt our password
	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)

	console.log(passwordHash)

	const user = new User({
		username,
		name,
		passwordHash
	})

	//save user to mongoDB
	const savedUser = await user.save()

	res.status(201).json(savedUser)
})

// HTTP GET request to get all users
usersRouter.get('/', async (req, res) => {

	let users = await User.find({}).populate('blogs')

	res.json(users)
})

module.exports = usersRouter