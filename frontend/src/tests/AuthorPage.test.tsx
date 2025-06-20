import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import AuthorPage from '../components/AuthorPage/AuthorPage'

// Mocks
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom')
  return {
    ...actual,
    useParams: () => ({ id: '42' })
  }
})

vi.mock('react-redux', async () => {
  return {
    useDispatch: () => vi.fn(),
    useSelector: (selector: any) =>
      selector({
        author: {
          author: {
            id: 42,
            name: 'Franz Kafka',
            bio: 'Kafka was a German-speaking Bohemian writer.',
            authorPhoto: 'https://example.com/kafka.jpg',
            birthDate: '07.03.1883',
            deathDate: '06.03.1924',
            books: []
          }
        }
      })
  }
})

const mockGetAuthor = vi.fn().mockResolvedValue({
  data: {
    id: 42,
    name: 'Franz Kafka',
    bio: 'Kafka was a German-speaking Bohemian writer.',
    author_photo: 'https://example.com/kafka.jpg',
    birth_date: '07.03.1883',
    death_date: '06.03.1924',
    books: []
  }
})

// Mock RTK Query
vi.mock('../slices/authorApiSlice', () => ({
  useGetAuthorMutation: () => [mockGetAuthor, { isLoading: false }]
}))

// Optionally mock child components
vi.mock('../components/AuthorHeader/AuthorHeader', () => ({
  default: ({ author }: any) => <div data-testid="author-header">{author.name}</div>
}))

vi.mock('../components/AuthorBooks/AuthorBooks', () => ({
  default: ({ author }: any) => <div data-testid="author-books">{author.books.length} books</div>
}))

vi.mock('../components/LoadSpinner/LoadSpinner', () => ({
  default: () => <div data-testid="load-spinner">Loading...</div>
}))

describe('AuthorPage', () => {
  it('calls getAuthor and renders author data', async () => {
    render(<AuthorPage />)

    // Wait for data to be "fetched"
    await waitFor(() => {
      expect(screen.getByTestId('author-header').textContent).toBe('Franz Kafka')
    })

    expect(mockGetAuthor).toHaveBeenCalledWith(42)
    expect(screen.getByTestId('author-books').textContent).toBe('0 books')
  })

  it('handles API failure in catch block gracefully', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    mockGetAuthor.mockRejectedValueOnce(new Error('Network error'))

    render(<AuthorPage />)

    await waitFor(() => {
      expect(mockGetAuthor).toHaveBeenCalled()
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching author data')
    })

    consoleErrorSpy.mockRestore()
  })

  it('shows LoadSpinner when isLoading is true', async () => {
    //Override the mock to simulate the loading state

    vi.resetModules()


    vi.doMock('../slices/authorApiSlice', () => ({
        useGetAuthorMutation: () => [vi.fn(), { isLoading: true }]
    }))

    // vi.mock('../components/LoadSpinner/LoadSpinner', () => ({
    //     default: () => <div data-testid="load-spinner">Loading...</div>
    // }))

     // Re-import the component *after* the override
    const { default: AuthorPage } = await import('../components/AuthorPage/AuthorPage')

    render(<AuthorPage />)

   
    const spinner = screen.getByTestId('load-spinner')
    expect(spinner.textContent).toBe('Loading...')


  })



})
