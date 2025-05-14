import { BookmarkIcon } from '../../Icons'
import { Bookshelf, ActiveUser } from '../../../types'
import { useRef, memo, Dispatch } from 'react'
import Dropdown from '../../Mappers/Dropdown/Dropdown'
import ModalButtons from '../../Buttons/ModalButtons/ModalButtons'
import './AddBookToBookshelfModal.css'

interface Props {
    addBook: () => Promise<void>,
    setBookshelf: Dispatch<number>,
    children?: React.ReactNode,
    bookshelves: Bookshelf[],
    user: ActiveUser
}

const AddBookToBookshelfModal = ({ addBook, setBookshelf, bookshelves, children, user}: Props) => {


    const ref = useRef<HTMLDialogElement>(null)
    const openModal = () => ref.current?.showModal()
    const closeModal = () => ref.current?.close()
  
  
    return(
        <>
            <div className="bookshelf-button-modal">
                <BookmarkIcon onClick={openModal}></BookmarkIcon>
                <span>Add to Bookshelf</span>
            </div>
            <dialog className='bookshelf-dialog' ref={ref}>
                {children}
                <h3>Add this book to your bookshelf</h3>
                    <hr />
                    {user ? 
                        <Dropdown data={bookshelves as Bookshelf[]} dispatch={setBookshelf} dataType='bookshelves'/>
                        : <span>You must be logged in to use this feature</span>}
                <ModalButtons
                    closeModal={closeModal}
                    submitHandler={addBook}
                    submitButtonText='Add Book' 
                />
            </dialog>
        </>
    )

}

export default memo(AddBookToBookshelfModal)