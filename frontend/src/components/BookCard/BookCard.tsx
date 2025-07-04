import { LikeIcon, DislikeIcon, CancelIcon } from '../Icons'
import { useDeleteBookMutation } from '../../slices/bookshelfApiSlice'
import { Book, Author } from '../../types'
import './BookCard.css'

interface Props {
    children: Book,
    bookshelfId: number
}


const BookCard = ({children: book, bookshelfId}: Props) => {

   
    const [deleteBook] = useDeleteBookMutation()

    const handleDeleteBook = async () => {

        const bookId = Number(book.id)

        try {

            if (!bookId || !bookshelfId) {
                throw new Error ('Invalid bookId or bookshelfId')
            }

            await deleteBook({bookId, bookshelfId})

        } catch(err) {
            console.error('Delete Book Error:', err)
        }

    }


    return(
        <article className="book-card" >
            <div className="img-overlay">
                <CancelIcon onClick={handleDeleteBook} aria-label='delete book' role='button'/>
                <img src={book.imageLinks?.thumbnail} alt="book-card-cover" className='book-card-img' />
                <div className="book-card-buttons">
                    <LikeIcon />
                    <DislikeIcon />
                </div>
            </div>      
            <div className="book-card-back">
                <h3 className="book-card-title">{book.name}</h3>
                {book.authors?.map((author: Author) => (
                    <li className='card-author-listElement' key={author.id}><span className='card-author-name'>{author.name}</span></li>
                ))}
                <p className="book-card-ratings">{book.averageRating} out of {book.ratingsCount} ratings</p>
                        
            </div>
        </article>
    )

}

export default BookCard