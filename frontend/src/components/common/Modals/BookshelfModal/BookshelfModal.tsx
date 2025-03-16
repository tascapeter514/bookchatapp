import './BookshelfModal.css'
import { Ref } from 'react'
import { bookclubData } from '../../Context/BookclubContext/BookclubContext'
import Button from '../../Buttons/Button/Button'



interface BookshelfModalProps {
    bookshelfRef: Ref<HTMLDialogElement>,
    closeBookshelfModal: () => void,
    variant: 'user' | 'bookclub'
}



const BookshelfModal = ({bookshelfRef, closeBookshelfModal}: BookshelfModalProps) => {

    const { addBookshelf, newBkslfId, setBkslfId } = bookclubData()

    return (
        <dialog className="bookshelf-modal" ref={ bookshelfRef } >
            <form action={addBookshelf as unknown as string} method='post'>
                <input 
                    type="text" 
                    name='bookshelfName' 
                    placeholder='Enter a name for your bookshelf'
                    value={newBkslfId}
                    onChange={e => setBkslfId(e.target.value)} 
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