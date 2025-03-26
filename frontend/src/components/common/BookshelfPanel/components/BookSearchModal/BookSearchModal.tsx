import Button from '../../../Buttons/Button/Button'
import { RefObject, useState } from 'react'
import { userContext } from '../../../Context/UserContext/UserContext'
import usePost from '../../../hooks/usePost'
import BookSearchbar from './BookSearchbar/BookSearchbar'
import './BookSearchModal.css'


interface Props {
    ref: RefObject<HTMLDialogElement>,
}



const BookSearchModal = ({ ref }: Props) => {

    const closeModal = () => ref.current?.close()
    const { activeUser, setUserData } = userContext()
    const [newBook, setNewBook] = useState<number>(NaN)
    const {makeRequest, loading, error} = usePost(`http://localhost:8000/api/user/${activeUser.id}`)
    
    



    return (
        <dialog className='search-books-modal' ref={ref}>
            <h3>Add a new title to your bookshelf</h3>
            <hr />
            <section className='search-books-content'>
                
                <article className='suggested-book-list'>
                    <BookSearchbar></BookSearchbar>
                    
                </article>
                
            </section>
            <div className="button-wrapper">
                <Button onClick={closeModal}>Cancel</Button>
                <Button >Add Book</Button>
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