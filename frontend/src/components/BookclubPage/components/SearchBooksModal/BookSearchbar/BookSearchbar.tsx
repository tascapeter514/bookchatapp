import './BookSearchbar.css'
import { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { Book } from '../../../../../types'
import { useDebounce } from '../../../../Searchbar/Searchbar'
import { SearchIcon } from '../../../../common/Icons'


interface BookSearchbarProps {
    setBookSearchResults: Dispatch<SetStateAction<Book[]>>,
    setShowSearchResults: Dispatch<SetStateAction<boolean>>,
    showSearchResults: boolean
}



const BookSearchbar = ({setBookSearchResults, setShowSearchResults, showSearchResults}: BookSearchbarProps) => {

    const [searchValue, setSearchValue] = useState('');
    const debouncedSearchValue = useDebounce(searchValue, 500);


    const fetchSearchData = (value: string) => {
        const encodedValue = encodeURIComponent(value)
        const path = encodeURI(`ws://localhost:8000/ws/books/${encodedValue}/`)

        try {

            const socket = new WebSocket(path)

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === 'get_books_query') {
                    console.log('book search query:', data)
                    // setSearchResults(data.search_results)
                    setBookSearchResults(data.search_results.book_results);
                    setShowSearchResults(true)
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
            setShowSearchResults(false)
        }

    }, [debouncedSearchValue ])

    useEffect(() => {
        if (!showSearchResults) {
            setSearchValue('')
        }
    }, [showSearchResults])



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