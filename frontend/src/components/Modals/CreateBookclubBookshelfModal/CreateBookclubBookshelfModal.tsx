import './CreateBookclubBookshelfModal.css'
import { useRef } from 'react'
import { usePostBookshelfMutation } from '../../../slices/bookclubApiSlice'
import { Bookclub } from '../../../types'
import { useState, FormEvent } from 'react'
import Button from '../../Buttons/Button/Button'
import ErrorMessage from '../../Messages/ErrorMessage/ErrorMessage'
import CreateButton from '../../Buttons/CreateButton/CreateButton'
import { handleBookshelfError, BookshelfError } from '../../../utils/errorHandling'


interface Props {
    bookclub: Bookclub
}


const CreateBookclubBookshelfModal = ({bookclub}: Props) => {

    const bookshelfRef = useRef<HTMLDialogElement>(null)
    const [keyword, setKeyword] = useState<string>('')
    const openModal = () => bookshelfRef.current?.showModal()
    const closeModal = () => bookshelfRef.current?.close()
    const [postBookshelf, {isError, error, reset}] = usePostBookshelfMutation()



    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const bookclubId = Number(bookclub.id)

        try {
            const response = await postBookshelf({keyword, bookclubId}).unwrap();
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
            <dialog className="create-bookclub-bookshelf-modal" ref={  bookshelfRef } >
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

export default CreateBookclubBookshelfModal