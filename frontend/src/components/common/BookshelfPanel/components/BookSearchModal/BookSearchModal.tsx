import Button from '../../../Buttons/Button/Button'
import { RefObject } from 'react'
import BookSearchbar from './BookSearchbar/BookSearchbar'
import './BookSearchModal.css'


interface Props {
    ref: RefObject<HTMLDialogElement>,
}



const BookSearchModal = ({ ref }: Props) => {

    
    console.log('booksearch ref:', ref)
    // const { searchBooksRef, closeSearchBooks, addBook } = bookshelfData()
    // const [bookResults, setBookResults] = useState<Book[]>([])
    // const [newBookId, setNewBookId] = useState('')
    // const [currBkslfId, setCurrBkslfId] = useState<string>('')
    const closeModal = () => ref.current?.close()
        
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