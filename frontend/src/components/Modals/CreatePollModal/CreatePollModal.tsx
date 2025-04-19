import './CreatePollModal.css'
import CreateButton from '../../Buttons/CreateButton/CreateButton'
import Button from '../../Buttons/Button/Button'
import ErrorMessage from '../../Messages/ErrorMessage/ErrorMessage'
import { Book } from '../../../types'
import { useRef } from 'react'


interface Props {
    books: Book[]
}


const CreatePollModal = ({books}: Props) => {

    const pollRef = useRef<HTMLDialogElement>(null)
    const openModal = () => pollRef.current?.showModal()
    const closeModal = () => pollRef.current?.close()

    const renderBookOptions = (book: Book) => {

        return(
            <option key={book.id} value={book.name}>
                {book.name}
            </option>
        )

    }

    return(
        <>
            <CreateButton onClick={openModal}>Poll</CreateButton>
            <dialog className='poll-dialog' ref={pollRef}>
                {books.length >= 3 ? (
                    <>
                       <label>Book One</label>
                        <select id='book-one' name='book-one'>
                            {books.map((renderBookOptions))}
                        </select>
                        <label>Book Two</label>
                        <select id='book-two' name='book-two'>
                            {books.map((renderBookOptions))}
                        </select>
                        <label>Book Three</label>
                        <select id='book-three' name='book-three'>
                            {books.map((renderBookOptions))}
                        </select>
                    </>
                )
                    : (
                        <ErrorMessage>You must add at least three books to your bookshelves.</ErrorMessage>

                    )
                 

                }
                

                <div className="button-wrapper">
                    <Button type='button' onClick={closeModal}>Cancel</Button>
                    <Button type='submit'>Create</Button>
                </div>

            </dialog>



        </>
    )

}

export default CreatePollModal