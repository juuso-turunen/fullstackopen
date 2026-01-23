import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const voteById = (id) => {
    dispatch(vote(id))
    console.log('vote', id)
  }

  return anecdotes
    .sort((a, b) => b.votes - a.votes)
    .map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => voteById(anecdote.id)}>vote</button>
        </div>
      </div>
    ))
}

export default AnecdoteList
