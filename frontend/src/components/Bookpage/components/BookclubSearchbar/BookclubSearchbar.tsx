import './BookclubSearchbar.css'
import {FC, useState, useEffect, Dispatch, SetStateAction} from 'react'
import { Bookclub } from '../../../../types'
import { SearchIcon } from '../../../common/Icons'
import { useDebounce } from '../../../Searchbar/Searchbar'

interface BookclubSearchbarProps {
    setBookclubSearchResults: Dispatch<SetStateAction<Bookclub[]>>,
    setShowSearchResults: Dispatch<SetStateAction<boolean>>,
    showSearchResults: boolean

}


const BookclubSearchbar: FC<BookclubSearchbarProps> = ({setBookclubSearchResults, setShowSearchResults, showSearchResults}) => {
    const [searchValue, setSearchValue] = useState('')
    const debouncedSearchValue = useDebounce(searchValue, 500)


    const fetchSearchData = (value: string) => {
        const encodedValue = encodeURIComponent(value)
        const path = encodeURI(`ws://localhost:8000/ws/bookclubsearch/${encodedValue}/`)

        try {

            const socket = new WebSocket(path)

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === 'get_bookclub_query') {
                    console.log('web socket search query:', data)
                    setBookclubSearchResults(data.search_results.bookclub_results)
                    setShowSearchResults(true)
                }
            }

            socket.onerror = (error) => {
                console.error('Websocket search query error:', error)
            }

            socket.onopen = () => console.log('Search query websocket connected')
            socket.onclose = () => console.log('Search query websocket disconnected')

            return () => socket.close()

        } catch (err) {
            console.error(`Search websocket failed to initialize: ${err}`)
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

    return(
        <div className="bookclub-input-wrapper">
                <input
                    name='bookclubName'
                    placeholder='Enter a Bookclub Name' 
                    value={searchValue} 
                    onChange={(e) => setSearchValue(e.target.value)}
                    required />
                <SearchIcon className='search-icon'/>

        </div>

    )


}

export default BookclubSearchbar


