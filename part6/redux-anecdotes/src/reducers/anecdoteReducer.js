import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action){
      return state.concat(action.payload)
    },
    voteAnecdote(state, action){
      const id = action.payload
      const anecdoteToChange = state.find(n => n.id === id)
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : {
          ...anecdoteToChange,
          votes: anecdoteToChange.votes + 1
        }
      )
    },
    setAnecdotes(state ,action){
      return action.payload
    }
  }
})

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer