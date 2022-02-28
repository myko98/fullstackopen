import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0])


  //get a random integer between 0 and array.length-1 
  const getRandomInt = (max) => {
    let index = Math.floor(Math.random() * max)
    setSelected(index)
  }

  // increase the vote of an anecdote by 1 and updating our points state
  const vote = (selected) => {
    console.log(selected);
    const newPoints = [...points]
    newPoints[selected] += 1
    setPoints(newPoints);
    console.log(points)
  }

  //find the max number of votes in points and find the index position of that value
  const mostVotes = () => {

    const max = Math.max(...points);
    const maxAnecdote = points.indexOf(max)

    return (
      <>
      <p>{anecdotes[maxAnecdote]}</p>
      <p>has {max} votes</p>
      </>
    )
  }


  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
        {anecdotes[selected]}
        <br></br>
        <p>has {points[selected]} votes</p>
        <br />
        <button onClick={() => vote(selected)}>vote</button>
        <button onClick={() => getRandomInt(anecdotes.length-1)}>next anecdote</button>
      </div>

      <div>
        <h1>Anecdote with most votes</h1>
        {mostVotes()}
      </div>
    </>


  )
}

export default App