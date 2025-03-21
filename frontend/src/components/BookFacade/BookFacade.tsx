import './BookFacade.css'
import { useRef } from 'react'
import { Author, Genre } from '../../types'
import { Link } from 'react-router-dom'
import { BookmarkIcon } from '../common/Icons'
import AddBook from '../common/Modals/AddBook/AddBook'



interface Props {
    name: string,
    authors: Author[],
    imageLinks: {smallThumbnail?: string, thumbnail?: string}
    genres: Genre,
    description: string

}

const BookFacade = ({name, authors, genres, imageLinks}: Props) => {

      // refactor to get at authors names
      const authorText = (() => {
        
        switch (authors.length) {
            case 0:
                return 'Unknown Author';
            case 1:
                return authors[0].name
            case 2:
                return authors.join(' and ')
            case 3:
                return authors.slice(0, 3).join(', ')
            case 4:
                return `${authors.slice(0, 3).join(', ')} and others`;
        }
    })()

    const addBookRef = useRef<HTMLDialogElement>(null)
    const openModal = () => addBookRef.current?.showModal()

    return(
        <div className="top-facade">
        <div className="book-header-wrapper">
            <div className="book-details">
                <img className='book-cover' src={imageLinks['thumbnail']} alt="" />
               <div className="bookshelfBtn-wrapper">
                   <BookmarkIcon onClick={openModal}></BookmarkIcon>
                    <span>Add to Bookshelf</span>
               </div>
               <AddBook addBookRef={addBookRef}/>
              
               
            </div>
            <article className="book-info-wrapper">
                <h1>{name}</h1>
                <h3>
                    By <span> {authorText} </span>
                </h3>
                <p>Category: <Link to='#' >{genres.name}</Link></p>
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