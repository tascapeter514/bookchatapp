import BookMainContent from '../BookMainContent/BookMainContent'
import BookHeaderTitle from '../BookHeaderTitle/BookHeaderTitle'
import { useGetBookMutation } from '../../slices/bookApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { loadBook } from '../../slices/bookSlice'
import { useEffect, useCallback } from 'react'
import BookCover from '../BookCover/BookCover'
import BookHeader from '../BookHeader/BookHeader'
import { RootState } from '../../store/store'
import {useParams } from 'react-router-dom'
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


    return (
        
        <div className='bookpage-container'>
            {/* {isError && <p>There was an error loading the data: {data.error}</p>} */}
            {isLoading && <p>Page is loading...</p>}
            <BookHeader>
                <BookCover book={book}/>
                <BookHeaderTitle book={book}/> 
            </BookHeader>
            <BookMainContent book={book} />     
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