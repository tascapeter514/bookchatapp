import {Bookshelf, Book} from '../../types'
import BookCard from '../BookCard/BookCard'
import BookSearchModal from '../Modals/BookSearchModal/BookSearchModal'
import WithAsync from '../HigherOrderComponents/WithAsync'
import WithAddBook from '../HigherOrderComponents/WithAddBook'
import './BookshelfDisplay.css'

interface Props {
    children: Bookshelf,
    id: number

}



const BookSearchModalWithLogic = WithAddBook(WithAsync(BookSearchModal))

const BookshelfDisplay = ({ children, id }: Props) => {

    console.log('bookshelf display children:', children)


    const { books } = children
    
    return(
        <section className="bookshelf-container">
            <BookSearchModalWithLogic bookshelfId={children.id} />
            
            <ul className="bookshelf-title-list">
                {books.map((bookElement: Book) => {
                    return(
                        <li
                            className='book-card-listElement'
                            key={bookElement.id}
                        >
                            <BookCard id={id} bookshelfId={children.id}>{bookElement}</BookCard>
                        </li>
                    )
                })}
            </ul>
        </section>
        
    )
}

export default BookshelfDisplay