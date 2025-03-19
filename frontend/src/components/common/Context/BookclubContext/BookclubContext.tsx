import { useState, useEffect, createContext, useContext, ReactNode, Dispatch, SetStateAction } from 'react'
import { Bookclub, Bookshelf } from '../../../../types'
import {useParams } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'





type BookclubProviderProps = {children: ReactNode}

interface ContextProps {
    bookclub: Bookclub,
    bookshelves: Bookshelf[],
    parameters: Readonly<Partial<{ id: string; }>>,
    newBkslfId: string,
    setBookclub: Dispatch<SetStateAction<Bookclub>>,
    setBookshelves: Dispatch<SetStateAction<Bookshelf[]>>,
    setBkslfId: Dispatch<SetStateAction<string>>,
    addBookshelf: (formData: FormData) => Promise<void>
}


export const BookclubContext = createContext<ContextProps>({
    bookclub: {
        id: NaN,
        name: '',
        administrator: NaN,
        members: [],
        currentRead: {
            id: NaN,
            name: '',
            publisher: '',
            description: '',
            ISBN_Identifiers: [],
            averageRating: NaN,
            ratingsCount: NaN,
            imageLinks: {},
            pageCount: NaN,
            genres: {
                id: NaN, name: ''
            },
            authors: []
        },
        cover_image: ''

    },
    bookshelves: [],
    parameters: {id: ''},
    newBkslfId: '',

    setBookclub: () => {},
    setBookshelves: () => [],
    setBkslfId: () => {},
    addBookshelf: async () => {}



})

export const BookclubDispatchContext = createContext(null)



const BookclubDataProvider = ({ children } : BookclubProviderProps) => {

    const [bookclub, setBookclub] = useState<Bookclub>({
        id: NaN,
        name: '',
        administrator: NaN,
        members: [],
        currentRead: {
            id: NaN,
            name: '',
            publisher: '',
            description: '',
            ISBN_Identifiers: [],
            averageRating: NaN,
            ratingsCount: NaN,
            imageLinks: {},
            pageCount: NaN,
            genres: {
                id: NaN, name: ''
            },
            authors: []
        },
        cover_image: ''
    })

    const parameters = useParams<{id: string}>()
    const [bookshelves, setBookshelves] = useState<Bookshelf[]>([])
    const [newBkslfId, setBkslfId] = useState<string>('')
    
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

    
    const addBookshelf = async (formData: FormData): Promise<void> => {
        console.log('form data:', formData.get('bookshelfName'))

        const bookshelfObject = {
            name: String(formData.get('bookshelfName') || ''),
            id: parameters.id,
            books: [],


        }

        axios.post('http://localhost:8000/api/bookclub/addBookshelf', bookshelfObject)
            .then(response => {
                setBookshelves(prev => [...(prev || []), response.data])
                console.log('bookshelf data response:', response.data)
                setBkslfId('')
            })
            .catch(error => console.log('Your bookshelf was not created:', error))

        
    }

    

    return (
        <BookclubContext.Provider
            value={{bookclub, bookshelves, parameters, newBkslfId, setBookclub, setBookshelves, setBkslfId, addBookshelf}}
        >
            {children}
        </BookclubContext.Provider>
    )


}

export default BookclubDataProvider

export const bookclubData = () => useContext(BookclubContext)