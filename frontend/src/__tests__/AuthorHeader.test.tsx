import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import AuthorHeader from '../components/AuthorHeader/AuthorHeader'

// Mock Accordion to simulate expanding behavior
vi.mock('../components/Accordion/Accordion', async () => {
  const React = await import('react')
  const { useState } = React

  const MockAccordion = ({ children }: { children: React.ReactNode }) => {
    const [expanded, setExpanded] = useState(false)

    return (
      <div data-testid="mock-accordion">
        <button onClick={() => setExpanded(prev => !prev)}>
          {expanded ? 'See Less' : 'See More'}
        </button>
        {expanded && <div data-testid="accordion-content">{children}</div>}
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



describe('AuthorHeader', () => {
  it('renders all static elements', () => {

    const mockAuthor = {
        id: 1,
        name: 'Franz Kafka',
        bio: 'Kafka was a German-speaking Bohemian writer.',
        authorPhoto: 'https://example.com/kafka.jpg',
        birthDate: '07.03.1883',
        deathDate: '06.03.1924',
        books: Array.from({ length: 3}, (_, i) => createMockBook(i + 1))
    }



    render(<AuthorHeader author={mockAuthor} />)

    const heading = screen.getByRole('heading', { name: /franz kafka/i })
    expect(heading).not.toBe(null)

    const birthText = screen.getByText(/born on/i)
    expect(birthText.textContent).toEqual('Born on 07.03.1883')

    const deathText = screen.getByText(/died on/i)
    expect(deathText.textContent).toEqual('Died on 06.03.1924')

    const image = screen.getByRole('img')
    expect(image).not.toBe(null)
    expect(image.getAttribute('src')).toEqual(mockAuthor.authorPhoto)

    const accordion = screen.queryByTestId('mock-accordion')
    expect(accordion).not.toBe(null)
  })

  it('reveals the author bio when accordion is toggled', async () => {

    const mockAuthor = {
        id: 1,
        name: 'Franz Kafka',
        bio: 'Kafka was a German-speaking Bohemian writer.',
        authorPhoto: 'https://example.com/kafka.jpg',
        birthDate: '07.03.1883',
        deathDate: '06.03.1924',
        books: Array.from({ length: 7}, (_, i) => createMockBook(i + 1))
    }



    const user = userEvent.setup()
    render(<AuthorHeader author={mockAuthor} />)

    const toggleButton = screen.getByRole('button', { name: /see more/i })
    expect(toggleButton).not.toBe(null)

    // Content should not be visible before click
    expect(screen.queryByTestId('accordion-content')).toBe(null)

    // Click to expand
    await user.click(toggleButton)

    const bioContent = await screen.findByTestId('accordion-content')
    expect(bioContent.textContent).toEqual(mockAuthor.bio)
  })
})
