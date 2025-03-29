import Button from '../../../Buttons/Button/Button'
import { RefObject, useReducer } from 'react'
import { userContext } from '../../../Context/UserContext/UserContext'
import usePut from '../../../hooks/usePut'
import ErrorMessage from '../../../../Messages/ErrorMessage/ErrorMessage'
import booksearchReducer from '../../../../../reducers/booksearchReducer'
import BookSearchbar from './BookSearchbar/BookSearchbar'
import { Bookshelf } from '../../../../../types'
import './BookSearchModal.css'


interface Props {
    ref: RefObject<HTMLDialogElement>,
    bookshelf: Bookshelf
}



const BookSearchModal = ({ ref, bookshelf }: Props) => {

    const closeModal = () => ref.current?.close()
    const { activeUser, setUserData } = userContext()
    const [bookSearch, bookDispatch] = useReducer(booksearchReducer, {id: bookshelf.id, books: bookshelf.books, newBookId: NaN})
    const {makeRequest, loading, error} = usePut(`http://localhost:8000/api/user/book/${activeUser.id}`)
    
    console.log('book search state:', bookSearch)


    const addBook = async () => {
        console.log('handle submit called')

        const request = {
            bookshelfId: bookshelf.id,
            bookId: bookSearch.newBookId
        }
        try {
            console.log('before make request')
            const newItem = await makeRequest(request)
            console.log('new item:', newItem)

            if (!newItem) {
                console.log('no new item')
            }

            if (newItem.type === 'book') {
                bookDispatch({type: 'ADD_BOOK', payload: newItem})

            }
  
            
            
        } catch(err) {
            console.log('error handling submission:', err)
        }

    
    }



    return (
        <dialog className='search-books-modal' ref={ref}>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <h3>Add a new title to your bookshelf</h3>
            <hr />
            <section className='search-books-content'>
                
                <article className='suggested-book-list'>
                    <BookSearchbar bookSearch={bookSearch} bookDispatch={bookDispatch}></BookSearchbar>
                    
                </article>
                
            </section>
            <div className="button-wrapper">
                <Button onClick={closeModal}>Cancel</Button>
                <Button onClick={addBook}>Add Book</Button>
            </div>
        </dialog>

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