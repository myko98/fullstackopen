import React from 'react'

const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>total of {sum} exercises</p>

const Part = ({ part }) =>
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {

  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </>
  )
}


const Course = ({ course }) => {
  const { id, name, parts } = course

  const exercises = parts.map((part) => part.exercises)
  const total_exercises = exercises.reduce((p, c) => p + c)

  console.log(exercises)
  return (
    <>
      <Header course={name} />
      <Content parts={parts} />
      <Total sum={total_exercises} />
    </>
  )
}

export default Course