import axios from 'axios'
import React, { useContext } from 'react'
import { StateContext } from '../helpers/Context'


const deleteItem = (person, setPersons, persons) => {
  if (window.confirm('delete for sure?')) {
    axios.delete(`http://localhost:3001/persons/${person.id}`)

    const newPersons = persons.filter(item => item.id != person.id)

    setPersons(newPersons)
  }
}


const ListItem = ({ person }) => {
  const { persons, setPersons } = useContext(StateContext)
  return (
    <>
      <p key={person.name}>{person.name} {person.number}<button onClick={() => deleteItem(person, setPersons, persons)}>delete</button></p>
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