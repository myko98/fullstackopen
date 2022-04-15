import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Form from './components/Form'
import List from './components/List'
import personService from './services/persons'
import Notification from './components/Notification'

import { StateContext } from './helpers/Context'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [filterWord, setFilterWord] = useState('')

  const [notif, setNotif] = useState(null)
  const [notifColour, setNotifColour] = useState('green')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
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

    //compare current name with persons array names
    const personsNames = persons.map((person) => person.name.toLowerCase())

    const newPersonName = newPerson.name.toLowerCase()

    //if the new person's name is already in persons array, then we ask if they would like to update the number
    if (personsNames.includes(newPersonName)) {

      const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

      if (result) {
        const newPersons = persons.map(person => {
          if (person.name.toLowerCase() == newPerson.name) {

            //using personService module to perform axios.put request through '.update' method
            personService.update(person.id, { ...person, number: newPerson.number }).then(() => {
              setNotif(`Changed ${person.name}'s number`)
              setTimeout(() => {
                setNotif(null)
              }, 5000)
            })
              .catch(error => {
                console.log('error',error)
                console.log('error.response.data:', error.response.data)
                setNotif(error.response.data.error)

                setNotifColour('red')
                setTimeout(() => {
                  setNotif(null)
                  setNotifColour('green')
                }, 5000)
              })

            //send notification when number is changed for 2 seconds


            return { name: person.name, number: newPerson.number }
          } else {
            return person
          }
        })


        //update persons state so db changes reflect on frontend
        setPersons(newPersons)
      }

    } else {

      personService
        .create(newPerson)
        .then(newPerson => {
          //
          setNotif(`Added ${newPerson.name}`)
          setTimeout(() => {
            setNotif(null)
          }, 5000)
          setPersons(persons.concat(newPerson))
        })
        .catch(error => {
          setNotif(error.response.data.error)
          setNotifColour('red')
          setTimeout(() => {
            setNotif(null)
            setNotifColour('green')
          }, 5000)
        })
    }
    setNewName('')
    setNewNumber('')
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

  return (
    <StateContext.Provider value={{ persons, setPersons, setNotif, setNotifColour }}>

      <Notification message={notif} colour={notifColour}></Notification>
      <h2>Phonebook</h2>

      <Filter showNames={showNames} />

      <h2>Add a new</h2>

      <Form add={add} inputNumber={inputNumber} inputName={inputName} newName={newName} newNumber={newNumber} />
      <h2>Numbers</h2>
      <List namesToShow={namesToShow} />
    </StateContext.Provider>
  )
}

export default App