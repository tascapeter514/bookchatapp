import { LikeIcon, DislikeIcon, CancelIcon } from '../Icons'
import { useDeleteBookMutation } from '../../slices/userDataApiSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { Book, Author } from '../../types'
import './BookCard.css'

interface Props {
    children: Book,
    bookshelfId: number
}


const BookCard = ({children, bookshelfId}: Props) => {

    const { user } = useSelector((state: RootState ) => state.auth)
    const [deleteBook] = useDeleteBookMutation()

    const handleDeleteBook = async () => {

        const userId = Number(user.id)
        const bookId = Number(children.id)

        try {
            await deleteBook({userId, bookId, bookshelfId})

        } catch(err) {
            console.error('Delete Book Error:', err)
        }

    }


    return(
        <article className="book-card" >
            <div className="img-overlay">
                <CancelIcon onClick={handleDeleteBook}></CancelIcon>
                <img src={children.imageLinks?.thumbnail} alt="book-card-cover" className='book-card-img' />
                <div className="book-card-buttons">
                    <LikeIcon></LikeIcon>
                    <DislikeIcon></DislikeIcon>
                </div>
            </div>      
            <div className="book-card-back">
                <h3 className="book-card-title">{children.name}</h3>
                {children.authors?.map((author: Author) => (
                    <li className='card-author-listElement' key={author.id}><span className='card-author-name'>{author.name}</span></li>
                ))}
                <p className="book-card-ratings">{children.averageRating} out of {children.ratingsCount} ratings</p>
                        
            </div>
        </article>
    )

}

export default BookCard