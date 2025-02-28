import './BookclubSearchResults.css'
import { FC } from 'react'
// import { Link } from 'react-router-dom'
import { Bookclub } from '../../../../types'


interface BookclubSearchResultProps {
    bookclubSearchResults: Bookclub[],
}


const BookclubSearchResults: FC<BookclubSearchResultProps> = ({bookclubSearchResults}) => {

    const searchResultElements = bookclubSearchResults.map((searchResultElement: Bookclub, index) => {


        if (!searchResultElement) {
            return null
        }

        return (
            <li key={index} >

                {/* <Link to='#'><span>{searchResultElement.name}</span></Link> */}
                {/* <input type= "checkbox" >{searchResultElement.name}</input> */}
                <div className='bookclub-result-wrapper'>
                    <label htmlFor={searchResultElement.name}>{searchResultElement.name}</label>
                    <input type="radio" className='bookclub-result-input'/>
                    
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