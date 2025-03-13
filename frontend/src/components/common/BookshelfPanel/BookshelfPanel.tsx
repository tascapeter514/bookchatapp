import './BookshelfPanel.css';
import { Bookshelf } from '../../../types.ts'
import BookshelfComponent from './components/BookshelfComponent/BookshelfComponent.tsx'
import SearchBooksModal from './components/SearchBooksModal/SearchBooksModal.tsx'
import { SearchIcon } from '../Icons.tsx'
import Button from '../Buttons/Button/Button.tsx'
import Header from '../Header/Header.tsx'
import SubHeader from '../SubHeader/SubHeader.tsx'


type BookshelfPanelProps = {
    activeBookshelf: number,
    bookshelves: Bookshelf[] | [],

  }

const BookshelfPanel = ({activeBookshelf, bookshelves}: BookshelfPanelProps) => {


   

    const bookshelfElements = bookshelves?.map((bookshelf, index) => (
        activeBookshelf === index && 
            <li 
                key={bookshelf.bookshelf_id}
                className='bookshelf-listElement'

            >
                <SubHeader>{bookshelf.name}</SubHeader>
                <BookshelfComponent 
                    bookshelf={bookshelf}
                ></BookshelfComponent>
            </li>
    ))

    return(
        <section className='bookshelves-container' aria-labelledby='tab-1'>
             <Button
                onClick={openSearchBooks}
            >
                <SearchIcon></SearchIcon>
            </Button>
             <SearchBooksModal
                modalRef={searchBooksRef}
                closeModal={closeSearchBooks}
                bookshelves={bookshelves}
                setSelectedBook={setNewBookId}
                selectedBook={newBookId}
                addBook={addBook}
                                
            >

            </SearchBooksModal>
            <Header>Bookshelves</Header>
            <ul className='bookshelf-panel-list'>{bookshelfElements}</ul>
        </section>

    )
}

export default BookshelfPanel