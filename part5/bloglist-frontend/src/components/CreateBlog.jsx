import { useState } from 'react'

const CreateBlog = ({ createNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const clearNewBlogInputFields = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const handleCreateBlogSubmit = async (event) => {
    event.preventDefault()
    const response = createNewBlog({
      title: title,
      author: author,
      url: url,
    })
    clearNewBlogInputFields()
  }

  return (
    <form onSubmit={handleCreateBlogSubmit}>
        <h2>Create new blog</h2>
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