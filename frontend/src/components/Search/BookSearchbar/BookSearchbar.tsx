import './BookSearchbar.css'
import { SearchIcon } from '../../Icons'

interface Props {
    searchValue: string,
    handleOnChange: (e: string) => void
}

const BookSearchbar = ({searchValue, handleOnChange}: Props) => {

    

    return (
        <>
            <div className="book-searchbar">
                <input
                    className='search-books-input'
                    placeholder='Type to search...' 
                    value={searchValue} 
                    onChange={(e) => handleOnChange(e.target.value)} 
                />
                <SearchIcon className='search-icon'/>
            </div>
            
            
        </>

    )
}

export default BookSearchbar


// const fetchSearchData = (value: string) => {
//     const encodedValue = encodeURIComponent(value)
//     const path = encodeURI(`ws://localhost:8000/ws/books/${encodedValue}/`)
//     try {

//         const socket = new WebSocket(path)

//         socket.onmessage = (event) => {
//             const data = JSON.parse(event.data);
//             if (data.type === 'get_books_data') {
//                 console.log('book search query:', data.books_data)
//                 // setSearchResults(data.search_results)
//                 setBookResults(data.books_data);
//                 setShowBookResults(true)
//             }
//         }

//         socket.onerror = (error) => {
//             console.error('Websocket search query error:', error)
//         }

//         socket.onopen = () => console.log('Book query websocket connected')
//         socket.onclose = () => console.log('Book query websocket disconnected')

//         return () => socket.close()

//     } catch (err) {
//         console.error(`Book query websocket failed to initialize: ${err}`)
//     }
    
// }

