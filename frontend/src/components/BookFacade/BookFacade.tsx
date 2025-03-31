import './BookFacade.css'
import { useRef } from 'react'
import { Book, Author } from '../../types'
import { Data } from '../../reducers/dataReducer'
import { Link } from 'react-router-dom'
import { BookmarkIcon } from '../common/Icons'
import AddBook from '../common/Modals/AddBook/AddBook'




interface Props {
    book: Book | Data

}

const BookFacade = ({book}: Props) => {
    console.log('book:', book)
    console.log('book authors:', book.authors)
    const authors = book.authors ?? []
      // refactor to get at authors names
    const authorText = (() => {
        
        switch (authors.length) {
            case 0:
                return 'Unknown Author';
            case 1:
                return book.authors[0].name
            case 2:
                return book.authors.map((author: Author) => author.name)
            case 3:
                return book.authors.slice(0, 3).join(', ')
            case 4:
                return `${book.authors.slice(0, 3).join(', ')} and others`;
        }
    })()

    const addBookRef = useRef<HTMLDialogElement>(null)
    const openModal = () => addBookRef.current?.showModal()

    return(

        <div className="top-facade">
        <div className="book-header-wrapper">
            <div className="book-details">
                <img className='book-cover' src={book.imageLinks['thumbnail']} alt="" />
               <div className="bookshelfBtn-wrapper">
                   <BookmarkIcon onClick={openModal}></BookmarkIcon>
                    <span>Add to Bookshelf</span>
               </div>
               <AddBook addBookRef={addBookRef} book={book}/>
            
              
               
            </div>
            <article className="book-info-wrapper">
                <h1>{book.name}</h1>
                <h3>
                    By <span> {authorText} </span>
                </h3>
                <p>Category: <Link to='#' >{book.genres.name}</Link></p>
                <button
                    // onClick={openBookclubModal} 
                    
                    className='add-to-bookClubBtn'>Add to Bookclub</button>
            </article>

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
        </div>
    </div>
    )
}

export default BookFacade