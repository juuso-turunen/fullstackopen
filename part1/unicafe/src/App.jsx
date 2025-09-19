import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const onGood = () => {
    setGood(good + 1)
  }

  const onNeutral = () => {
    setNeutral(neutral + 1)
  }

  const onBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={onGood} text="good" />
      <Button onClick={onNeutral} text="neutral" />
      <Button onClick={onBad} text="bad" />

      <Statistics statistics={{} = {good, neutral, bad}}/>
    </div>

  )
}

const Button = ({text, onClick}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Statistics = ({statistics}) => {
  return (
    <div className="statistics">
      <h2>statistics</h2>
      <p>good {statistics.good}</p>
      <p>neutral {statistics.neutral}</p>
      <p>bad {statistics.bad}</p>
    </div>
  )
}

export default App