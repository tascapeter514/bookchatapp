import Button from '../../Buttons/Button/Button'
import { useRef, Dispatch} from 'react'
import ModalSearchbar from '../../Search/ModalSearchbar/ModalSearchbar'
import { SearchIcon } from '../../Icons'
import { WEBSOCKET_BASE } from '../../../utils/baseAPI'
import ModalButtons from '../../Buttons/ModalButtons/ModalButtons'
import './BookSearchModal.css'


interface Props {
    addBook: () => Promise<void>,
    setNewBook: Dispatch<number>
}


const BookSearchModal = ({addBook, setNewBook}: Props) => {


    const bookSearchRef = useRef<HTMLDialogElement>(null)
    const openModal = () => bookSearchRef.current?.showModal()
    const closeModal = () => bookSearchRef.current?.close()
    
    

    
            
    return (
        <>
            <Button onClick={openModal}>
                <SearchIcon />
            </Button>
            <dialog className='search-books-modal' ref={bookSearchRef}>
                <h3>Add a new title to your bookshelf</h3>
                <hr />
                <ModalSearchbar url={`${WEBSOCKET_BASE}/ws/search/books/`} setNewBook={setNewBook}/>
                <ModalButtons
                    closeModal={closeModal}
                    submitHandler={addBook}
                    submitButtonText='Add Book'
                 />
            </dialog>
        </>
    )
}


export default BookSearchModal
