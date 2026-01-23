import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addNew = (e) => {
    e.preventDefault()
    dispatch(create(e.target.content.value))

    e.target.content.value = ''
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={(e) => addNew(e)}>
        <div>
          <input name="content" />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
