import {render, screen} from '@testing-library/react'
import { Book } from '../types'
import BookMainContent from '../components/BookMainContent/BookMainContent'
import { MemoryRouter } from 'react-router-dom'


const mockBook: Book = {
  id: 1,
  name: "Test Book",
  publisher: "",
  description: "",
  ISBN_Identifiers: [],
  averageRating: 4.0,
  ratingsCount: 100,
  imageLinks: {
    thumbnail: "https://example.com/image.jpg"
  },
  pageCount: 200,
  genres: { id: 1, name: "Fiction" },
  authors: []
}


describe('BookMainContent', () => {

    it('should render the book title', () => {

        render(<BookMainContent book={mockBook}/>)

        const title = screen.getByRole('heading', {level: 2})

        expect(title.textContent).toBe('About Test Book')

    })

    it('should renders all authors from the book', () => {

        const testBook = {
            ...mockBook,
            authors: [
            {id: 1, name: "Author One", bio: 'Bio One', books:[], authorPhoto:'https://example.com/authorOneImage.jpg', birthDate:'', deathDate:''},
            {id: 2, name: "Author Two", bio: 'Bio Two', books:[], authorPhoto:'https://example.com/authorTwoImage.jpg', birthDate:'', deathDate:''}
        ]}
        

         render(
            <MemoryRouter>
                <BookMainContent book={testBook} />
            </MemoryRouter>)

         expect(screen.getByText('About Author One')).not.toBeNull()
         expect(screen.getByText('About Author Two')).not.toBeNull()

         expect(screen.getByText('Bio One')).not.toBeNull()
         expect(screen.getByText('Bio Two')).not.toBeNull()
    })

   

    

})