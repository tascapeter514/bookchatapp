import { useState, useEffect, createContext, useContext, ReactNode, Dispatch, SetStateAction } from 'react'
import {useParams } from 'react-router-dom'
import axios from 'axios'
import { Bookclub, Bookshelf, Book } from '../../../../types'



type BookclubProviderProps = {children: ReactNode}

interface ContextProps {
    bookclub: Bookclub,
    bookshelves: Bookshelf[],
    parameters: Readonly<Partial<{ id: string; }>>,
    newBookId: string,
    setBookclub: Dispatch<SetStateAction<Bookclub>>,
    setBookshelves: Dispatch<SetStateAction<Bookshelf[]>>,
    setNewBookId: Dispatch<SetStateAction<string>>,
    addBook: (bookshelf: Bookshelf) => Promise<void>
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
    parameters: {id: ''},
    newBookId: '',
    setBookclub: () => {},
    setBookshelves: () => [],
    setNewBookId: () => '',
    addBook: async(bookshelf) => {}

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
    const parameters = useParams<{id: string}>()
    const [newBookId, setNewBookId] = useState<string>('')
    


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

    const addBook = async (bookshelf: Bookshelf) => {

        const bookshelfRequest = {
            book_id: newBookId
        } 

        try {
            const response = await axios.put(`http://localhost:8000/api/bookclub/addBook/${bookshelf.bookshelf_id}`, bookshelfRequest)


            if (response.status == 200) {
                console.log("axios add book response:", response.data)

                setBookshelves(prevBookshelves => 
                    prevBookshelves.map(bs =>
                        bs.bookshelf_id === bookshelf.bookshelf_id ? response.data : bs
                    )
                )
                // closeSearchBooks()

            } else {
                console.log("There was an error with the response:", response.statusText)
            }
            
        } catch(err) {
            console.log('There was an error adding your book:', err)
        }
    }

    return (
        <BookclubContext.Provider
            value={{bookclub, bookshelves, parameters, newBookId, setBookclub, setBookshelves, setNewBookId, addBook}}
        >
            {children}
        </BookclubContext.Provider>
    )


}

export default BookclubDataProvider

export const bookclubData = () => useContext(BookclubContext)