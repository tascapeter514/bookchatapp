import { LikeIcon, DislikeIcon, CancelIcon } from '../common/Icons'
import { Data } from '../../reducers/dataReducer'
import { Book, Author } from '../../types'
import './BookCard.css'

interface Props {
    children: Book | Data
}


const BookCard = ({children}: Props) => {

    return(
        <article className="book-card" >
            <div className="img-overlay">
                <CancelIcon ></CancelIcon>
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