import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import AuthorBooks from '../components/AuthorBooks/AuthorBooks'
import userEvent from '@testing-library/user-event'



vi.mock('../components/Accordion/Accordion', async () => {
  const React = await import('react')

  const MockAccordion = ({ children }: { children: React.ReactNode }) => {
    const [expanded, setExpanded] = React.useState(false)

    return (
      <div data-testid="mock-accordion">
        <button onClick={() => setExpanded(prev => !prev)}>
          {expanded ? 'See Less' : 'See More'}
        </button>
        {expanded && children}
      </div>
    )
  }

  return { default: MockAccordion }
})


const createMockBook = (id: number): any => ({
    id,
    name: `Book ${id}`,
    imageLinks: {
        thumbnail: `https://example.com/books${id}.jpg`
    }
})


describe('AuthorBooks', () => {
    it('renders book elements directly when book count is 6 or lesss', () => {
        const mockAuthor = {
            id: 7,
            name: 'Jane Austen',
            bio: 'Jane Austen was an early 19th century novelist',
            authorPhoto: "https://example.com/JaneAustenphoto",
            birthDate: '12.16.1775',
            deathDate: '07.18.1817',
            books: Array.from({ length: 3}, (_, i) => createMockBook(i + 1))
        }

        render(<AuthorBooks author={mockAuthor} />)

        expect(screen.getAllByRole('img')).toHaveLength(3)

        expect(screen.queryByTestId('mock-accordion')).toBe(null)
    })

    it('renders book elements inside an accordion when book count is more than 6', async () => {

        const user = userEvent.setup()

        const mockAuthor = {
            id: 7,
            name: 'James Joyce',
            bio: 'James Joyce was an early 20th century novelist',
            authorPhoto: "https://example.com/JaneJoycephoto",
            birthDate: '02.2.1882',
            deathDate: '01.13.1941',
            books: Array.from({ length: 7}, (_, i) => createMockBook(i + 1))
        }

        render(<AuthorBooks author={mockAuthor} />)

        //Button should exist

        const button = screen.getByRole('button', {name: /see more/i})
        expect(button).toBeTruthy()


        expect(screen.queryByTestId('mock-accordion')).not.toBe(null)

        //Toggle accordion
        await user.click(button)

        

        await waitFor(() => {
            const images = screen.getAllByRole('img')
            expect(images.length).toBe(7)
        
        })


    })

})