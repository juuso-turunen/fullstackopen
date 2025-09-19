import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [votes, setVote] = useState(new Uint8Array(anecdotes.length))
   
  const [selected, setSelected] = useState(0)

  const onNextAnectode = () => {
    function getRandomInt(min, max) {
      const minCeiled = Math.ceil(min);
      const maxFloored = Math.floor(max);
      return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
    }

    setSelected(getRandomInt(0, anecdotes.length))
  }

  const onVote = () => {
    const v = [...votes]
    v[selected] += 1
    setVote(v)
  }

  const indexOfMostVotes = votes.reduce((indexOfGreatest, currentValue, index) => {
    if (currentValue > votes[indexOfGreatest])
      return index
    return indexOfGreatest
  }, 0)

  return (
    <div>
      <h2>Anectode of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>

      <button onClick={onNextAnectode}>next anectode</button>
      <button onClick={onVote}>vote</button>

      <h2>Anectode with most votes</h2>
      <p>{anecdotes[indexOfMostVotes]}</p>
      <p>has {votes[indexOfMostVotes]} votes</p>
    </div>
  )
}

export default App