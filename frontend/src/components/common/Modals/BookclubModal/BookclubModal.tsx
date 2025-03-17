import './BookclubModal.css'
import { Ref,  useState, FormEvent } from 'react'
import Button from '../../Buttons/Button/Button'
import { userData } from '../../Context/UserContext/UserContext'
import { v4 as uuidv4 } from 'uuid'
import useAddBookclub from '../../hooks/useAddBookclub'


interface BookclubModalProps {
    bookclubfRef: Ref<HTMLDialogElement>,
    closeBookclubModal: () => void
}


const BookclubModal = ({bookclubfRef, closeBookclubModal}: BookclubModalProps) => {

    const { activeUser, setUserBookclubs } = userData()
    const { makeRequest, loading, error, data } = useAddBookclub(`http://localhost:8000/api/user/addBookclub/${activeUser.id}`)
    const [name, setName] = useState<string>('')

    const handleSubmit = async (event: FormEvent<HTMLInputElement>) => {
        
        console.log('bookclub modal event:', event)
        // console.log('bookclub name:', name)


        // const bookclubRequest = {
        //     bookclubId: uuidv4(),
        //     bookclubName: formData.get('bookclubName'),
        //     administratorId: Number(activeUser.id)
        // }


        // const response = await makeRequest(bookclubRequest)







    }

    if (error) {
        return <div>An error occurred: {error.message}</div>
    }

    if (loading) {
        return <div>Loading...</div>
    }
    

    return (
        <dialog className="bookclub-modal" ref={  bookclubfRef } >
            <form action={handleSubmit as any} method='post'>
                <input 
                    type="text" 
                    name='bookclubName' 
                    placeholder='Enter a name for your bookclub'
                    required/>
                <div className="button-wrapper">
                    <Button type='button' onClick={closeBookclubModal}>Cancel</Button>
                    <Button type='submit'>Create</Button>
                </div>
            </form>
        </dialog>

    )

    

}

export default BookclubModal