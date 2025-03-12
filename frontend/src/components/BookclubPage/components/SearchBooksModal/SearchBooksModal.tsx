import Button from '../../../common/Buttons/Button/Button'
import { Ref } from 'react'
import './SearchBooksModal.css'


interface SearchBooksModalProps {
    closeModal: () => void,
    modalRef: Ref<HTMLDialogElement>,
}



const SearchBooksModal = ({closeModal, modalRef}: SearchBooksModalProps) => {

    const addBook = () => {
        return(

            console.log('add book button check')

        )
    }


    return (
        <dialog className='search-books-modal' ref={modalRef}>
            <h3>Add a new title to your bookclub</h3>
            <hr />
            <section className='invite-user-content'>
            </section>
            <div className="button-wrapper">
                <Button onClick={closeModal}>Cancel</Button>
                <Button onClick={addBook}>Add Book</Button>
            </div>
        </dialog>

    )
}

export default SearchBooksModal