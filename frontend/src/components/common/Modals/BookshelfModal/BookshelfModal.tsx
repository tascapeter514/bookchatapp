import './BookshelfModal.css'
import { Ref } from 'react'
import Button from '../../Buttons/Button/Button'



interface BookshelfModalProps {
    bookshelfRef: Ref<HTMLDialogElement>,
    closeBookshelfModal: () => void,
    createBookshelf: (formData: FormData) => Promise<void>
}



const BookshelfModal = ({bookshelfRef, closeBookshelfModal, createBookshelf}: BookshelfModalProps) => {

    return (
        <dialog className="bookshelf-modal" ref={ bookshelfRef } >
            <form action={createBookshelf as unknown as string} method='post'>
                <input type="text" name='bookshelfName' placeholder='Bookshelf Name' required/>
                <div className="button-wrapper">
                    <Button onClick={closeBookshelfModal}>Cancel</Button>
                    <Button type='submit'>Create</Button>
                </div>
            </form>
        </dialog>

    )

}

export default BookshelfModal