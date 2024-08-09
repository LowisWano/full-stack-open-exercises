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

export default { getAllAnecdotes, createNewAnecdote }