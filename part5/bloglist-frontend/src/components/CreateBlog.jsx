const CreateBlog = ({ handleCreateBlog, title, setTitle, author, setAuthor, url, setUrl }) => {
  return (
    <form onSubmit={handleCreateBlog}>
        <h1>Create New</h1>
        <p>
          title: 
          <input type='text' value={title} onChange={({ target }) => setTitle(target.value)}/>
        </p>
        <p>
          author:
          <input type='text' value={author} onChange ={({ target }) => setAuthor(target.value)}/>
        </p>
        <p>
          url:
          <input type='text' value={url} onChange ={({ target }) => setUrl(target.value)}/>
        </p>
        <button type='text'>create</button>
      </form>
  )
}

export default CreateBlog