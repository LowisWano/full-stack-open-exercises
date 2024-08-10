import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAllAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNewAnecdote = async (content) => {
  const newEntry = {
    content,
    votes: 0
  }
  const response = await axios.post(baseUrl, newEntry)
  return response.data
}

const voteAnecdoteEntry = async (votedAnecdote) => {
  const response = await axios.put(`${baseUrl}/${votedAnecdote.id}`, votedAnecdote)
  return response.data
}

export default { getAllAnecdotes, createNewAnecdote, voteAnecdoteEntry }