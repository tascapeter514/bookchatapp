import './CreatePollModal.css'
import CreateButton from '../../Buttons/CreateButton/CreateButton'
import Button from '../../Buttons/Button/Button'
import {  handlePollError, PollError } from '../../../utils/errorHandling'
import ErrorMessage from '../../Messages/ErrorMessage/ErrorMessage'
import { Book } from '../../../types'
import { selectBookOne, selectBookTwo, selectBookThree } from '../../../slices/pollSlice'
import { useCreatePollMutation } from '../../../slices/pollApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useRef, ChangeEvent } from 'react'
import { RootState } from '../../../store/store'


interface Props {
    books: Book[],
    bookclubId: number
}



const CreatePollModal = ({books, bookclubId}: Props) => {

    const pollRef = useRef<HTMLDialogElement>(null)
    const openModal = () => pollRef.current?.showModal()
    const closeModal = () => pollRef.current?.close()
    const { poll } = useSelector((state: RootState) => state.poll)
    const dispatch = useDispatch()
    const [createPoll, {isLoading, isError, error}] = useCreatePollMutation()
    
    const handleChangeBooks = (event: ChangeEvent<HTMLSelectElement>) => {
        console.log('event:', event)
        
        const bookId = Number(event.target.value);
        const bookName = event.target.selectedOptions[0].getAttribute('data-name')
        const inputName = event.target.name
        console.log('book id:', bookId)
        console.log('book name:', bookName)
        console.log('select name:', event.target.name)

        if (bookId && bookName && inputName === 'book-one') {
            dispatch(selectBookOne({id: bookId, name: bookName}))
        } else if (bookId && bookName && inputName === 'book-two') {
            dispatch(selectBookTwo({id: bookId, name: bookName}))
        } else if (bookId && bookName && inputName === 'book-three') {
            dispatch(selectBookThree({id: bookId, name: bookName}))
        }
    }

    const renderBookOptions = (book: Book) => {

        

        return(
            <option key={book.id} value={book.id} data-name={book.name}>
                {book.name}
            </option>
        )

    }

    const handleCreatePoll = () => {

        const data = {
            bookOne: poll.bookOne,
            bookTwo: poll.bookTwo,
            bookThree: poll.bookThree,
            bookclubId: bookclubId
        }

        try {

            const response = createPoll(data).unwrap()

            console.log('poll response:', response)

            

        } catch (err: any) {

            console.error(err)

        }  
    }

    console.log('poll state:', poll)

    const closeDialog = () => {
        closeModal()
        dispatch(selectBookOne({id: NaN, name: ''}))
        dispatch(selectBookTwo({id: NaN, name: ''}))
        dispatch(selectBookThree({id: NaN, name: ''}))
    }

    return(
        <>
            <CreateButton onClick={openModal}>Poll</CreateButton>
            <dialog className='poll-dialog' ref={pollRef}>
            {isError && <ErrorMessage>{handlePollError(error as PollError)}</ErrorMessage>}
                {books.length >= 3 ? (
                    <>
                       <label>Book One</label>
                        <select id='book-one' name='book-one' onChange={handleChangeBooks}>
                            {books.map((renderBookOptions))}
                        </select>
                        <label>Book Two</label>
                        <select id='book-two' name='book-two' onChange={handleChangeBooks}>
                            {books.map((renderBookOptions))}
                        </select>
                        <label>Book Three</label>
                        <select id='book-three' name='book-three' onChange={handleChangeBooks}>
                            {books.map((renderBookOptions))}
                        </select>
                    </>
                )
                    : (
                        <ErrorMessage>You must add at least three books to your bookshelves.</ErrorMessage>

                    )
                 

                }
                
                <div className="button-wrapper">
                    <Button type='button' onClick={closeDialog}>Cancel</Button>
                    <Button type='submit' onClick={handleCreatePoll}>Create</Button>
                </div>

            </dialog>



        </>
    )

}

export default CreatePollModal