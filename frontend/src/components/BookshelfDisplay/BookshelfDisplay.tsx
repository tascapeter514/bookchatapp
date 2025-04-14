import {Bookshelf, Book} from '../../types'
import BookCard from '../BookCard/BookCard'
import BookSearchModal from '../Modals/BookSearchModal/BookSearchModal'

import './BookshelfDisplay.css'

interface Props {
    children: Bookshelf,
    id: number

}


const BookshelfDisplay = ({ children, id }: Props) => {

    


    const { books } = children
    
    return(
        <section className="bookshelf-container">
            <BookSearchModal bookshelf={children} id={id} />
            <ul className="bookshelf-title-list">
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
            </ul>
        </section>
        
    )
}

export default BookshelfDisplay