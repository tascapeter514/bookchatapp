import {Bookshelf, Book} from '../../types'
import BookCard from '../BookCard/BookCard'
import Button from '../Buttons/Button/Button'
import { Data } from '../../reducers/dataReducer'
import BookSearchModal from '../Modals/BookSearchModal/BookSearchModal'
import { SearchIcon } from '../Icons'
import { useRef } from 'react';
import './BookshelfDisplay.css'

interface Props {
    children: Bookshelf | Data,

}


const BookshelfDisplay = ({ children }: Props) => {

    const { books } = children
    const openModal = () => bookSearchRef.current?.showModal()
    
    const bookSearchRef = useRef<HTMLDialogElement>(null)

    return(
        <section className="bookshelf-container">
            <Button onClick={openModal}>
                <SearchIcon></SearchIcon>
            </Button>
            <BookSearchModal ref={bookSearchRef} bookshelf={children}></BookSearchModal>
            <ul className='bookshelf-title-list'>
                {books.map((bookElement: Book) => {
                    return(
                        <li 
                            className='book-card-listElement' 
                            key={bookElement.id}
                        >
                            <BookCard bookshelfId={children.id}>{bookElement}</BookCard>   
                        </li>
                    )})
                }  
            </ul>
        </section>
        
    )
}

export default BookshelfDisplay