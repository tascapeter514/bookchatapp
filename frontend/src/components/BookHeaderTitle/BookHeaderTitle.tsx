import './BookHeaderTitle.css'
import { Link } from 'react-router-dom'
import { Book } from '../../types'
import { authorText } from '../../utils/textFormatting'

interface Props {
    book: Book
}

const BookHeaderTitle = ({book}: Props) => {

    return(

        <article className="book-header-title">
            <h1>{book.name}</h1>
            <h3>By <span> {authorText(book.authors)} </span></h3>
            <p>Category: <Link to='#' >{book.genres.name}</Link></p>
            <button
            // onClick={openBookclubModal} 
                className='add-to-bookClubBtn'
            >
                Add to Bookclub
            </button>
        </article>

    )

}

export default BookHeaderTitle

