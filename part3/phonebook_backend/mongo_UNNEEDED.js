require('dotenv').config();

const mongoose = require('mongoose')
const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

//process.argv prints the file path of everything we type in terminal
// console.log(process.argv)

const url =
  `mongodb+srv://myko:${process.env.MONGODB_ATLAS_PW}@fso.ryl6m.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
  name: name,
  number: number,
})

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
} else if (password != process.env.MONGODB_ATLAS_PW) {
  console.log('Please enter correct password')
  process.exit(1)
} else if (password == process.env.MONGODB_ATLAS_PW && process.argv.length < 4) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
})} else {
  person.save().then(result => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    mongoose.connection.close()
  })
}
