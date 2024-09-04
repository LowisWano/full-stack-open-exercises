
const CreateDiary = () => {

  const handleCreateDiarySubmit = (event: React.SyntheticEvent) => {
    event.preventDefault()
    console.log('yay')
  }

  return (
    <div>
      <h1>Add new entry</h1>
      <form onSubmit={handleCreateDiarySubmit}>
        <p>date<input /></p>
        <p>visibility<input /></p>
        <p>weather<input /></p>
        <p>comment<input /></p>
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

export default CreateDiary