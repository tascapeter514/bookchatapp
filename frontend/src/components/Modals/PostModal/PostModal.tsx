import './PostModal.css'
import {  useState, FormEvent, RefObject, useEffect, useRef } from 'react'
import { userContext } from '../../../context/UserContext/UserContext'
import { Data } from '../../../reducers/dataReducer'
import ErrorMessage from '../../Messages/ErrorMessage/ErrorMessage'
import Button from '../../Buttons/Button/Button'
import usePost from '../../../hooks/usePost'


interface Props {
    ref: RefObject<HTMLDialogElement>,
    type: string,
    url: string
}


const PostModal = ({ref, url, type}: Props) => {


    const closeModal = () => ref.current?.close()
    const { bookclubDispatch, bookshelfDispatch } = userContext()
    const { data, makeRequest } = usePost(url)
    const [name, setName] = useState<string>('')
    const prevDataRef = useRef<Data | null>(null)



    useEffect(() => {

        console.log('use post data:', data)
        console.log('use post type:', type)

        if (!data.isLoading && !data.isError && data.data.length > 0) {
            prevDataRef.current = data.data
            if (type === 'bookclub') {
                bookclubDispatch({type: 'ADD_BOOKCLUB', payload: data.data})

            } else if (type === 'bookshelf') {
                console.log('post modal called check')
                bookshelfDispatch({type: 'ADD_BOOKSHELF', payload: data.data})
            }
        }

    }, [data, type, bookclubDispatch])



    const handleSubmit = async (e: FormEvent) => {
        console.log('handle submit called')

        e.preventDefault()

        const request = {
            name: String(name),
        }
        try {
            console.log('before make request')
            await makeRequest(request)

        } catch(err) {
            console.log('error handling submission:', err)
        }

    
    }

    if (data.isLoading) {
        return <div>Loading...</div>
    }

    // console.log('post modal data:', data)

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