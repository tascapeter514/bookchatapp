import './CreateBookshelf.css'
import { Ref, Dispatch, SetStateAction } from 'react'
import Button from '../../Buttons/Button/Button'
import { userData } from '../../Context/UserContext/UserContext'



interface Props {
    bookshelfRef: Ref<HTMLDialogElement>,
    closeBookshelfModal: () => void,
}



const BookshelfModal = ({bookshelfRef, closeBookshelfModal}: Props) => {

    const { activeUser } = userData()
    

    return (
        <dialog className="createBookshelf" ref={ bookshelfRef } >
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