import CreateButton from '../../Buttons/CreateButton/CreateButton'
import Button from '../../Buttons/Button/Button'
import { useDispatch } from 'react-redux'
import { useAddBookclubMutation } from '../../../slices/userDataApiSlice'
import ErrorMessage from '../../Messages/ErrorMessage/ErrorMessage'
import { FormEvent, useRef, useState } from 'react'
// import { addBookclub as addBookclubToStore } from '../../../slices/userDataSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import './CreateBookclubModal.css'

const CreateBookclubModal = () => {

    const bookclubRef = useRef<HTMLDialogElement>(null)
    // const dispatch = useDispatch()
    const {user} = useSelector((state: RootState) => state.auth)
    const openModal = () => bookclubRef.current?.showModal()
    const closeModal = () =>bookclubRef.current?.close()
    const [bookclubName, setBookclubName] = useState<string>('')
    const [addBookclub] = useAddBookclubMutation()

    // ADD SUBMIT LOGIC
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const userId = user.id

        try {

            const response = await addBookclub({bookclubName, userId}).unwrap()
            console.log('add bookclub response:', response)
            // dispatch(addBookclubToStore ({
            //     ...response
            // }))

        } catch ( err: any) {

            console.log(err?.data?.message || err?.error)

        }

    }

    return(
        <>
            <CreateButton onClick={openModal}>Bookclub</CreateButton>
            <dialog className="create-bookclub-modal" ref={  bookclubRef } >
            {/* {isError && <ErrorMessage>{error}</ErrorMessage>} */}
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name='itemName'
                        value={bookclubName}
                        onChange={e => setBookclubName(e.target.value)} 
                        placeholder={`Enter your bookclub name`}
                        required/>
                    <div className="button-wrapper">
                        <Button type='button' onClick={() => {setBookclubName(''); closeModal()}}>Cancel</Button>
                        <Button type='submit'>Create</Button>
                    </div>
                </form>
            </dialog>

        </>


    )

}

export default CreateBookclubModal