import './BookResults.css'
import { Dispatch } from 'react'
import { BookSearchAction } from '../../../reducers/booksearchReducer'
import { BookData } from '../../../slices/searchApiSlice'



interface Props {
    children: BookData[],
    bookDispatch: Dispatch<BookSearchAction>
}


const BookResults = ({children, bookDispatch}: Props) => {


    // console.log('book results children:', children)
    

    return(
        <ul className='book-results-list'>
            {children.map((bookResult: BookData) => {
                
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