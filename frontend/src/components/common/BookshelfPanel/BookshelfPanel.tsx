import './BookshelfPanel.css';
import { Bookshelf } from '../../../types.ts'
import BookshelfComponent from '../BookshelfComponent/BookshelfComponent.tsx'
import { Dispatch, SetStateAction } from 'react'
import Header from '../Header/Header.tsx'
import SubHeader from '../SubHeader/SubHeader.tsx'

type BookshelfPanelProps = {
    activeBookshelf: number,
    bookshelves: Bookshelf[] | [],
    selectedBook: string,
    deleteTitle: (book_id: string) => Promise<void>,
    setDeleteBookshelf: Dispatch<SetStateAction<string>>

  }

const BookshelfPanel = ({activeBookshelf, bookshelves, selectedBook, deleteTitle, setDeleteBookshelf}: BookshelfPanelProps) => {

    const bookshelfElements = bookshelves?.map((bookshelf, index) => (
        activeBookshelf === index && 
            <li 
                key={bookshelf.bookshelf_id}
                className='bookshelf-listElement'

            >
                <SubHeader>{bookshelf.name}</SubHeader>
                <BookshelfComponent 
                    activeBookshelf={activeBookshelf} 
                    bookshelf={bookshelf}
                    selectedBook={selectedBook} 
                    deleteTitle={deleteTitle}
                    setDeleteBookshelf={setDeleteBookshelf}
                ></BookshelfComponent>
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