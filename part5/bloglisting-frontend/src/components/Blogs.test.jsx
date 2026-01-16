import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Togglable />', () => {
  test('renders content', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      url: 'https://example.com',
      author: 'Test Author',
      likes: 4
    }

    render(<Blog blog={blog} />)

    const element = screen.getByText(`${blog.title} ${blog.author}`)
    expect(element).toBeDefined()
  })

  test('does not render url or likes', () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      url: 'https://example.com',
      author: 'Test Author',
      likes: 4
    }

    render(<Blog blog={blog} />)

    const author = screen.queryByText(blog.author)
    const url = screen.queryByText(blog.url)

    expect(author).toBeNull()
    expect(url).toBeNull()
  })
})