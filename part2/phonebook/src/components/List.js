import axios from 'axios'
import React, { useContext } from 'react'
import { StateContext } from '../helpers/Context'


const deleteItem = (person, setPersons, persons, setNotif, setNotifColour) => {

  if (window.confirm('delete for sure?')) {
    axios.delete(`/api/persons/${person.id}`).then((response) => console.log('deleted')).catch((error) => {
      if (error.response) {
        console.log(error.response.data); // => the response payload 
      }
    });

    setNotif(`Deleted ${person.name}`)
    setNotifColour('red')
    setTimeout(() => {
      setNotif(null)
      setNotifColour('green')
    }, 3000)

    const newPersons = persons.filter(item => item.id != person.id)

    // passed down setNotif state method so we can update notification text when a person is deleted
    setPersons(newPersons)


  }

}


const ListItem = ({ person }) => {
  const { persons, setPersons, setNotif, setNotifColour } = useContext(StateContext)
  return (
    <>
      <p key={person.name}>{person.name} {person.number}<button onClick={() => deleteItem(person, setPersons, persons, setNotif, setNotifColour)}>delete</button></p>
    </>
  )

}


const List = ({ namesToShow }) => {
  return (
    <>
      {namesToShow.map((person, index) => (
        <ListItem person={person} />
      ))}
    </>
  )
}

export default List