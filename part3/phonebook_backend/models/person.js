require('dotenv').config()
const mongoose = require('mongoose')


const url =
  `mongodb+srv://myko:${process.env.MONGODB_ATLAS_PW}@fso.ryl6m.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: function(v) {
        return /^(\d{2}|\d{3})-\d{8}$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number`
    },
    required: [true, 'Phone number required']
  }
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