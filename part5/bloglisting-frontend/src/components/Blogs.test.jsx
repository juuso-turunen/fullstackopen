import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { test } from 'vitest'

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

  test('renders url, likes and author after full details button is pressed', async () => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      url: 'https://example.com',
      author: 'Test Author',
      likes: 4,
      user: {
        name: 'Test User',
        username: 'testuser'
      }
    }

    render(<Blog blog={blog} user={{ username: 'testuser' }} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const url = screen.getByText(blog.url)
    const userName = screen.getByText(blog.user.name)
    const likes = screen.getByText(`likes ${blog.likes}`)

    expect(url).toBeDefined()
    expect(userName).toBeDefined()
    expect(likes).toBeDefined()
  })
})