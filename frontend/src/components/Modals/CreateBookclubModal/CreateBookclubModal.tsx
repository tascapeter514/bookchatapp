import CreateButton from '../../Buttons/CreateButton/CreateButton'
import Button from '../../Buttons/Button/Button'
import { usePostBookclubMutation } from '../../../slices/userDataApiSlice'
import { handleBookclubError, BookclubError } from '../../../utils/errorHandling'
import ErrorMessage from '../../Messages/ErrorMessage/ErrorMessage'
import { ChangeEvent, FormEvent, useRef, useState } from 'react'
// import { addBookclub as addBookclubToStore } from '../../../slices/userDataSlice'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import './CreateBookclubModal.css'

const CreateBookclubModal = () => {

    const bookclubRef = useRef<HTMLDialogElement>(null)
    const {user} = useSelector((state: RootState) => state.auth)
    const openModal = () => bookclubRef.current?.showModal()
    const closeModal = () =>bookclubRef.current?.close()
    const [keyword, setKeyword] = useState<string>('')
    const [addBookclub, {isError, error, reset}] = usePostBookclubMutation()


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const userId = user.id

        try {

            const response = await addBookclub({keyword, userId}).unwrap()
            console.log('add bookclub response:', response)


        } catch ( err: any) {
            console.error('create bookclub error:', err)
            console.log('logging error:', err)
            console.log(err?.data?.message || err?.error)

        }

    }

    const handleOnChange = (value: string) => {
        if (isError) reset()
        setKeyword(value)
    }

    return(
        <>
            <CreateButton onClick={openModal}>Bookclub</CreateButton>
            <dialog className="create-bookclub-modal" ref={  bookclubRef } >
            {isError && <ErrorMessage>{handleBookclubError(error as BookclubError)}</ErrorMessage>}
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name='itemName'
                        value={keyword}
                        onChange={e => handleOnChange(e.target.value)} 
                        placeholder={`Enter your bookclub name`}
                        required/>
                    <div className="button-wrapper">
                        <Button type='button' onClick={() => {setKeyword(''); closeModal()}}>Cancel</Button>
                        <Button type='submit'>Create</Button>
                    </div>
                </form>
            </dialog>

        </>


    )

}

export default CreateBookclubModal