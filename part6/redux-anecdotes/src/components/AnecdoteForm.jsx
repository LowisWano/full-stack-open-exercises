import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleAnecdoteFormSubmit = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotification(`new anecdote '${content}'`, 10))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleAnecdoteFormSubmit}>
        <div><input name='content' /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm