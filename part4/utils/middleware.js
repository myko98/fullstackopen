const { request } = require('express')
const User = require('../models/user')
const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    console.log('cast error is happening')
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else {
    console.log("hahaha the error was", error.message)
  }

  next(error)
}

const tokenExtractor = async (req, res, next) => {
	// moved from function in blog Router to middleware function
	const authorization = req.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('bearer')) {
		const decodedToken = jwt.verify(authorization.substring(7), process.env.SECRET)

		if (decodedToken) {
			// append user property to request object that finds a user with a given id
			req.user = await User.findById(decodedToken.id)

			// now req.user = user that logged in
		}
	}

	next()
}


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
	tokenExtractor
}