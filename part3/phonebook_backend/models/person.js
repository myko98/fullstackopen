require('dotenv').config();
const mongoose = require('mongoose')


const url =
  `mongodb+srv://myko:${process.env.MONGODB_ATLAS_PW}@fso.ryl6m.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

//gets rid of the 'id' and 'v' key value properties of schema
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})
  
// const Person = mongoose.model('Person', personSchema)

module.exports = mongoose.model('Person', personSchema)