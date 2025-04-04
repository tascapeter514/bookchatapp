import BookshelfButtonModal from '../Buttons/BookshelfButtonModal/BookshelfButtonModal'
import { Book } from '../../types'
import './BookCover.css'

interface Props {
    book: Book
}

const BookCover = ({book}: Props) => {

    return(
        <div className="book-cover">
            <img className='book-cover-image' src={book.imageLinks['thumbnail']} alt="" />
            <BookshelfButtonModal /> 
        </div>
    )

}

export default BookCover