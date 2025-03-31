import {useMemo, useEffect, useReducer, Reducer} from 'react'
import {useParams } from 'react-router-dom'
import { Book, Author } from '../../types'
import { Data } from '../../reducers/dataReducer'
import bookReducer, {BookState, BookAction} from '../../reducers/bookReducer'
import AuthorDetails from '../AuthorDetails/AuthorDetails'
import ProductDetails from '../ProductDetails/ProductDetails'
import BookFacade from '../BookFacade/BookFacade'
import useGet from '../common/hooks/useGet'
import './Bookpage.css'


const Bookpage = () => {

    const { id } = useParams();
    console.log('id:', id)
    const { data, makeRequest  } = useGet()
    // const [book, setBook] = useState<Book | Data>({} as Book)
    const [bookState, dispatchBook] = useReducer<Reducer<BookState, BookAction>>(bookReducer, {book: {} as Book | Data, isError: false, error: ''})
    const stableData = useMemo(() => data.data, [JSON.stringify(data.data)])

    useEffect(() => {
        console.log('get book use effect')

        const getBook = async () => {
            console.log('get book check')
            try {


                await makeRequest(`http://localhost:8000/api/book/${id}`)
                
            } catch(err) {
                console.error('Error fetching book:', err)
                dispatchBook({type: 'BOOK_ERROR', payload: 'Error fetching book'})
            }
            
        }

        getBook()

    }, [stableData])


    useEffect(() => {

        console.log('second use effect data check')
        if (!data.isError && !data.isLoading && data.data) {
            dispatchBook({type: 'LOAD_BOOK', payload: data.data})
        }

    }, [data.data])

    

    console.log('book page data:', data.data)

    return(
        
        <div className='bookpage-container'>
            {data.isError && <p>There was an error loading the data: {data.error}</p>}
            {data.isLoading && <p>Page is loading...</p>}
            {bookState.book.id && (
                <div className="bookpage-detail">
                    {/* BOOK INFO COMPONENT */}
                    <BookFacade book={bookState.book} /> 
                    <div className="main-content">
                        <div className="book-description">
                            <hr />
                            <h3>About {bookState.book.name}</h3>
                            <p>{bookState.book.description}</p>
                           
                        </div>
                        {/* AUTHOR PRODUCT COMPONENT */}
                        <div className="author-product-container">
                            {bookState.book.authors && bookState.book.authors.length > 0 &&
                                bookState.book.authors.map((author: Author ) => (
                                    <AuthorDetails {...author} />
                            ))}
                            {/* PRODUCT DETAILS COMPONENT */}
                            <ProductDetails {...{pageCount: bookState.book.pageCount, publisher: bookState.book.publisher, ISBNIdentifiers: bookState.book.ISBN_Identifiers}}/>
                            
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