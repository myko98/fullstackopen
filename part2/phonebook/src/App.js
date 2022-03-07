import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Form from './components/Form'
import List from './components/List'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filterWord, setFilterWord] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
        console.log('data set')
      })
  }, [])

  const inputName = (event) => {
    setNewName(event.target.value)
  }

  const inputNumber = (event) => {
    setNewNumber(event.target.value)
  }


  //Adding name and number
  const add = (event) => {
    event.preventDefault();
    const newPerson = { name: newName, number: newNumber }

    //compare current name with persons array
    const personsJSON = persons.map((person) => JSON.stringify(person.name))

    const newPersonJSON = JSON.stringify(newPerson.name)

    if (personsJSON.includes(newPersonJSON)) {
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
    } else {
      setPersons(persons.concat(newPerson))
    }
  }

  //function call whenever the filter input changes. if filter input has some text, we set showAll state as false and we update the filterWord state to be the input value
  const showNames = (event) => {
    if (event.target.value.length > 0) {
      setShowAll(false)
    } else {
      setShowAll(true);
    }
    setFilterWord(event.target.value)

  }

  //returns filtered array based on current searched letters
  const filterName = (word) => {
    const filteredArray = persons.filter(person => person.name.substring(0, word.length).toLowerCase() == word.toLowerCase())

    return filteredArray
  }

  //using conditional operator to change the array depending on whether filter input is being used or not. if true (default), we show entire list, if false, we show filtered list based on filter input
  const namesToShow = showAll
    ? persons
    : filterName(filterWord)

  console.log(namesToShow)

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter showNames={showNames} />

      <h2>Add a new</h2>

      <Form add={add} inputNumber={inputNumber} inputName={inputName} newName={newName} newNumber={newNumber} />


      <h2>Numbers</h2>
      <List namesToShow={namesToShow}/>
    </div>
  )
}

export default App