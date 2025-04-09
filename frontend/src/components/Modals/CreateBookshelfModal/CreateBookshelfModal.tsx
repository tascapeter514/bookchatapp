
import './CreateBookshelfModal.css'
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
    const [postBookshelf] = usePostBookshelfMutation()
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
    
    

    return(
        <>
            <CreateButton onClick={openModal}>Bookshelf</CreateButton>
            <dialog className="create-bookshelf-modal" ref={  bookshelfRef } >
            {/* {data.isError && <ErrorMessage>{data.error}</ErrorMessage>} */}
                <form onSubmit={handleSubmit} method='post'>
                    <input 
                        type="text" 
                        name='itemName'
                        value={keyword}
                        onChange={e => setKeyword(e.target.value)} 
                        placeholder={`Enter your bookshelf name`}
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

export default CreateBookshelfModal