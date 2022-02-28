import { useState } from 'react'

const Button = ({ func, text }) => {
  return (
    <button onClick={func}>{text}</button>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad, total, average, percent } = props.stats

  if (isNaN(average)) {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    )
  } else {
    return (
      <>
        <h1>statistics</h1>
        <table>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="percent" value={percent + "%"} />
        </table>

      </>
    )
  }
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // dont have to useState on everything that changes
  const total = good + neutral + bad
  const average = (good - bad) / total
  const percent = good / total * 100

  const stats = { good, neutral, bad, percent, total, average }

  const updateCounter = (state_func) => {
    if (state_func == setGood) {
      setGood(good + 1)
    } else if (state_func == setNeutral) {
      setNeutral(neutral + 1)
    } else {
      setBad(bad + 1)
    }
  }

  const updateCounter2 = (state_func) => () => {
    if (state_func == setGood) {
      setGood(good + 1)
    } else if (state_func == setNeutral) {
      setNeutral(neutral + 1)
    } else {
      setBad(bad + 1)
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      {/* function passing function */}
      {/*
      <button onClick={() => updateCounter(setGood)}>good</button>
      <button onClick={() => updateCounter(setNeutral)}>neutral</button>
      <button onClick={() => updateCounter(setBad)}>bad</button> */}

      {/* function returning function */}
      <Button func={updateCounter2(setGood)} text="good" />
      <Button func={() => updateCounter(setNeutral)} text="neutral" />
      <Button func={updateCounter2(setBad)} text="bad" />

      <Statistics stats={stats} />
    </div>
  )
}

export default App