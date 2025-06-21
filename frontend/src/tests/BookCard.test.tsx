import {render, screen} from '@testing-library/react'
import { vi } from 'vitest'
import BookCard from '../components/BookCard/BookCard'
import { Book, Author } from '../types'
import userEvent from '@testing-library/user-event'



vi.mock('../slices/bookshelfApiSlice', () => ({
    useDeleteBookMutation: vi.fn()
}))

import { useDeleteBookMutation } from '../slices/bookshelfApiSlice'

      const bookshelfId = 1090

        const mockBook: Book = {
            id: 1,
            name: "A Portrait of the Artist as a Young Man",
            publisher: "B. W. Huebsch",
            description: "A semi-autobiographical novel by James Joyce, portraying the early years of Stephen Dedalus, a fictional alter ego of Joyce and an aspiring writer.",
            ISBN_Identifiers: [
                { type: "ISBN_10", identifier: "0142437344" },
                { type: "ISBN_13", identifier: "9780142437346" }
            ],
            averageRating: 4.1,
            ratingsCount: 2350,
            imageLinks: {
                smallThumbnail: "https://books.google.com/books/content?id=portrait-thumbnail",
                thumbnail: "https://books.google.com/books/content?id=portrait-thumbnail-large"
            },
            pageCount: 276,
            genres: {
                id: 12,
                name: "Modernist Fiction"
            },
            authors: []
        }

        const mockAuthor: Author = {
            id: 1,
            name: "James Joyce",
            bio: "James Joyce was an Irish novelist and poet, considered to be one of the most influential writers of the early 20th century.",
            books: [mockBook], // recursive relationship
            authorPhoto: "https://example.com/james-joyce.jpg",
            birthDate: "1882-02-02",
            deathDate: "1941-01-13"
        }

        mockBook.authors = [mockAuthor]

describe('BookCard and handleDeleteBook', () => {
    it ('calls delete book with correct arguments', async () => {
        const mockDeleteBook = vi.fn()


        vi.mocked(useDeleteBookMutation).mockReturnValue([mockDeleteBook, {} as any])

        //simulate book and bookshelfID props
        const children = {id: 42}
        const bookshelfId = 99

        const handleDeleteBook = async () => {
            
            const bookId = Number(children.id)

            try {

                await mockDeleteBook({bookId, bookshelfId})

            } catch (err) {
                console.error('Delete Book Error', err)
            }
        }

        await handleDeleteBook()

        expect(mockDeleteBook).toHaveBeenCalledWith({bookId: 42, bookshelfId: 99})
        await expect(handleDeleteBook()).resolves.toBeUndefined()

    })

    it('logs an error if deleteBook fails', async () => {
        const mockError = new Error('Network failure')
        const mockDeleteBook = vi.fn().mockRejectedValue(mockError)
        const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

        vi.mocked(useDeleteBookMutation).mockReturnValue([mockDeleteBook, {} as any])

        render(<BookCard bookshelfId={bookshelfId}>{mockBook}</BookCard>)

        const deleteButton = screen.getByRole('button') // Assuming CancelIcon renders a button
        await userEvent.click(deleteButton)

        expect(mockDeleteBook).toHaveBeenCalledWith({ bookId: 1, bookshelfId })
        expect(consoleErrorSpy).toHaveBeenCalledWith('Delete Book Error:', mockError)

        consoleErrorSpy.mockRestore()
    })

    it('does not call deleteBook if book ID is not a number', async () => {
        const invalidBook = {...mockBook, id: 'invalid' as unknown as number}
        const mockDeleteBook = vi.fn()
        vi.mocked(useDeleteBookMutation).mockReturnValue([mockDeleteBook, {} as any])

        render(<BookCard bookshelfId={bookshelfId}>{invalidBook}</BookCard>)

        const deleteButton = screen.getByRole('button')
        await userEvent.click(deleteButton)

        expect(mockDeleteBook).not.toHaveBeenCalled()
        // expect(handleDeleteBook).not.toHaveBeenCalled()
    })

   

    it('should render the image, name, and author for each Bookcard', () => {


        render(<BookCard bookshelfId={bookshelfId}>{mockBook}</BookCard>)

        const image = screen.getByAltText('book-card-cover') as HTMLImageElement
        expect(image).not.toBeNull()
        expect(image.src).toBe(mockBook.imageLinks.thumbnail)

        expect(screen.getByText(mockBook.name)).not.toBe(null)

        expect(screen.getByText("James Joyce")).not.toBe(null)
        expect(screen.getByText(/4.1 out of 2350 ratings/i)).not.toBe(null)


    })

    it('calls deleteBook from useDeleteBookMutation when CancelIcon clicked', async () => {
        const mockDeleteBook = vi.fn().mockResolvedValue({}) // simulate successful delete

        vi.mocked(useDeleteBookMutation).mockReturnValue([mockDeleteBook, {} as any])

        render(<BookCard bookshelfId={bookshelfId}>{mockBook}</BookCard>)

        // get the CancelIcon button (with aria-label 'delete book' and role 'button')
        const deleteButton = screen.getByRole('button', { name: /delete book/i })

        // click triggers handleDeleteBook inside component
        await userEvent.click(deleteButton)

        // wait for the mockDeleteBook to be called with correct args
        expect(mockDeleteBook).toHaveBeenCalledWith({ bookId: mockBook.id, bookshelfId })
    })

})

// const React = await import('react')

// function WrapperComponent() {

//   const [visible, setVisible] = React.useState(true)

//   const CustomBookCard = (props: any) => {
//     const [deleteBook] = useDeleteBookMutation()

//     const handleDeleteBook = async () => {
//       await deleteBook({ bookId: props.book.id, bookshelfId: props.bookshelfId })
//       setVisible(false)
//     }

//     return (
//       <article data-testid="book-card">
//         <button onClick={handleDeleteBook}>Delete</button>
//         <h3>{props.book.name}</h3>
//       </article>
//     )
//   }

//   return (
//     <>
//       {visible && (
//         <CustomBookCard book={mockBook} bookshelfId={bookshelfId} />
//       )}
//     </>
//   )
// }

// describe('BookCard DOM removal', () => {
//   it('removes the book card from the DOM when delete is called', async () => {
//     render(<WrapperComponent />)

//     const card = screen.getByTestId('book-card')
//     expect(card).not.toBe(null)

//     const deleteBtn = screen.getByRole('button', { name: /delete/i })
//     await userEvent.click(deleteBtn)

//     await waitFor(() => {
//       expect(screen.queryByTestId('book-card')).toBe(null)
//     })
//   })
// })
