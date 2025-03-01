import './BookclubSearchbar.css'
import {FC, useEffect, Dispatch, SetStateAction} from 'react'
import { Bookclub } from '../../../../types'
import { SearchIcon } from '../../../common/Icons'

interface BookclubSearchbarProps {
    setBookclubSearchResults: Dispatch<SetStateAction<Bookclub[]>>,
    setSearchValue: Dispatch<SetStateAction<string>>,
    isModalOpen: boolean,
    searchValue: string

}


const BookclubSearchbar: FC<BookclubSearchbarProps> = ({setBookclubSearchResults, isModalOpen, setSearchValue, searchValue }) => {
    


    const fetchBookclubData = () => {
        console.log('bookclub websocket check')

        const path = `ws://localhost:8000/ws/search/bookclubs/all`

        try {

            const socket = new WebSocket(path)

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data);
                if (data.type === 'get_bookclub_query') {
                    console.log('web socket search query:', data)
                    setBookclubSearchResults(data.search_results.bookclub_results)
                
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

        console.log('open modal hook check')
        console.log('is modal open:', isModalOpen)

        fetchBookclubData()

    }, [isModalOpen])


    console.log('search value:', searchValue)
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


