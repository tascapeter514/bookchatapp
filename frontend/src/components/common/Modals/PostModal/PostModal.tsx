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
    console.log('post modal rendered')

    const closeModal = () => ref.current?.close()
    const { setUserData } = userContext()
    const { makeRequest, loading, error } = usePost(url)
    const [name, setName] = useState<string>('')



    const handleSubmit = async (e: FormEvent) => {
        console.log('handle submit called')

        e.preventDefault()

        const request = {
            name: String(name),
        }
        try {
            console.log('before make request')
            const newItem = await makeRequest(request)

            if (!newItem) {
                console.log('no new item')
            }
            console.log('after make request')

            console.log('new item:', newItem)
            setUserData(prevData => 
                prevData.map(data =>
                    data.type === type
                    ? {...data, items: [...data.items, newItem]}
                    : data
                )
            )
            
        } catch(err) {
            console.log('error handling submission:', err)
        }

    
    }

    if (loading) {
        return <div>Loading...</div>
    }
    console.log('post modal error:', error)
    return (
        <dialog className="post-modal" ref={  ref } >
            {error && <ErrorMessage>{error}</ErrorMessage>}
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