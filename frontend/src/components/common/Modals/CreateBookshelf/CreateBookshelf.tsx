import './CreateBookshelf.css'
import { Ref, Dispatch, SetStateAction } from 'react'
import Button from '../../Buttons/Button/Button'
import { userContext } from '../../Context/UserContext/UserContext'



interface BookshelfModalProps {
    bookshelfRef: Ref<HTMLDialogElement>,
    closeBookshelfModal: () => void,
    addBookshelf: (formData: FormData) => Promise<void>,
    newBkslfId: string,
    setBkslfId: Dispatch<SetStateAction<string>>
}



const BookshelfModal = ({bookshelfRef, closeBookshelfModal, addBookshelf, newBkslfId, setBkslfId}: BookshelfModalProps) => {

    const { activeUser } = userContext()
    

    return (
        <dialog className="bookshelf-modal" ref={ bookshelfRef } >
            <form action={addBookshelf as unknown as string} method='post'>
            <input type="hidden" name='userId' value={activeUser.id} />
                <input 
                    type="text" 
                    name='bookshelfName' 
                    placeholder='Enter a name for your bookshelf'
                    value={newBkslfId}
                    onChange={e => setBkslfId(e.target.value)} 
                    required/>
                <div className="button-wrapper">
                    <Button type='button' onClick={closeBookshelfModal}>Cancel</Button>
                    <Button type='submit'>Create</Button>
                </div>
            </form>
        </dialog>

    )

}

export default BookshelfModal