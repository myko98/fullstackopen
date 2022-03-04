import React from 'react'


const ListItem = ({ person }) =>
  <>
    <p key={person.name}>{person.name} {person.number}</p>
  </>


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