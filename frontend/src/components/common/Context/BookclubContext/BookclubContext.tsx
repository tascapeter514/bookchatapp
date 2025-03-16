import { useState, useEffect, createContext, useContext, ReactNode, Dispatch, SetStateAction } from 'react'
import {useParams } from 'react-router-dom'
import { ActiveUser } from '../../../../types'
import { userData } from '../UserContext/UserContext'
import { v4 as uuidv4 } from 'uuid'
import axios from 'axios'

import { Bookclub, Bookshelf } from '../../../../types'



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
    newBkslfId: '',

    setBookclub: () => {},
    setBookshelves: () => [],
    setBkslfId: () => {},
    addBookshelf: async () => {}



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

    const parameters = useParams<{id: string}>()
    const [bookshelves, setBookshelves] = useState<Bookshelf[]>([])
    const [newBkslfId, setBkslfId] = useState<string>('')
    
    
    // const [isMember, membershipCheck] = useState(false)

    // membershipCheck(() => {
    //     return bookclub.members.some((member: ActiveUser) => member.id === activeUser.id)
    // })
    
    


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

        const bookshelfObject: Bookshelf = {
            bookshelf_id: uuidv4(),
            name: String(formData.get('bookshelfName') || ''),
            bookclub_id: parameters.id,
            titles: [],


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