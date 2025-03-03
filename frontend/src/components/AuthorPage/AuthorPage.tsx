import './AuthorPage.css'
import { FC, useState, useEffect } from 'react'
import {  Author, Book } from '../../types'
import {useParams } from 'react-router-dom'
import Accordion from '../common/Accordion/Accordion'

const AuthorPage: FC = () => {

    const [author, setAuthor] = useState<Author | null>(null)
    const [books, setBooks] = useState<Book[] | null>(null)
    const params = useParams();


    const bookElements = books?.map((book) => {
        return(
            <li key={book.title_id} className='book-item'>
                <img src={book.imageLinks.thumbnail} alt="book-thumbnail" className='book-thumbnail' />
                <span className='book-title'>{book.title}</span>
            </li>
        )
    })





    useEffect(() => {

        try {

            const socket = new WebSocket(`ws://localhost:8000/ws/author/${params.id}`)

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data)
                if (data.type === 'get_author_data') {
                    console.log('author data on author page:', data)
                    console.log('data book result:', data.book_result)

                    const {titles, ...author_result} = data.author_result


                    setAuthor(author_result)
                    setBooks(titles)
                    
                   
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
                    
                    <div className="authorpage-main-content">
                        
                        <div className="author-books-container">
                            <hr />
                            <h3>Books by {author.name}</h3>

                                {books && books.length <= 6 ? (
                                    <ul className='author-book-list'>
                                    
                                    bookElements

                                    </ul>
                                    

                                ) : (
                                    <Accordion>
                                        <ul className="author-book-list">{bookElements}</ul>
                                    </Accordion>

                                )}
                                
                            


                        </div>
                    </div>
                </div>
            ) : <h2>Loading...</h2>}

        </div>

    )

}

export default AuthorPage