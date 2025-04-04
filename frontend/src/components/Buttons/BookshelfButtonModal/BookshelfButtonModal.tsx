import { BookmarkIcon } from '../../Icons'
// import AddBook from '../../Modals/AddBook/AddBook'
import { useRef } from 'react'
import './BookshelfButtonModal.css'



const BookshelfButtonModal = () => {


    const addBookRef = useRef<HTMLDialogElement>(null)
    const openModal = () => addBookRef.current?.showModal()

    return(
        <>
            <div className="bookshelf-button-modal">
                <BookmarkIcon onClick={openModal}></BookmarkIcon>
                <span>Add to Bookshelf</span>
            </div>
            {/* <AddBook addBookRef={addBookRef} book={book}/> */}
        </>

    )

}

export default BookshelfButtonModal