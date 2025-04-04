import './BookHeader.css'
import { Book, Author } from '../../types'
import BookCover from '../BookCover/BookCover'
import BookHeaderTitle from '../BookHeaderTitle/BookHeaderTitle'


interface Props {
    book: Book

}

const BookHeader = ({book}: Props) => {

    
   
    return(

        <div className="book-header">
            <BookCover book={book}/>
            <BookHeaderTitle book={book} />
        </div>
    )
}

export default BookHeader


  {/* BOOKCLUB MODAL */}
            {/* <dialog className={`addToBookclub-modal ${isBookclubModalOpen ? 'show' : ''}`} ref={bookclubModalRef}>
                <h3>Add this book to your bookclub</h3>
                <hr />
                    <main className="bookclub-results-content">
                        <div className="suggested-search-results">
                            <SearchFilter
                                setSearchValue={setSearchValue}
                                searchValue={searchValue}
                            >
                            </SearchFilter>
                            <h3>Suggested</h3>
                            <SearchResults
                            idKey='bookclub_id'
                            nameKey='name'
                            searchValue={searchValue}
                            handleSelection={handleBookclubSelection}
                            selectedElement={selectedBookclub}
                            searchResults={bookclubSearchResults}
                            >

                            </SearchResults>
                        </div>
                        <aside className='bookclub-bookshelves'>
                            {currentBookclub && currentBookclub.bookshelves !== undefined  ? 
                                currentBookclub.bookshelves.length > 0 ? (
                                    currentBookclub.bookshelves.map((bookshelf, index) => {
                                        {return <li key={index} className='bookshelf-result'>
                                            <label htmlFor={bookshelf.name}>{bookshelf.name}</label>
                                            <input 
                                                type="radio" 
                                                className='bookshelf-input' 
                                                id={bookshelf.name}
                                                name='bookshelfGroup'
                                                checked={currentBookshelf?.bookshelf_id === bookshelf.bookshelf_id} 
                                                onClick={() => setCurrentBookshelf(bookshelf)}/>
                                        </li> }
                                    })
                                ) : (<span>No bookshelves for this bookclub</span>)
                                : 'No Bookclub Selected'}
                        </aside>
                    </main>
               
                
                <div className="button-wrapper">
                    <button onClick={closeBookclubModal}>Cancel</button>
                    <button onClick={() => currentBookshelf && addToBookshelf(currentBookshelf)}>Add</button>
                </div>

            </dialog> */}