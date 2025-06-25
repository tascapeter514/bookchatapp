import { render, screen } from '@testing-library/react'
import BookclubHero from '../components/BookclubHero/BookclubHero'
import { Bookclub } from '../types'



const mockBookclub: Bookclub = {
  id: 1,
  name: 'Literary Legends',
  members: [],
  administrator: 101,
  bookshelves: [
    {
      id: 201,
      name: 'Spring Reads',
      books: []
    },
    {
      id: 202,
      name: 'Summer Picks',
      books: []
    }
  ],
  currentRead: {
    id: 301,
    name: 'To Kill a Mockingbird',
    description: 'A novel about moral growth and justice in the Deep South.',
    ISBN_Identifiers: [{ type: 'ISBN_13', identifier: '9780061120084' }],
    publisher: 'J.B. Lippincott & Co.',
    pageCount: 324,
    averageRating: 4.5,
    ratingsCount: 2400,
    genres: { id: 1, name: 'Classic' },
    imageLinks: {
      thumbnail: 'https://example.com/books/tokillamockingbird.jpg'
    },
    authors: [
      {
        id: 401,
        name: 'Harper Lee',
        bio: 'Harper Lee was an American novelist best known for To Kill a Mockingbird.',
        authorPhoto: 'https://example.com/authors/harperlee.jpg',
        books: [],
        birthDate: '1926-04-28',
        deathDate: '2016-02-19'
      }
    ]
  },
  cover_image: 'https://example.com/bookclubs/literary-legends.jpg'
}



describe('BookclubHeader', () => {

    it('should render the correct header', () => {
        render(<BookclubHero bookclub={mockBookclub}/>)

        const title = screen.getByRole('heading', {level: 1})

        expect(title.textContent).toBe('Literary Legends')
    })
    
})