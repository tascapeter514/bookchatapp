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
    const { makeRequest, loading, error } = useAddBookclub(`http://localhost:8000/api/user/addBookclub/${activeUser.id}`)
    const [name, setName] = useState<string>('')



    const handleSubmit = async (e: FormEvent) => {

        e.preventDefault()

        const bookclubRequest = {
            bookclubId: uuidv4(),
            bookclubName: String(name),
        }
        try {
            const newBookclub = await makeRequest(bookclubRequest)

            console.log('new bookclub:', newBookclub)
            setUserBookclubs(prev => [...prev, newBookclub])
            
            
            

        } catch(err) {
            console.log('error handling submission:', err)
        }

    
    }

    if (error) {
        return <div>An error occurred: {error}</div>
    }

    if (loading) {
        return <div>Loading...</div>
    }

    // console.log('bookshelf modal hook data:', data)

    
    

    return (
        <dialog className="bookclub-modal" ref={  bookclubfRef } >
            <form onSubmit={handleSubmit} method='post'>
                <input 
                    type="text" 
                    name='bookclubName'
                    value={name}
                    onChange={e => setName(e.target.value)} 
                    placeholder='Enter a name for your bookclub'
                    required/>
                <div className="button-wrapper">
                    <Button type='button' onClick={() => {setName(''); closeBookclubModal()}}>Cancel</Button>
                    <Button type='submit'>Create</Button>
                </div>
            </form>
        </dialog>

    )

    

}

export default BookclubModal