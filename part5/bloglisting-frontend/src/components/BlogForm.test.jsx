import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { test } from 'vitest'

vi.mock('../services/blogs', () => ({
  default: {
    put: vi.fn().mockResolvedValue({})
  }
}))

describe('<BlogForm />', () => {
  test('BlogForm is calling callback function with the correct user input after submit', async () => {
    const user = userEvent.setup()
    const createBlog = vi.fn()

    render(<BlogForm handleSubmit={createBlog} />)

    const inputTitle = screen.getByLabelText('title:')
    const inputAuthor = screen.getByLabelText('author:')
    const inputUrl = screen.getByLabelText('url:')

    await user.type(inputTitle, 'Blog Title')
    await user.type(inputAuthor, 'Blog Author')
    await user.type(inputUrl, 'Blog URL')

    const submit = screen.getByText('create')
    await user.click(submit)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('Blog Title')
    expect(createBlog.mock.calls[0][0].author).toBe('Blog Author')
    expect(createBlog.mock.calls[0][0].url).toBe('Blog URL')
  })
})

