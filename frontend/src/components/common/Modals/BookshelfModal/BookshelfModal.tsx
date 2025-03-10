import './BookshelfModal.css'
import { Ref, SetStateAction, Dispatch, ChangeEvent } from 'react'
import Button from '../../Buttons/Button/Button'



interface BookshelfModalProps {
    bookshelfRef: Ref<HTMLDialogElement>,
    newBookshelf: string,
    closeBookshelfModal: () => void,
    addBookshelf: (formData: FormData) => Promise<void>,
    handleNewBookshelf: (e: string ) => void
}



const BookshelfModal = ({bookshelfRef, newBookshelf, closeBookshelfModal, addBookshelf, handleNewBookshelf}: BookshelfModalProps) => {

    return (
        <dialog className="bookshelf-modal" ref={ bookshelfRef } >
            <form action={addBookshelf as unknown as string} method='post'>
                <input 
                    type="text" 
                    name='bookshelfName' 
                    placeholder='Enter a name for your bookshelf'
                    value={newBookshelf}
                    onChange={e => handleNewBookshelf(e.target.value)} 
                    required/>
                <div className="button-wrapper">
                    <Button onClick={closeBookshelfModal}>Cancel</Button>
                    <Button type='submit'>Create</Button>
                </div>
            </form>
        </dialog>

    )

}

export default BookshelfModal