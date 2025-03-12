import './BookSearchbar.css'
import { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { Book } from '../../../../../types'
import { useDebounce } from '../../../../Searchbar/Searchbar'
import { SearchIcon } from '../../../../common/Icons'


interface BookSearchbarProps {
    setBookResults: Dispatch<SetStateAction<Book[]>>,
    setShowBookResults: Dispatch<SetStateAction<boolean>>,
    showBookResults: boolean,
    searchValue: string,
    setSearchValue: Dispatch<SetStateAction<string>>
}



const BookSearchbar = ({setBookResults, setShowBookResults, showBookResults, searchValue, setSearchValue}: BookSearchbarProps) => {

    
    const debouncedSearchValue = useDebounce(searchValue, 500);


    const fetchSearchData = (value: string) => {
        const encodedValue = encodeURIComponent(value)
        const path = encodeURI(`ws://localhost:8000/ws/books/${encodedValue}/`)


        

        try {

            const socket = new WebSocket(path)

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === 'get_books_data') {
                    console.log('book search query:', data.books_data)
                    // setSearchResults(data.search_results)
                    setBookResults(data.books_data);
                    setShowBookResults(true)
                }
            }

            socket.onerror = (error) => {
                console.error('Websocket search query error:', error)
            }

            socket.onopen = () => console.log('Book query websocket connected')
            socket.onclose = () => console.log('Book query websocket disconnected')

            return () => socket.close()

        } catch (err) {
            console.error(`Book query websocket failed to initialize: ${err}`)
        }
        
    }

    useEffect(() => {

        if (debouncedSearchValue) {
            fetchSearchData(debouncedSearchValue)
        } else {
            setShowBookResults(false)
        }

    }, [debouncedSearchValue ])

    useEffect(() => {
        if (!showBookResults) {
            setSearchValue('')
        }
    }, [showBookResults])


    return (
        <div className="book-searchbar">
            <input
                className='search-books-input'
                placeholder='Type to search...' 
                value={searchValue} 
                onChange={(e) => setSearchValue(e.target.value)} 
            />
                <SearchIcon className='search-icon'/>

        </div>

    )
}

export default BookSearchbar