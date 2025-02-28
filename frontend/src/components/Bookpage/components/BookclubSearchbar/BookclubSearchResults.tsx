import './BookclubSearchResults.css'
import { FC, useState } from 'react'
import { Bookclub } from '../../../../types'


interface BookclubSearchResultProps {
    bookclubSearchResults: Bookclub[],
    showBookshelves: (bookclubId: string) => void,
}


const BookclubSearchResults: FC<BookclubSearchResultProps> = ({bookclubSearchResults, showBookshelves}) => {

    const [selectedBookclub, setSelectedBookclub] = useState<string | null>(null)

    const handleSelection = (bookclubId: string) => {
        setSelectedBookclub(bookclubId)
        showBookshelves(bookclubId)
    }

    const searchResultElements = bookclubSearchResults.map((searchResultElement: Bookclub, index) => {


        if (!searchResultElement) {
            return null
        }

        return (
            <li key={index} >

                <div className='bookclub-result-wrapper'>
                    <label htmlFor={searchResultElement.name}>{searchResultElement.name}</label>
                    <input 
                        type="radio" 
                        className='bookclub-result-input' 
                        id={searchResultElement.name}
                        name='bookclubGroup'
                        checked={selectedBookclub === searchResultElement.bookclub_id} 
                        onChange={() => handleSelection(searchResultElement.bookclub_id)}/>
                    
                </div>
                
                

            </li>

        )})


    
    return (
        <ul className="bookclub-results-list">
            {searchResultElements}
        </ul>

    )
}

export default BookclubSearchResults