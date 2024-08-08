import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote  } from '../reducers/anecdoteReducer'
import { notifyVote, clearNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    }
    return state.anecdotes.filter((anecdote)=>anecdote.content.toLowerCase().includes(state.filter))
  })
  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(notifyVote(`you voted '${content}'`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
    dispatch(voteAnecdote(id))
  }

  return (
    <div>
      {anecdotes
        .toSorted((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default AnecdoteList