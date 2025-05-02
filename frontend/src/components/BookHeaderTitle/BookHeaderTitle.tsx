import { authorText } from '../../utils/textFormatting'
import { Link } from 'react-router-dom'
import { Book } from '../../types'
import WithAddBookToBookclubLogic from '../HigherOrderComponents/WithAddBookToBookclubLogic'
import AddBookToBookclubModal from '../Modals/AddBookToBookclubModal/AddBookToBookclubModal'
import './BookHeaderTitle.css'

interface Props {
    book: Book
}

const AddBookToBookclubModalWithLogic = WithAddBookToBookclubLogic(AddBookToBookclubModal)

const BookHeaderTitle = ({book}: Props) => {
    return(

        <article className="book-header-title">
            <h1>{book.name}</h1>
            <h3>By <span> {authorText(book.authors)} </span></h3>
            <p>Category: <Link to='#' >{book.genres.name}</Link></p>
            <AddBookToBookclubModalWithLogic bookId={book.id} />
            

        </article>
    )

}

export default BookHeaderTitle

            