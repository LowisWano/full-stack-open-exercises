import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state ,action){
      return action.payload
    },
    appendAnecdote(state, action){
      state.push(action.payload)
    }
  }
})

export const { setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAllAnecdotes()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNewAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async (dispatch, getState) => {
    const state = getState().anecdotes
    const anecdoteToChange = state.find(n => n.id === id)
    const response = await anecdoteService.voteAnecdoteEntry({
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1
    })
    dispatch(setAnecdotes(state.map(anecdote =>
      anecdote.id !== id ? anecdote : response)
    ))
  }
}

export default anecdoteSlice.reducer