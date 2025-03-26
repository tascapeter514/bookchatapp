import {Bookshelf} from '../../../../../types'
import BookCard from '../../../../BookCard/BookCard'
import './BookshelfComponent.css'



interface Props {
    children: Bookshelf
}


const BookshelfDisplay = ({ children }: Props) => {

    const { books } = children

    return(
        <section className="bookshelf-container">
            <ul className='bookshelf-title-list'>
                {books.map((bookElement) => {
                    return(
                        <li 
                            className='book-card-listElement' 
                            key={bookElement.id}
                        >
                            <BookCard>{bookElement}</BookCard>   
                        </li>
                    )})
                }  
            </ul>
        </section>
        
    )
}

export default BookshelfDisplay