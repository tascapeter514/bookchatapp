import './AuthorPage.css'
import { FC, useState, useEffect } from 'react'
import {  Author, Book } from '../../types'
import {useParams } from 'react-router-dom'
import Accordion from '../common/Accordion/Accordion'

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
            {author ? (
                <div className="authorpage-detail">
                    <div className="top-facade">
                        <div className="author-header-wrapper">
                            
                                <img src={author.author_photo} alt="" className="author-cover" />

                           
                            <article className="author-info-wrapper">
                                <h1>{author.name}</h1>
                                <p>Born on <span>{author.birth_date}</span></p>
                                <p>Died on <span>{author.death_date}</span></p>
                                <hr />
                                <h3>ABOUT THE AUTHOR </h3>
                                
                                <Accordion>{author.bio}</Accordion>
                                <hr />
                            </article>
                        </div>
                    </div>
                    
                    <div className="main-content">
                        <div className="author-book-list">

                        </div>
                    </div>
                </div>
            ) : <h2>Loading...</h2>}

        </div>

    )

}

export default AuthorPage