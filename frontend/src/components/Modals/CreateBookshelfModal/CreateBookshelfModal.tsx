import { handleBookshelfError, BookshelfError } from '../../../utils/errorHandling'
import './CreateBookshelfModal.css'
import ErrorMessage from '../../Messages/ErrorMessage/ErrorMessage'
import { FormEvent, useRef } from 'react'
import CreateButton from '../../Buttons/CreateButton/CreateButton'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '../../Buttons/Button/Button'
import { usePostBookshelfMutation } from '../../../slices/userDataApiSlice'
import { RootState } from '../../../store/store'


const CreateBookshelfModal = () => {


    const bookshelfRef = useRef<HTMLDialogElement>(null)
    const [keyword, setKeyword] = useState<string>('')
    const openModal = () => bookshelfRef.current?.showModal()
    const closeModal = () => bookshelfRef.current?.close()
    const [postBookshelf, {isError, error, reset}] = usePostBookshelfMutation()
    const { user } = useSelector((state: RootState) => state.auth)

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const userId = Number(user.id)

        try {
            const response = await postBookshelf({keyword, userId}).unwrap();
            console.log('create bookshelf response:', response)

            

        } catch(err) {
            console.error(err)
        }

    }

    const handleOnChange = (value: string) => {

        if (isError) reset()
        setKeyword(value)
        
        
    }
    
    

    return(
        <>
            <CreateButton onClick={openModal}>Bookshelf</CreateButton>
            <dialog className="create-bookshelf-modal" ref={  bookshelfRef } >
            {isError && <ErrorMessage>{handleBookshelfError(error as BookshelfError)}</ErrorMessage>}
                <form onSubmit={handleSubmit} method='post'>
                    <input 
                        type="text" 
                        name='itemName'
                        value={keyword}
                        onChange={e => handleOnChange(e.target.value)} 
                        placeholder={`Enter your bookshelf name`}
                        required/>
                    <div className="button-wrapper">
                        <Button type='button' onClick={() => {handleOnChange(''); closeModal()}}>Cancel</Button>
                        <Button type='submit'>Create</Button>
                    </div>
                </form>
            </dialog>
        </>
    )

}

export default CreateBookshelfModal