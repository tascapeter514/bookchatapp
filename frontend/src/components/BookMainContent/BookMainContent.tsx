import ProductDetails from '../ProductDetails/ProductDetails'
import AuthorDetails from '../AuthorDetails/AuthorDetails'
import { Author, Book } from '../../types'

import './BookMainContent.css'

interface Props {
    book: Book
}

const BookMainContent = ({book}: Props) => {

    return(
        <div className="main-content">
            <div className="book-description">
                <hr />
                <h3>About {book.name}</h3>
                <p>{book.description}</p>
            </div>
            <div className="author-product-container">
                {book.authors && book.authors.length > 0 &&
                    book.authors.map((author: Author ) => (
                        <AuthorDetails {...author} />
                ))}
                
                <ProductDetails {...{pageCount: book.pageCount, publisher: book.publisher, ISBNIdentifiers: book.ISBN_Identifiers}}/>
                
            </div>
        </div>
    )

}

export default BookMainContent