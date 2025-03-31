import {useState, useEffect} from 'react'
import {useParams } from 'react-router-dom'
import { Book, Author } from '../../types'
import { Data } from '../../reducers/dataReducer'
import AuthorDetails from '../AuthorDetails/AuthorDetails'
import ProductDetails from '../ProductDetails/ProductDetails'
import BookFacade from '../BookFacade/BookFacade'


import useGet from '../common/hooks/useGet'
import './Bookpage.css'


const Bookpage = () => {

    const { id } = useParams();
    const { data, makeRequest  } = useGet(`http://localhost:8000/api/book/${id}`)
    const [book, setBook] = useState<Book | Data>({} as Book)

    useEffect(() => {

        getBook()

        if (!data.isError && !data.isLoading && data.data) {
            setBook(data.data)
        }

    }, [data, makeRequest])


    const getBook = async () => {
        try {
            await makeRequest()

        } catch(err) {
            console.error('Error fetching book:', err)
        }
        
    }


    return(
        
        <div className='bookpage-container'>
            {data.isError && <p>There was an error loading the data: {data.error}</p>}
            {data.isLoading && <p>Page is loading...</p>}
            {book && (
                <div className="bookpage-detail">
                    {/* BOOK INFO COMPONENT */}
                    <BookFacade book={book} /> 
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
            
        </div>

    )
}

export default Bookpage


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