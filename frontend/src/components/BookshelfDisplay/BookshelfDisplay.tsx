import {Bookshelf, Book} from '../../types'
import BookCard from '../BookCard/BookCard'
import BookSearchModal from '../Modals/BookSearchModal/BookSearchModal'

import './BookshelfDisplay.css'

interface Props {
    children: Bookshelf,

}


const BookshelfDisplay = ({ children }: Props) => {

    const { books } = children
    
    return(
        <section className="bookshelf-container">
            <BookSearchModal bookshelf={children}></BookSearchModal> 
            {books.map((bookElement: Book) => {
                return(
                    <li 
                        className='book-card-listElement' 
                        key={bookElement.id}
                    >
                        <BookCard bookshelfId={children.id}>{bookElement}</BookCard>   
                    </li>
                )
            })}  
        </section>
        
    )
}

export default BookshelfDisplay