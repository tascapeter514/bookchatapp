
import './CreateBookshelfModal.css'
import { FormEvent, useRef } from 'react'
import CreateButton from '../../Buttons/CreateButton/CreateButton'
import { useState } from 'react'
import Button from '../../Buttons/Button/Button'


const CreateBookshelfModal = () => {


    const bookshelfRef = useRef<HTMLDialogElement>(null)
    const [bookshelfName, setBookshelfName] = useState<string>()
    const openModal = () => bookshelfRef.current?.showModal()
    const closeModal = () => bookshelfRef.current?.close()
    const handleSubmit = (e: FormEvent) => console.log(e)
    
    

    return(
        <>
            <CreateButton onClick={openModal}>Bookshelf</CreateButton>
            <dialog className="create-bookshelf-modal" ref={  bookshelfRef } >
            {/* {data.isError && <ErrorMessage>{data.error}</ErrorMessage>} */}
                <form onSubmit={handleSubmit} method='post'>
                    <input 
                        type="text" 
                        name='itemName'
                        value={bookshelfName}
                        onChange={e => setBookshelfName(e.target.value)} 
                        placeholder={`Enter your bookshelf name`}
                        required/>
                    <div className="button-wrapper">
                        <Button type='button' onClick={() => {setBookshelfName(''); closeModal()}}>Cancel</Button>
                        <Button type='submit'>Create</Button>
                    </div>
                </form>
            </dialog>
        </>
    )

}

export default CreateBookshelfModal