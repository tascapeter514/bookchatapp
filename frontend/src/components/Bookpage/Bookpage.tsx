import BookMainContent from '../BookMainContent/BookMainContent'
import BookHeaderTitle from '../BookHeaderTitle/BookHeaderTitle'
import { useGetBookMutation } from '../../slices/bookApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import LoadSpinner from '../LoadSpinner/LoadSpinner'
import ErrorMessage from '../Messages/ErrorMessage/ErrorMessage'
import { loadBook } from '../../slices/bookSlice'
import { useEffect, useCallback } from 'react'
import BookCover from '../BookCover/BookCover'
import BookHeader from '../BookHeader/BookHeader'
import { RootState } from '../../store/store'
import {useParams } from 'react-router-dom'
import './Bookpage.css'



const BookHeaderSkeleton = () => {
    return (
        <div className="book-header-skeleton">
          <div className="skeleton-cover" />
          <div className="skeleton-title-group">
            <div className="skeleton-title" />
            <div className="skeleton-subtitle" />
          </div>
        </div>
      )

}

const BookMainContentSkeleton = () => {
    return (
      <div className="main-content">
        <div className="book-description">
          <hr />
          <div className="skeleton-title" />
          <div className="skeleton-paragraph" />
          <div className="skeleton-paragraph short" />
        </div>
  
        <div className="author-product-container">
          {/* Simulate two author blocks */}
          <div className="skeleton-author" />
          <div className="skeleton-author" />
  
          {/* Simulate product details */}
          <div className="skeleton-product-detail" />
          <div className="skeleton-product-detail" />
          <div className="skeleton-product-detail" />
        </div>
      </div>
    )
  }

const Bookpage = () => {

    const { id } = useParams();
    console.log('book id:', id)
    const dispatch = useDispatch()
    const [getBook, {isLoading, isError, error}] = useGetBookMutation()
    const { book } = useSelector((state: RootState) => state.book)

    // REMOVE CALLBACK HANDLER
    const getBookData = useCallback( async () => {

        try {

            const response = await getBook(Number(id)).unwrap()
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
            {isError && <ErrorMessage>{error as string}</ErrorMessage>}
            {isLoading && <LoadSpinner />}
            <BookHeader>
                {isLoading ? (
                    <BookHeaderSkeleton />
                ): (
                    <>
                        <BookCover book={book}/>
                        <BookHeaderTitle book={book}/> 
                    </>
                )}

            </BookHeader>
            {isLoading ? (
                <BookMainContentSkeleton />
            ) : (
                <BookMainContent book={book} />     
            )}
        </div>
    )
}

export default Bookpage
