import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('Blog renders its title and author', () => {
  const test_blog = {
    title: 'This is the title',
    author: 'Butcher D. Author',
    url: 'https://www.youtube.com/watch?v=PmHlYDAxSOM',
    likes: 0,
    user:{
      id: '66ab2f9b09711f276ddb6d23',
      name: 'hachikuji mayoi',
      username: 'mayoi'
    }
  }

  const test_user = {
    name: 'luis',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imx1aXMiLCJpZCI6IjY2YWI2NGFkNTY2MDNlZTUzYjg3MzkzMCIsImlhdCI6MTcyMjY4NjQxNX0.T1hGvQaRcvlOWZMKWbb4yGmHyYssEtZ7yEW_Mz33qxI',
    username: 'luis'
  }

  render(<Blog blog={test_blog} user={test_user}/>)
  const element = screen.getByText('This is the title Butcher D. Author')
  expect(element).toBeDefined()
})