import './BookshelfPanel.css';
import { Bookshelf } from '../../../types.ts'
import BookshelfComponent from '../BookshelfComponent/BookshelfComponent.tsx'
import Header from '../Header/Header.tsx'
import SubHeader from '../SubHeader/SubHeader.tsx'

type BookshelfPanelProps = {activeBookshelf: number, bookshelves: Bookshelf[] }

const BookshelfPanel = ({activeBookshelf, bookshelves}: BookshelfPanelProps) => {


  
    
    const bookshelfElements = bookshelves.map((bookshelf, index) => (
        activeBookshelf === index && 
            <li 
                key={bookshelf.bookshelf_id}
                className='bookshelf-listElement'

            >
                <SubHeader>{bookshelf.name}</SubHeader>
                <BookshelfComponent activeBookshelf={activeBookshelf} bookshelf={bookshelf}></BookshelfComponent>
            </li>
    ))

    return(
        <section className='bookshelves-container' aria-labelledby='tab-1'>
            <Header>Bookshelves</Header>
            <ul className='bookshelf-panel-list'>{bookshelfElements}</ul>
        </section>

    )
}

export default BookshelfPanel