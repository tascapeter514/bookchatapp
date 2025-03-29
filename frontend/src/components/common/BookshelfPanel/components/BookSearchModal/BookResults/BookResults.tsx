import './BookResults.css'
import { Dispatch } from 'react'
import { BookSearchAction } from '../../../../../../reducers/booksearchReducer'
import { SearchData } from '../../../../../../types'

interface BookResult {
    id: number,
    name: string


}

interface Props {
    children: SearchData,
    bookDispatch: Dispatch<BookSearchAction>
}


const BookResults = ({children, bookDispatch}: Props) => {


    console.log('book results children:', children)
    const { items } = children[0]

    return(
        <ul className='book-results-list'>
            {items.map((bookResult: BookResult) => {
                
                if (!bookResult) {
                    return null
                }

                return(
                    <li 
                    className='book-result-listElement'
                    key={bookResult.id}
                    >
                        <label className='book-result-label' htmlFor={bookResult.name}>{bookResult.name}</label>
                        <input 
                            type="radio"
                            name='bookResultsGroup'
                            // checked={newBookId === bookResult.id}
                            onChange={() => bookDispatch({type: 'CHECK_BOOK', payload: bookResult.id})}
                            className='book-result-input'  
                        />
                    </li>
                )
            })}
        </ul>
    )
}

export default BookResults