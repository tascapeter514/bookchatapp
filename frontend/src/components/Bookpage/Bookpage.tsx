import { useDispatch, useSelector } from 'react-redux'
import {useParams } from 'react-router-dom'
import { useEffect, useCallback } from 'react'
import { useGetBookMutation } from '../../slices/bookApiSlice'
import { loadBook } from '../../slices/bookSlice'
import { Book, Author } from '../../types'
import { RootState } from '../../store/store'
import AuthorDetails from '../AuthorDetails/AuthorDetails'
import ProductDetails from '../ProductDetails/ProductDetails'
import BookHeader from '../BookHeader/BookHeader'
import './Bookpage.css'


const Bookpage = () => {

    const { id } = useParams();
    console.log('book id:', id)
    const dispatch = useDispatch()
    const [getBook, {isLoading, isError}] = useGetBookMutation()
    const { book } = useSelector((state: RootState) => state.book)


    const getBookData = useCallback( async () => {

        try {

            const response = await getBook(id).unwrap()
            dispatch(loadBook({...response}))




        } catch(err: any) {
            console.error('Error fetching book:', err)
        }

    }, [id])



    useEffect(() => {

        getBookData()

    }, [id])

 

    

  

    return(
        
        <div className='bookpage-container'>
            {isError && <p>There was an error loading the data: {data.error}</p>}
            {isLoading && <p>Page is loading...</p>}
                {/* <div className="bookpage-detail"> */}
                   
                    <BookHeader book={book} /> 
                    <div className="main-content">
                        <div className="book-description">
                            <hr />
                            <h3>About {book.name}</h3>
                            <p>{book.description}</p>
                           
                        </div>
                    
                        <div className="author-product-container">
                            {book.authors && book.authors.length > 0 &&
                                book.authors.map((author: Author ) => (
                                    <AuthorDetails {...author} />
                            ))}
                            
                            <ProductDetails {...{pageCount: book.pageCount, publisher: book.publisher, ISBNIdentifiers: book.ISBN_Identifiers}}/>
                            
                        </div>
                    </div>
                </div>
                
            
        // </div>

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