import './BookclubSearchResults.css'
import { FC, Dispatch, SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import { Bookclub } from '../../../../types'


interface BookclubSearchResultProps {
    bookclubSearchResults: Bookclub[],
    setShowSearchResults: Dispatch<SetStateAction<boolean>>
}


const BookclubSearchResults: FC<BookclubSearchResultProps> = ({bookclubSearchResults, setShowSearchResults}) => {

    const searchResultElements = bookclubSearchResults.map((searchResultElement: Bookclub, index) => {


        if (!searchResultElement) {
            return null
        }

        return (
            <li key={index} onClick={() => setShowSearchResults(false)}>

                <Link to='#'><span>{searchResultElement.name}</span></Link>
                

            </li>

        )})


    
    return (
        <ul className="results-list">
            {searchResultElements}
        </ul>

    )
}

export default BookclubSearchResults