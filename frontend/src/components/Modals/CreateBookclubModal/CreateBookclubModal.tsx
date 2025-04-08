import CreateButton from '../../Buttons/CreateButton/CreateButton'
import Button from '../../Buttons/Button/Button'
import { FormEvent, useRef, useState } from 'react'
import './CreateBookclubModal.css'

const CreateBookclubModal = () => {

    const bookclubRef = useRef<HTMLDialogElement>(null)
    const openModal = () => bookclubRef.current?.showModal()
    const closeModal = () =>bookclubRef.current?.close()
    const [bookclubName, setBookclubName] = useState<string>('')

    // ADD SUBMIT LOGIC
    const handleSubmit = (e: FormEvent) => console.log('event:', e)

    return(
        <>
            <CreateButton onClick={openModal}>Bookclub</CreateButton>
            <dialog className="create-bookclub-modal" ref={  bookclubRef } >
            {/* {data.isError && <ErrorMessage>{data.error}</ErrorMessage>} */}
                <form onSubmit={handleSubmit} method='post'>
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