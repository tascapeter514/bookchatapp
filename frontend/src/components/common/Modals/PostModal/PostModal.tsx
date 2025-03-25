import './PostModal.css'
import { Ref,  useState, FormEvent, Dispatch, SetStateAction, RefObject } from 'react'
import Button from '../../Buttons/Button/Button'
import { userContext } from '../../Context/UserContext/UserContext'
import { Bookclub, Bookshelf } from '../../../../types'
import usePost from '../../hooks/usePost'


interface Props {
    ref: RefObject<HTMLDialogElement>,
    setResults: Dispatch<SetStateAction<Bookclub[]>> | Dispatch<SetStateAction<Bookshelf[]>>
}


const PostModal = ({ref, setResults}: Props) => {

    const {activeUser} = userContext()
    const closeModal = () => ref.current?.close()
    const { makeRequest, loading, error } = usePost(`http://localhost:8000/api/user/addBookclub/${activeUser.id}`)
    const [name, setName] = useState<string>('')



    const handleSubmit = async (e: FormEvent) => {

        e.preventDefault()

        const request = {
            name: String(name),
        }
        try {
            const newItem = await makeRequest(request)

            console.log('new item:', newItem)
            setResults((prev: Bookclub[] | Bookshelf[]) => [...prev, newItem])
            
            
            

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

    return (
        <dialog className="post-modal" ref={  ref } >
            <form onSubmit={handleSubmit} method='post'>
                <input 
                    type="text" 
                    name='itemName'
                    value={name}
                    onChange={e => setName(e.target.value)} 
                    placeholder='Enter a name'
                    required/>
                <div className="button-wrapper">
                    <Button type='button' onClick={() => {setName(''); closeModal()}}>Cancel</Button>
                    <Button type='submit'>Create</Button>
                </div>
            </form>
        </dialog>
    )

}

export default PostModal