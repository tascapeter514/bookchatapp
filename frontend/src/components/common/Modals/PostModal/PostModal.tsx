import './PostModal.css'
import {  useState, FormEvent, RefObject } from 'react'
import { userContext } from '../../Context/UserContext/UserContext'
import ErrorMessage from '../../../Messages/ErrorMessage/ErrorMessage'
import Button from '../../Buttons/Button/Button'
import usePost from '../../hooks/usePost'


interface Props {
    ref: RefObject<HTMLDialogElement>,
    type: 'bookshelf' | 'bookclub',
    url: string
}


const PostModal = ({ref, url, type}: Props) => {


    const closeModal = () => ref.current?.close()
    const { bookclubDispatch, bookshelfDispatch } = userContext()
    const { data, makeRequest } = usePost(url)
    const [name, setName] = useState<string>('')



    const handleSubmit = async (e: FormEvent) => {
        console.log('handle submit called')

        e.preventDefault()

        const request = {
            name: String(name),
        }
        try {
            console.log('before make request')
            await makeRequest(request)

            if (!data.isLoading && !data.isError && !data.data.type) {
                console.log('no new item')
            }

            if (type === 'bookclub' && newItem) {
                bookclubDispatch({type: 'ADD_BOOKCLUB', payload: newItem})
            }

            if (type === 'bookshelf' && newItem) {
                bookshelfDispatch({type: 'ADD_BOOKSHELF', payload: newItem})
            }
        
            
        } catch(err) {
            console.log('error handling submission:', err)
        }

    
    }

    if (data.isLoading) {
        return <div>Loading...</div>
    }
    // console.log('post modal error:', error)
    return (
        <dialog className="post-modal" ref={  ref } >
            {data.isError && <ErrorMessage>{data.error}</ErrorMessage>}
            <form onSubmit={handleSubmit} method='post'>
                <input 
                    type="text" 
                    name='itemName'
                    value={name}
                    onChange={e => setName(e.target.value)} 
                    placeholder={`Enter your ${type} name`}
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