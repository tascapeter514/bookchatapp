import {useState, useEffect, useRef, useMemo} from 'react'
import {useParams, Link } from 'react-router-dom'
import { Book, ISBN_Identifier, Bookshelf, Author, Bookclub } from '../../types'
import AuthorDetails from '../AuthorDetails/AuthorDetails'
import ProductDetails from '../ProductDetails/ProductDetails'
import BookFacade from '../BookFacade/BookFacade'
import { BookmarkIcon } from '../common/Icons'
import { userData } from '../common/Context/UserContext/UserContext'
import useGetData from '../common/hooks/useGetData'
import SearchFilter from '../common/SearchFilter/SearchFilter'
import SearchResults from './components/SearchFilter/SearchResults'
import './Bookpage.css'


const Bookpage = () => {

    const { id } = useParams();
    const { makeRequest, error, loading } = useGetData(`http://localhost:8000/api/book/${id}`)
    const [book, setBook] = useState<Book | null>(null)

    useEffect(() => {
       const getBook = async () => {
        try {
            const bookData = await makeRequest()
            console.log('book data:', bookData)
            setBook(bookData)
        } catch(err) {
            console.error('Error fetching book:', err)
        }
       }

       getBook()

    }, [makeRequest])


    
    






    



    // const {activeUser, userBookshelves, setUserBookshelves} = userData()
    // const [isBookclubModalOpen, setIsBookclubModalOpen] = useState(false)
    // const [isBookshelfModalOpen, setIsBookshelfModalOpen] = useState(false)
    // const [searchValue, setSearchValue] = useState('')
    // const [bookclubSearchResults, setBookclubSearchResults] = useState<Bookclub[]>([])
    // const [currentBookclub, setCurrentBookclub] = useState<Bookclub | null>(null)
    // const [currentBookshelf, setCurrentBookshelf] = useState<Bookshelf | null>(null)
    // const [selectedUserBookshelf, setSelectedUserBookshelf] = useState<string | null>(null)
    // const [selectedBookclub, setSelectedBookclub] = useState<string | null>(null)
    

    const bookclubModalRef = useRef<HTMLDialogElement>(null)
    // const bookshelfModalRef = useRef<HTMLDialogElement>(null)




    // const addToBookshelf = async (currentBookshelf: Bookshelf): Promise<void> => {
        
    //     const bookshelfRequest = {
    //         book_id: book?.title_id
    //     } 

    //     try {
    //         const response = await fetch(`http://localhost:8000/api/bookclub/addBook/${currentBookshelf.bookshelf_id}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(bookshelfRequest)
    //         })

    //         if (response.ok) {
    //             const book = await response.json()
    //             console.log('add book to bookclub book:', book)
    //             setUserBookshelves(prev => [...prev, book])
    //             closeBookclubModal()
    //         } else {
    //             console.error('Error adding book to bookshelf:', response.statusText)
    //         }
            

    //     } catch(err) {
    //         console.error('Error adding book to bookshelf')
    //     }

      
    // }

    // const addToUserBookshelf = async (selectedUserBookshelf: string) : Promise<void> => {

    //     const bookshelfRequest = {
    //         book_id: book?.title_id,
    //         bookshelf_id: selectedUserBookshelf,
    //     } 




    //     try {

    //         const response = await fetch(`http://localhost:8000/api/userBookshelf/addBook/${activeUser.id}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },

    //             body: JSON.stringify(bookshelfRequest)
                
    //         })

    //         if (response.ok) {
    //             const book = response.json();
    //             console.log('add to user bookshelf book:', book)
    //         }

    //     } catch(err) {
    //         console.error('Error adding book to user bookshelf')
    //     }

    //     closeBookshelfModal()


    // }

    // console.log('bookpage parameters:', params)

    // const openBookclubModal = () => {
    //     setIsBookclubModalOpen(true)

    //     bookclubModalRef.current?.showModal()
        
    // }
    // const closeBookclubModal = () => {
    //     setIsBookclubModalOpen(false)
    //     bookclubModalRef.current?.close()
    // }

    // const openBookshelfModal = () => {
    //     setIsBookshelfModalOpen(true)
    //     bookshelfModalRef.current?.showModal()
    // }

    // const closeBookshelfModal = () => {
    //     setIsBookshelfModalOpen(false)
    //     bookshelfModalRef.current?.close()
    // }


    // const showBookshelves = (bookclub_id: string) => {
    
    //     const selectedBookclub = bookclubSearchResults.find((bookclub: Bookclub) => bookclub.bookclub_id === bookclub_id) || null
    //     console.log('selected bookclub:', selectedBookclub);
        
    //     setCurrentBookclub(selectedBookclub)
    // }

    // const handleBookclubSelection = (bookclubId: string) => {
    //     console.log('bookclub id:', bookclubId)
    //     setSelectedBookclub(bookclubId)
    //     showBookshelves(bookclubId)
    // }

    // const handleUserBookshelfSelection = (bookshelfId: string) => {
    //     setSelectedUserBookshelf(bookshelfId)

    // }
    // console.log('current bookclub:', currentBookclub);
    
    // console.log('current bookclub bookshelves:', currentBookclub?.bookshelves);
    
    
    
    return(
        
        <div className='bookpage-container'>
            {book && (
                <div className="bookpage-detail">
                    {/* BOOK INFO COMPONENT */}
                    <BookFacade {...book} />
                    <div className="main-content">
                        <div className="book-description">
                            <hr />
                            <h3>About {book.name}</h3>
                            <p>{book.description}</p>
                           
                        </div>
                        {/* AUTHOR PRODUCT COMPONENT */}
                        <div className="author-product-container">
                            {book.authors && book.authors.length > 0 &&
                                book.authors.map((author: Author ) => (
                                    <AuthorDetails {...author} />
                            ))}
                            {/* PRODUCT DETAILS COMPONENT */}
                            <ProductDetails {...{pageCount: book.pageCount, publisher: book.publisher, ISBNIdentifiers: book.ISBN_Identifiers}}/>
                            
                        </div>
                    </div>
                </div>
                )
            }
            {error && <p>There was an error loading the data: {error}</p>}
            {loading && <p>Page is loading...</p>}
        </div>

    )
}

export default Bookpage