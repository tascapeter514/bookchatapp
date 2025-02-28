import {useState, useEffect, FC, useRef} from 'react'
import {useParams, Link } from 'react-router-dom'
import { userData } from '../common/UserContext'
import { Book, ISBN_Identifier, Bookshelf, ActiveUser, Author, Bookclub, SearchResultsArray } from '../../types'
import { BsBookmarkPlus } from "react-icons/bs"
import  BookclubSearchbar  from './components/BookclubSearchbar/BookclubSearchbar'
import BookclubSearchResults from './components/BookclubSearchbar/BookclubSearchResults'
import './Bookpage.css'



type IconProps = React.ComponentPropsWithoutRef<'svg'>

const BookmarkIcon: FC<IconProps> = (props) => {
    return  <BsBookmarkPlus className='bookmark-icon' {...props}></BsBookmarkPlus>
}


const Bookpage: React.FC = () => {



   
    const params = useParams();
    const [book, setBook] = useState<Book | null>(null);
    const [authors, setAuthors] = useState<Author[] | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [bookclubSearchResults, setBookclubSearchResults] = useState<Bookclub[]>([])
    const [currentBookclub, setCurrentBookclub] = useState<Bookclub | null>(null)
    const [currentBookshelf, setCurrentBookshelf] = useState<Bookshelf | null>(null)
    const { activeUser } = userData()
    const modalRef = useRef<HTMLDialogElement>(null)

   

    
    useEffect(() => {

        try {

            const socket = new WebSocket(`ws://localhost:8000/ws/book/${params.id}`)

            socket.onmessage = (event) => {
                const data = JSON.parse(event.data)
                if (data.type === 'get_book_data') {

                    const { authors, ...book_result } = data.book_result
                    console.log('author data:', authors)
                    setBook(book_result)
                    setAuthors(authors)
                    console.log(book_result)
                }
            }

            socket.onerror = (error) => {
                console.error('Book data websocket error:', error)
            }

            socket.onopen = () => console.log('Book data websocket connected')
            socket.onclose = () => console.log('Book data websocket disconnected')

            return () => socket.close()

        } catch (err) {
            console.log('Failed to initialize bookpage websocket:', err)
        }

    }, [params.id])





    function addToBookshelf(formData: FormData) {
        console.log('form data:', formData)
        const bookshelf_id = formData.get('bookshelfRadio')
        console.log('bookshelf id:', bookshelf_id)

        const bookshelfRequest = {
            title_id: book?.title_id,

        } 
        try {
            fetch(`http://localhost:8000/api/bookshelf/${bookshelf_id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookshelfRequest)
            })

        } catch(err) {
            console.error('Error adding book to bookshelf')
        }
    }

    // console.log('bookpage parameters:', params)

    const openModal = () => {
        setIsModalOpen(true)

        modalRef.current?.showModal()
        
    }

    const closeModal = () => {
        setIsModalOpen(false)
        modalRef.current?.close()
    }

    const showBookshelves = (bookclub_id: string) => {
        console.log('bookclub id check:', bookclub_id)
        const selectedBookclub = bookclubSearchResults.find((bookclub: Bookclub) => bookclub.bookclub_id === bookclub_id) || null
        console.log('selected bookclub:', selectedBookclub)
        setCurrentBookclub(selectedBookclub)
    }


    
    return(
        
        <div className='bookpage-container'>
            {book ? (
                <div className="bookpage-detail">
                    <div className="top-facade">
                        <div className="book-header-wrapper">
                            <div className="book-details">
                                <img className='book-cover' src={book.imageLinks['thumbnail']} alt="" />
                               <div className="bookshelfBtn-wrapper">
                                   <BookmarkIcon></BookmarkIcon>
                                    <span>Add to Bookshelf</span>
                               </div>
                              
                            
                            </div>
                            <article className="book-info-wrapper">
                                <h1>{book.title}</h1>
                                <h3>By <span>{authors?.[0]['name']} </span></h3>
                                <p>Category: <Link to='#' >{book.genres.genre_name}</Link></p>
                                <button
                                    onClick={openModal} 
                                    
                                    className='add-to-bookClubBtn'>Add to Bookclub</button>
                            </article>
                            <dialog className={`addToBookclub-modal ${isModalOpen ? 'show' : ''}`} ref={modalRef}>
                                <h3>Add this book to your bookclub</h3>
                                <hr />
                                    <main className="bookclub-results-content">
                                        <div className="suggested-search-results">
                                            <BookclubSearchbar
                                            setBookclubSearchResults={setBookclubSearchResults}
                                            setSearchValue={setSearchValue}
                                            searchValue={searchValue}
                                            isModalOpen={isModalOpen}
                                            ></BookclubSearchbar>
                                            <h3>Suggested</h3>
                                            <BookclubSearchResults
                                            showBookshelves={showBookshelves}
                                            bookclubSearchResults={bookclubSearchResults}></BookclubSearchResults>
                                        </div>
                                        <aside className='bookclub-bookshelves'>
                                            {currentBookclub  ? 
                                                currentBookclub.bookshelves.length > 0 ? (
                                                    currentBookclub.bookshelves.map((bookshelf, index) => {
                                                        {return <li key={index} className='bookshelf-result'>
                                                            <label htmlFor={bookshelf.name}>{bookshelf.name}</label>
                                                            <input 
                                                                type="radio" 
                                                                className='bookshelf-input' 
                                                                id={bookshelf.name}
                                                                name='bookshelfGroup'
                                                                checked={currentBookshelf?.bookshelf_id === bookshelf.bookshelf_id} 
                                                                onClick={() => setCurrentBookshelf(bookshelf)}/>
                                                        </li> }
                                                    })
                                                ) : (<span>No bookshelves for this bookclub</span>)
                                                : 'No Bookclub Selected'}
                                        </aside>
                                    </main>
                               
                                
                                <div className="button-wrapper">
                                    <button onClick={closeModal}>Cancel</button>
                                    <button>Add</button>
                                </div>

                            </dialog>
                        </div>
                    </div>
                    
                    <div className="main-content">
                        <div className="book-description">
                            <hr />
                            <h3>About {book.title}</h3>
                            <p>{book.description}</p>
                           
                        </div>
                        <div className="author-product-container">
                            <aside className='author-details'>
                                <hr />
                                <h3>About {authors[0].name}</h3>
                                <p className='author-text-container'>
                                    <p>{authors[0].bio}</p><span className="author-link">... <Link to='#'>More about { authors[0].name } </Link></span>
                                </p>


                            </aside>
                            <aside className="product-details-wrapper">
                                <hr />
                                <h3>Product Details</h3>
                                <div className="product-details-content">
                                    <p>{book.pageCount} pages</p>
                                    <p>Published by {book.publisher}</p>
                                    <ul>
                                        {typeof book.ISBN_Identifiers === 'object' && 

                                            book.ISBN_Identifiers.map((obj: ISBN_Identifier, index: number) => (
                                                <li key={index}> {obj.type} : {obj.identifier}</li>
                                            ))
                                        
                                        
                                        }
                                       
                                    
                                    </ul>
                                </div>
                            </aside>
                        </div>
                    </div>
                </div>

            ) : <h2>Loading...</h2>}
        </div>

    )
}

export default Bookpage