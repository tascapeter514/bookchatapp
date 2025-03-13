import Button from '../../../Buttons/Button/Button'
import { useState } from 'react'
import { Book, Bookshelf } from '../../../../../types'
import { bookshelfData } from '../../../Context/BookshelfContext/BookshelfContext'
import BookSearchbar from './BookSearchbar/BookSearchbar'
import BookResults from './BookResults/BooksResults'
import './SearchBooksModal.css'


interface SearchBooksModalProps {
    bookshelves: Bookshelf[],
}



const SearchBooksModal = ({ bookshelves }: SearchBooksModalProps) => {

    const { searchBooksRef, closeSearchBooks, addBook } = bookshelfData()
    const [bookResults, setBookResults] = useState<Book[]>([])
    const [showBookResults, setShowBookResults] = useState(false)
    const [searchValue, setSearchValue] = useState('');
    const [newBookId, setNewBookId] = useState('')
    const [currBkslfId, setCurrBkslfId] = useState<string>('')
        
    return (
        <dialog className='search-books-modal' ref={searchBooksRef}>
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
                        newBookId={newBookId}
                        setNewBookId={setNewBookId}
                        searchValue={searchValue}
                    >
                        {bookResults}


                    </BookResults>
                </article>
                <aside className='bookshelves-list'>
                    {newBookId && bookshelves !== undefined  ? 
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
                                    checked={currBkslfId === bookshelf.bookshelf_id} 
                                    onChange={() => setCurrBkslfId(bookshelf.bookshelf_id)}/>
                                </li> }
                        })
                        ) : (<span>No bookshelves  in your bookclub</span>)
                        : 'No Book Selected'}
                    </aside>
            </section>
            <div className="button-wrapper">
                <Button onClick={closeSearchBooks}>Cancel</Button>
                <Button onClick={async () => newBookId && await addBook(newBookId, currBkslfId)}>Add Book</Button>
            </div>
        </dialog>

    )
}


export default SearchBooksModal