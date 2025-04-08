import Button from '../../Buttons/Button/Button'
import { RefObject, useReducer, useRef} from 'react'
import ErrorMessage from '../../Messages/ErrorMessage/ErrorMessage'
import { SearchIcon } from '../../Icons'
import booksearchReducer from '../../../reducers/booksearchReducer'

import BookSearchbar from '../../Search/BookSearchbar/BookSearchbar'
import { Bookshelf } from '../../../types'
import './BookSearchModal.css'


interface Props {
    bookshelf: Bookshelf
}


const BookSearchModal = ({ bookshelf }: Props) => {

    const bookSearchRef = useRef<HTMLDialogElement>(null)
    const openModal = () => bookSearchRef.current?.showModal()
    const closeModal = () => bookSearchRef.current?.close()
    const [bookSearch, bookDispatch] = useReducer(booksearchReducer, {bookshelfId: 0, books: bookshelf.books, newBookId: 0} )
  
    const addBook = () => console.log('add button clicked')
            
    
    return (
        <>
            <Button onClick={openModal}>
                <SearchIcon />
            </Button>
            <dialog className='search-books-modal' ref={bookSearchRef}>
            {/* {data.isError && <ErrorMessage>{data.error}</ErrorMessage>} */}
                <h3>Add a new title to your bookshelf</h3>
                <hr />
                <section className='search-books-content'>
                    <article className='suggested-book-list'>
                        <BookSearchbar bookDispatch={bookDispatch}></BookSearchbar>
                    </article>
                </section>
                <div className="button-wrapper">
                    <Button onClick={closeModal}>Cancel</Button>
                    <Button onClick={addBook}>Add Book</Button>
                </div>
            </dialog>
        </>
    )
}


export default BookSearchModal

// onClick={async () => newBookId && await addBook(newBookId, currBkslfId)}
{/* <aside className='bookshelves-list'>
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
                    </aside> */}


 // useEffect(() => {
    //     if (!data.isLoading && !data.isError && data.data.length > 0) {
    //         bookshelfDispatch({type: 'ADD_BOOK' , payload: {bookshelfId: bookshelf.id, newBook: data.data}})
    //     }

    // }, [data])


    // const addBook = async () => {
    //     console.log('handle submit called')

    //     const request = {
    //         bookshelfId: bookshelf.id,
    //         bookId: bookSearch.newBookId
    //     }
    //     try {
    //         console.log('before make request')
    //         await makeRequest(request)

  
            
            
    //     } catch(err) {
    //         console.log('error handling submission:', err)
    //     }

    
    // }