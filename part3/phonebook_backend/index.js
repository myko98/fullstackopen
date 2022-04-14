const e = require('express')
const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

require('dotenv').config();
const Person = require('./models/person')

app.use(cors())
app.use(express.json())

app.use(express.static('build'))

//creating data token
morgan.token('jsonData', function (req, res) { return JSON.stringify(req.body) })

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.jsonData(req, res)
  ].join(' ')
})
)

let data = [
  {
    "id": 1,
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  },
  {
    "id": 5,
    "name": "Myko",
    "number": "39-23-6423122"
  }
]

app.get('/', (req, res) => {
  res.json(data)
})

app.get('/info', (req, res) => {
  const currentTime = new Date();
  res.send(`<p> Phonebook has info for ${data.length} people </p>
  <p>${currentTime}</p>`)
})

//get list of all persons
app.get('/api/persons', (req, res) => {
  Person.find({}).then(person => {
    console.log(person)
    res.json(person)
  })
})

//3.18 get a specific person
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)

  // const person = data.find(x => x.id == id)

  // if (person) {
  //   res.send(person)
  // } else {
  //   res.status(404).end()
  // }
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      response.status(500).end()
    })
})

//delete a person
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  // data = data.filter(person => person.id != id)
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

//adding a person
app.post('/api/persons', (req, res) => {

  const addedName = req.body.name
  const names = data.map(person => person.name)
  console.log(req.body.name)
  if (!req.body) {
    return res.status(400).json({
      error: "content missing"
    })
  } else if (names.includes(addedName)) {
    return res.status(400).json({
      error: "name must be unique"
    })
  }

  const maxId = data.length > 0
    ? Math.max(...data.map(n => n.id))
    : 0

  // const person = req.body
  // console.log(person)
  // person.id = maxId + 1

  const person = new Person({
    name: req.body.name,
    number: req.body.number
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  })
  // data = data.concat(person)
  // res.json(person)
})

//3.17 updating number of person that is already on the list
app.put('/api/persons/:id', (req, res) => {
  Person.findByIdAndUpdate(req.params.id, { number: req.body.number }, function (err, docs) {
    if (err) {
      console.log(err)
    }
    else {
      console.log('updated the number')
    }
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})