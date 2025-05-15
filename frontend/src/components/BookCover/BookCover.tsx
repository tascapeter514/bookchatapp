import AddBookToBookshelfModal from '../Modals/AddBookToBookshelfModal/AddBookToBookshelfModal'
import WithAsync from '../HigherOrderComponents/WithAsync'
import WithAddBookToBookshelf from '../HigherOrderComponents/WithAddBookToBookshelf'
import { Book } from '../../types'
import './BookCover.css'

interface Props {
    book: Book
}

const BookshelfButtonModalWithLogic = WithAddBookToBookshelf(WithAsync(AddBookToBookshelfModal))

const BookCover = ({book}: Props) => {

    const thumbnail = book.imageLinks?.thumbnail || null


    return(
        <div className="book-cover">
            {thumbnail ? (
                <img 
                    className='book-cover-image skeleton' 
                    src={book.imageLinks?.thumbnail}
                    width='500'
                    height='500'
                    loading='lazy' 
                    
                    alt="" />

                ) : (
                    <div className="cover-placeholder">No Cover</div>
                )
        
            }
            
            <BookshelfButtonModalWithLogic bookId={book.id}/> 
        </div>
    )

}

export default BookCover


