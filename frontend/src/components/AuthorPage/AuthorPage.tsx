
import { useDispatch, useSelector } from 'react-redux'
import Accordion from '../Accordion/Accordion'
import {  useState, useEffect, useRef } from 'react'
import { RootState } from '../../store/store'
import { useGetAuthorMutation } from '../../slices/authorApiSlice'
import {  Author, Book } from '../../types'
import {useParams } from 'react-router-dom'
import './AuthorPage.css'
import { loadAuthor } from '../../slices/authorSlice'




const AuthorPage = () => {


    const {id} = useParams();

    const isMounted = useRef(false)
    const dispatch = useDispatch()
    const [getAuthor, {isLoading, isError, error}] = useGetAuthorMutation()
    const { author } = useSelector((state: RootState) => state.author)


    const handleGetAuthor = async () => {

        try {
            const response = await getAuthor(Number(id))
            console.log('author page response:', response)
            const authorData = {
                id: response.data.id,
                name: response.data.name,
                bio: response.data.bio,
                authorPhoto: response.data.author_photo,
                birthDate: response.data.birth_date,
                deathDate: response.data.death_date,
                books: response.data.books

            }
            dispatch(loadAuthor(authorData))

        } catch(err: any) {
            console.error('Error fetching author data')
        }

    }

    useEffect (() => {

        handleGetAuthor()

        // if (!isMounted.current) {
        //     isMounted.current = true;
        // } else {
        //     handleGetAuthor()
        // }

    }, [id])

    // const [author, setAuthor] = useState<Author | null>(null)
    // const [books, setBooks] = useState<Book[] | null>(null)
    


    const bookElements = author.books?.map((book: Book) => {
        return(
            <li key={book.name} className='book-item'>
                <img src={book.imageLinks.thumbnail} alt="book-thumbnail" className='book-thumbnail' />
                <span className='book-title'>{book.name}</span>
            </li>
        )
    })


    console.log('author page author:', author)
    return(

        <div className="authorpage-container">
            
                <div className="authorpage-detail">
                    <div className="top-facade">
                        <div className="author-header-wrapper">
                            
                                <img src={author.authorPhoto} alt="" className="author-cover" />

                           
                            <article className="author-info-wrapper">
                                <h1>{author.name}</h1>
                                <p>Born on <span>{author.birthDate}</span></p>
                                <p>Died on <span>{author.deathDate}</span></p>
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

                                {author.books && author.books.length <= 6 ? (
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
            

        </div>

    )

}

export default AuthorPage