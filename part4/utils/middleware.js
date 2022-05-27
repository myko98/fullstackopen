const logger = require('./logger')

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

// const tokenExtractor = (request, response, next) => {
// 	const getTokenFrom = req => {
// 		const authorization = req.get('authorization')
// 		if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
// 			return authorization.substring(7)
// 		}
// 		return null
// 	}

// 	let token = getTokenFrom(request)

// 	if (token != null) {
// 		console.log(token)
// 		return response.status(400).json({request, token})
// 	}

// 	next()
// }


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
	// tokenExtractor
}