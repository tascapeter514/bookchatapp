import Button from '../../../common/Buttons/Button/Button'
import { Ref, useState, Dispatch, SetStateAction } from 'react'
import { Book, Bookshelf } from '../../../../types'
import BookSearchbar from './BookSearchbar/BookSearchbar'
import BookResults from './BookResults/BooksResults'
import './SearchBooksModal.css'


interface SearchBooksModalProps {
    closeModal: () => void,
    setSelectedBook: Dispatch<SetStateAction<string>>,
    addBook: (bookshelf: Bookshelf) => Promise<void>,
    modalRef: Ref<HTMLDialogElement>,
    bookshelves: Bookshelf[],
    selectedBook: string,
}



const SearchBooksModal = ({closeModal, setSelectedBook, addBook, modalRef, bookshelves, selectedBook}: SearchBooksModalProps) => {

    const [bookResults, setBookResults] = useState<Book[]>([])
    const [showBookResults, setShowBookResults] = useState(false)
    
    const [searchValue, setSearchValue] = useState('');
    const [currentBookshelf, setCurrentBookshelf] = useState<Bookshelf>({
        bookshelf_id: '',
        name: '',
        user: NaN,
        titles: []

    })
    const handleBookSelection = (id: string) => setSelectedBook(id)
    const [bookshelfTitles, setBookshelfTitles] = useState<Book[]>([])
        
    

    console.log('current bookshelf:', currentBookshelf)


    

    const handleBookshelfSelection = (bookshelf: Bookshelf) => {
        setCurrentBookshelf(bookshelf)
        setBookshelfTitles(bookshelf.titles ?? [])

    }

    // console.log('book results:', bookResults)

    console.log('bookshelf titles:', bookshelfTitles)


    return (
        <dialog className='search-books-modal' ref={modalRef}>
            <h3>Add a new title to your bookclub</h3>
            <hr />
            <section className='search-books-content'>
               
                <article className='suggested-book-list'>
                    <BookSearchbar
                        setBookResults={setBookResults}
                        setShowBookResults={setShowBookResults}
                        showBookResults={showBookResults}
                        searchValue={searchValue}
                        setSearchValue={setSearchValue}
                    >

                    </BookSearchbar>
                    <BookResults
                        selectedElement={selectedBook}
                        handleSelection={handleBookSelection}
                        searchValue={searchValue}
                    >
                        {bookResults}


                    </BookResults>
                </article>
                <aside className='bookshelves-list'>
                    {selectedBook && bookshelves !== undefined  ? 
                        bookshelves.length > 0 ? (
                        bookshelves.map((bookshelf) => {
                        {return <li key={bookshelf.bookshelf_id} className='bookshelf-result'
                                >
                                <label htmlFor={bookshelf.name}>{bookshelf.name}</label>
                                <input 
                                    type="radio" 
                                    className='bookshelf-input' 
                                    id={bookshelf.name}
                                    name='bookshelfGroup'
                                    checked={currentBookshelf?.bookshelf_id === bookshelf.bookshelf_id} 
                                    onChange={() => handleBookshelfSelection(bookshelf)}/>
                                </li> }
                        })
                        ) : (<span>No bookshelves  in your bookclub</span>)
                        : 'No Book Selected'}
                    </aside>
            </section>
            <div className="button-wrapper">
                <Button onClick={closeModal}>Cancel</Button>
                <Button onClick={async () => selectedBook && await addBook(currentBookshelf)}>Add Book</Button>
            </div>
        </dialog>

    )
}


export default SearchBooksModal