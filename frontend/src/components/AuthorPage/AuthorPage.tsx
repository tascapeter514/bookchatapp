import './AuthorPage.css'
import { FC, useState, useEffect } from 'react'
import {  Author, Book } from '../../types'
import {useParams } from 'react-router-dom'

const AuthorPage: FC = () => {

    console.log('author page check')

    const [author, setAuthor] = useState<Author | null>(null)
    const [books, setBooks] = useState<Book[] | null>(null)
    const params = useParams();

    console.log('author page author:', author)

    useEffect(() => {

        try {

            const socket = new WebSocket(`ws://localhost:8000/ws/author/${params.id}`)

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data)
                if (data.type === 'get_author_data') {
                    console.log('author data on author page:', data)
                    setAuthor(data.author_result)
                    
                   
                }
            }

            socket.onerror = (error) => {
                console.error('Author data websocket error:', error)
            }

            socket.onopen = () => console.log('Author data websocket connected')
            socket.onclose = () => console.log('Author data websocket disconnected')

            return () => socket.close()

        } catch (err) {
            console.log('Failed to initialize authorpage websocket:', err)
        }

    }, [params.id])



    return(

        <div className="authorpage-container">
            <h3>{author?.name}</h3>
            <h2>Hello World</h2>

        </div>

    )

}

export default AuthorPage