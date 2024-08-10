import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query'
import { getAnecdotes, voteAnecdote } from '../requests'

const AnecdoteList = () => {
  const queryClient = useQueryClient()
  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    } 
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  if(result.isLoading) {
    return <div>loading data...</div>
  }

  if(result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1
    })
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList