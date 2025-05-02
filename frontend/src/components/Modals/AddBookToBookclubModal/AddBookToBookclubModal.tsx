import { useRef } from 'react'
import './AddBookToBookclubModal.css'
import Button from '../../Buttons/Button/Button'



const AddBookToBookclubModal = () => {

    const modalRef = useRef<HTMLDialogElement>(null)
    const openModal = () => modalRef.current?.showModal()
    const closeModal = () => modalRef.current?.close()

    return(
        <>
            <button
                onClick={openModal}
                className='add-book-to-bookClub-btn'
            >
                Add to Bookclub
            </button>
            <dialog className='add-book-to-bookclub-dialog'ref={modalRef}>
                <h3>Add this book to your bookclub</h3>
                <hr />
                    <main className="bookclub-results-content">
                        <div className="suggested-search-results">
                            
                            
                            
                        </div>
                       
                    </main>
               
                
                <div className="button-wrapper">
                    <Button onClick={closeModal}>Cancel</Button>
                    <Button>Add</Button>
                </div>

            </dialog>

        </>


    )
}

export default AddBookToBookclubModal



{/* <aside className='bookclub-bookshelves'>
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
</aside> */}



