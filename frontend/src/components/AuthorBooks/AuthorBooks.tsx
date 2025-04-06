import Accordion from '../Accordion/Accordion'
import { Book, Author } from '../../types'
import './AuthorBooks.css'


interface Props {
    author: Author
}


const AuthorBooks = ({author}: Props) => {

    const bookElements = author.books?.map((book: Book) => {
        return(
            <li key={book.id} className='book-item'>
                <img src={book.imageLinks.thumbnail} alt="book-thumbnail" className='book-thumbnail' />
                <span className='book-title'>{book.name}</span>
            </li>
        )
    })

    return(
        <div className="author-books">
            <hr className='author-divider'/>
            <h3>Books by {author.name}</h3>
            {author.books && author.books.length <= 6 ? (
                <ul className='author-book-list'>  
                    {bookElements}
                </ul>
                ) : (
                <Accordion>
                    <ul className="author-book-list">{bookElements}</ul>
                </Accordion>

                )}
            </div>
    )

}

export default AuthorBooks