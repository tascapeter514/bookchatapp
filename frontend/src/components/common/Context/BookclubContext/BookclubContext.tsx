import { useState, createContext, useContext, ReactNode, Dispatch, SetStateAction } from 'react'
import { Bookclub, Bookshelf, Book } from '../../../../types'



type BookclubProviderProps = {children: ReactNode}

interface ContextProps {
    bookclub: Bookclub,
    bookshelves: Bookshelf[],
    books: Book[],
    setBookclub: Dispatch<SetStateAction<Bookclub>>,
    setBookshelves: Dispatch<SetStateAction<Bookshelf[]>>,
    setBooks: Dispatch<SetStateAction<Book[]>>
}


export const BookclubContext = createContext<ContextProps>({
    bookclub: {
        bookclub_id: '',
        name: '',
        administrator: NaN,
        members: [],
        currentRead: {
            title_id: '',
            title: '',
            publisher: '',
            description: '',
            ISBN_Identifiers: [],
            averageRating: NaN,
            ratingsCount: NaN,
            imageLinks: {},
            pageCount: NaN,
            genres: {
                genre_id: NaN, genre_name: ''
            },
            authors: []
        },
        cover_image: ''

    },
    bookshelves: [],
    books: [],
    setBookclub: () => {},
    setBookshelves: () => [],
    setBooks: () => []

})

export const BookclubDispatchContext = createContext(null)



const BookclubDataProvider = ({ children } : BookclubProviderProps) => {

    const [bookclub, setBookclub] = useState<Bookclub>({
        bookclub_id: '',
        name: '',
        administrator: NaN,
        members: [],
        currentRead: {
            title_id: '',
            title: '',
            publisher: '',
            description: '',
            ISBN_Identifiers: [],
            averageRating: NaN,
            ratingsCount: NaN,
            imageLinks: {},
            pageCount: NaN,
            genres: {
                genre_id: NaN, genre_name: ''
            },
            authors: []
        },
        cover_image: ''
    })

    const [bookshelves, setBookshelves] = useState<Bookshelf[]>([])
    const [books, setBooks] = useState<Book[]>([])

    return (
        <BookclubContext.Provider
            value={{bookclub, bookshelves, books, setBookclub, setBookshelves, setBooks}}
        
        >
            {children}
        
        </BookclubContext.Provider>
    )


}

export default BookclubDataProvider

export const BookclubData = () => useContext(BookclubContext)