import './BookResults.css'
import { Book } from '../../../../../../types'




interface BookResult {
    id: number,
    name: string


}

interface Props {
    children: Book[],
    // newBookId: number,
    // setNewBookId: (id: number) => void,
    searchValue: string
}


const BookResults = ({children, searchValue}: Props) => {


    return(
        <ul className='book-results-list'>
            {children.filter((result: BookResult) => result.name.includes(searchValue)).map((bookResult) => {
                if (!bookResult) {
                    return null
                }
                return(
                    <li 
                    className='book-result-listElement'
                    key={bookResult.id}
                    >
                        <label htmlFor={bookResult.name}>{bookResult.name}</label>
                        <input 
                            type="radio"
                            name='bookResultsGroup'
                            checked={newBookId === bookResult.id}
                            onChange={() => setNewBookId(bookResult.id)}
                            className='book-result-input'  
                        />
                    </li>
                )
            })}
        </ul>
    )
}

export default BookResults