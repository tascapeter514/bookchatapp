import BookshelfButtonModal from '../Modals/BookshelfButtonModal/BookshelfButtonModal'
import { Book } from '../../types'
import './BookCover.css'

interface Props {
    book: Book
}

const BookCover = ({book}: Props) => {

    const thumbnail = book.imageLinks?.thumbnail || null


    return(
        <div className="book-cover">
            {thumbnail ? (
                <img className='book-cover-image' src={book.imageLinks?.thumbnail} alt="" />

                ) : (
                    <div className="cover-placeholder">No Cover</div>
                )
        
            }
            
            <BookshelfButtonModal book={book} /> 
        </div>
    )

}

export default BookCover


