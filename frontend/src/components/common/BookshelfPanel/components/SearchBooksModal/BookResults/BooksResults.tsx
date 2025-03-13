import './BookResults.css'
import { Book } from '../../../../../../types'




interface ChildElement {
    title_id: string,
    title: string


}

interface BookResultsProps {
    children: Book[],
    selectedElement: string,
    handleSelection: (id: string) => void,
    searchValue: string
}


const BookResults = ({children, selectedElement, handleSelection, searchValue}: BookResultsProps) => {

    const bookResults = children.filter((child: ChildElement) => child.title.includes(searchValue)).map((childElement) => {
        if (!childElement) {
            return null
        }
        return (
            <li 
            className='book-result-listElement'
            key={childElement.title_id}
            >
                <label htmlFor={childElement.title}>{childElement.title}</label>
                <input 
                    type="radio"
                    name='bookResultsGroup'
                    checked={selectedElement === childElement.title_id}
                    onChange={() => handleSelection(childElement.title_id)}
                    className='book-result-input'  
                />
                
            </li>
        )


    })

    return(
        <ul className='book-results-list'>
            {bookResults}
        </ul>

    )

}

export default BookResults