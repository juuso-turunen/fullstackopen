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
  const sum = Object.values(statistics).reduce((accumulator, currentValue) => accumulator + currentValue)
  if ( sum === 0 ) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div className="statistics">
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine text="good" value={statistics.good} />
          <StatisticLine text="neutral" value={statistics.neutral} />
          <StatisticLine text="bad" value={statistics.bad} />
          <StatisticLine text="all" value={sum} />
          <StatisticLine text="average" value={(statistics.good - statistics.bad) / sum} />
          <StatisticLine text="positive" value={statistics.good / sum * 100} unit="%" />
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({text, value, unit=""}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}{unit && ' ' + unit}</td> 
    </tr>
  )
}

export default App