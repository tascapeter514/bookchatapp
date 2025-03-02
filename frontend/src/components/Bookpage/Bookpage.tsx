import {useState, useEffect, FC, useRef} from 'react'
import {useParams, Link } from 'react-router-dom'
import { Book, ISBN_Identifier, Bookshelf, Author, Bookclub } from '../../types'
import { BsBookmarkPlus } from "react-icons/bs"
import { userData } from '../common/UserContext'
import  BookclubSearchbar  from './components/BookclubSearchbar/BookclubSearchbar'
import BookclubSearchResults from './components/BookclubSearchbar/BookclubSearchResults'
import './Bookpage.css'
import { SiPanasonic } from 'react-icons/si'



type IconProps = React.ComponentPropsWithoutRef<'svg'>

const BookmarkIcon: FC<IconProps> = (props) => {
    return  <BsBookmarkPlus  className='bookmark-icon' {...props}></BsBookmarkPlus>
}


const Bookpage: React.FC = () => {



    const {activeUser, userBookshelves, setUserBookshelves} = userData()
    const params = useParams();
    const [book, setBook] = useState<Book | null>(null);
    const [authors, setAuthors] = useState<Author[] | null>(null)
    const [isBookclubModalOpen, setIsBookclubModalOpen] = useState(false)
    const [isBookshelfModalOpen, setIsBookshelfModalOpen] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [bookclubSearchResults, setBookclubSearchResults] = useState<Bookclub[]>([])
    const [currentBookclub, setCurrentBookclub] = useState<Bookclub | null>(null)
    const [currentBookshelf, setCurrentBookshelf] = useState<Bookshelf | null>(null)
    const [currentUserBookshelf, setCurrentUserBookshelf] = useState<Bookshelf | null>(null)
    

    const bookclubModalRef = useRef<HTMLDialogElement>(null)
    const bookshelfModalRef = useRef<HTMLDialogElement>(null)


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





    const addToBookshelf = async (currentBookshelf: Bookshelf): Promise<void> => {
        

        const bookshelfRequest = {
            book_id: book?.title_id
        } 
        try {
            const response = await fetch(`http://localhost:8000/api/bookclub/addBook/${currentBookshelf.bookshelf_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookshelfRequest)
            })

            if (response.ok) {
                const data = response.json()
                console.log('add book to bookclub data:', data)
            }
            

        } catch(err) {
            console.error('Error adding book to bookshelf')
        }

        closeBookclubModal()
    }

    // console.log('bookpage parameters:', params)

    const openBookclubModal = () => {
        setIsBookclubModalOpen(true)

        bookclubModalRef.current?.showModal()
        
    }
    const closeBookclubModal = () => {
        setIsBookclubModalOpen(false)
        bookclubModalRef.current?.close()
    }

    const openBookshelfModal = () => {
        setIsBookshelfModalOpen(true)
        bookshelfModalRef.current?.showModal()
    }

    const closeBookshelfModal = () => {
        setIsBookshelfModalOpen(false)
        bookshelfModalRef.current?.close()
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
                    {/* BOOK INFO COMPONENT */}
                    <div className="top-facade">
                        <div className="book-header-wrapper">
                            <div className="book-details">
                                <img className='book-cover' src={book.imageLinks['thumbnail']} alt="" />
                               <div className="bookshelfBtn-wrapper">
                                   <BookmarkIcon onClick={openBookshelfModal}></BookmarkIcon>
                                    <span>Add to Bookshelf</span>

                                    


                                    <dialog className={`addToBookshelf-modal ${isBookshelfModalOpen ? 'show': ''}`} ref={bookshelfModalRef}>
                                        {activeUser ? 
                                            <h3>Add this book to your bookshelf</h3>
                                        
                                        : <span>You must be logged in to use this feature</span>}
                                        <div className="button-wrapper">
                                            <button onClick={closeBookshelfModal}>Cancel</button>
                                            <button onClick={() => currentUserBookshelf && addToBookshelf(currentUserBookshelf)}>Add</button>
                                        </div>
                                    </dialog>
                               </div>
                              
                            
                            </div>
                            <article className="book-info-wrapper">
                                <h1>{book.title}</h1>
                                <h3>By <span>{authors?.[0]['name']} </span></h3>
                                <p>Category: <Link to='#' >{book.genres.genre_name}</Link></p>
                                <button
                                    onClick={openBookclubModal} 
                                    
                                    className='add-to-bookClubBtn'>Add to Bookclub</button>
                            </article>

                            {/* BOOKCLUB MODAL */}
                            <dialog className={`addToBookclub-modal ${isBookclubModalOpen ? 'show' : ''}`} ref={bookclubModalRef}>
                                <h3>Add this book to your bookclub</h3>
                                <hr />
                                    <main className="bookclub-results-content">
                                        <div className="suggested-search-results">
                                            <BookclubSearchbar
                                            setBookclubSearchResults={setBookclubSearchResults}
                                            setSearchValue={setSearchValue}
                                            searchValue={searchValue}
                                            isBookclubModalOpen={isBookclubModalOpen}
                                            ></BookclubSearchbar>
                                            <h3>Suggested</h3>
                                            <BookclubSearchResults
                                            searchValue={searchValue}
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
                                    <button onClick={closeBookclubModal}>Cancel</button>
                                    <button onClick={() => currentBookshelf && addToBookshelf(currentBookshelf)}>Add</button>
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

                        {/* AUTHOR PRODUCT COMPONENT */}
                        <div className="author-product-container">

                            {authors && authors.length > 0 &&  

                                <aside className='author-details'>
                                <hr />
                                <h3>About {authors[0].name}</h3>
                                <p className='author-text-container'>
                                    <p>{authors[0].bio}</p><span className="author-link">... <Link to='#'>More about { authors[0].name } </Link></span>
                                </p>
                                </aside>
                            }




                            {/* PRODUCT DETAILS COMPONENT */}
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