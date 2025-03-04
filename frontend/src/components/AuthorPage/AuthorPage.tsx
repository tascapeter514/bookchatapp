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


    useEffect( () => {

        const fetchAuthorData = async () => {
            try {

                const response = await fetch(`http://localhost:8000/api/author/${params.id}`)
    
                if (response.ok) {
                    const data = await response.json()
                    const {titles, ...author_results} = data

                    setBooks(titles)
                    setAuthor(author_results)

                
                } else {
                    console.error('There was an error fetching author data:', response.statusText)
                }
    
    
            } catch(err) {
                console.error('There was an error connecting to the backend:', err)
            }

        }

        fetchAuthorData()

        

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
                                    
                                    {bookElements}

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