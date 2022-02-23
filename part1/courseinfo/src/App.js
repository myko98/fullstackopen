const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  )
}

const Content = (props) => {
  console.log("content ",props)
  return (
    <>
      <Part part={props.part1} exercise={props.exercises1} />
      <Part part={props.part2} exercise={props.exercises2} />
      <Part part={props.part3} exercise={props.exercises3} />
    </>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  )
}

const Total = (props) => {

  return (
    <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
  )
}


const App = () => {
  const course = 'Half Stack application development'

  const contentProps = {
    part1: 'Fundamentals of React',
    exercises1: 10,
    part2: 'Using props to pass data',
    exercises2: 7,
    part3: 'State of a component',
    exercises3: 14
  }


  return (
    <div>
      <Header course={course} />
      <Content {...contentProps} />
      <Total exercises1={contentProps.exercises1} exercises2={contentProps.exercises2} exercises3={contentProps.exercises3} />
    </div>
  )
}

export default App