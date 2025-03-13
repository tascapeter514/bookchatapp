import { useState, useEffect, createContext, useContext, ReactNode, Dispatch, SetStateAction } from 'react'
import {useParams } from 'react-router-dom'
import { Bookclub, Bookshelf, Book } from '../../../../types'



type BookclubProviderProps = {children: ReactNode}

interface ContextProps {
    bookclub: Bookclub,
    bookshelves: Bookshelf[],
    books: Book[],
    parameters: Readonly<Partial<{ id: string; }>>,
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
    parameters: {id: ''},
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
    const parameters = useParams<{id: string}>()


    useEffect(() => {

        try {
            const socket = new WebSocket(`ws://localhost:8000/ws/bookclub/${parameters.id}`)

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data)
                console.log('web socket data:', data)

                if (data.type == 'get_bookclub_data') {

                    const  bookshelvesData  = data.bookshelves_data
                    const bookclubData = data.bookclub_data
                    setBookclub(bookclubData)
                    setBookshelves(bookshelvesData)
                    
                }
            }

            socket.onerror = (error) => {
                console.error('Websocket bookclub data error', error)
            }

            socket.onopen = () => console.log('Book data websocket connected')
            socket.onclose = () => console.log('Book data websocket disconnected')

            return () => socket.close()

        } catch(err) {
            console.error('Bookclub data websocket failed to initialize:', err)
        }

    }, [])

    return (
        <BookclubContext.Provider
            value={{bookclub, bookshelves, books, parameters, setBookclub, setBookshelves, setBooks}}
        >
            {children}
        </BookclubContext.Provider>
    )


}

export default BookclubDataProvider

export const bookclubData = () => useContext(BookclubContext)