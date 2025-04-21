import { BookmarkIcon } from '../../Icons'
import { Bookshelf, Book } from '../../../types'
import Button from '../../Buttons/Button/Button'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import SearchFilter from '../../Search/SearchFilter/SearchFilter'
import FilterResults from '../../Search/FilterResults/FilterResults'
import searchReducer from '../../../reducers/searchReducer'
import { useGetUserDataQuery} from '../../../slices/userDataApiSlice'
import { usePostBookMutation } from '../../../slices/bookshelfApiSlice'
import ErrorMessage from '../../Messages/ErrorMessage/ErrorMessage'
import { useRef, useReducer, useState, memo } from 'react'
import { handleBookError, BookError } from '../../../utils/errorHandling'
import './BookshelfButtonModal.css'

interface Props {
    book: Book,
}

const BookshelfButtonModal = ({book}: Props) => {

    const { user } = useSelector((state: RootState) => state.auth)
    const {data, isError: isUserDataError} = useGetUserDataQuery(user?.id, {
        skip: !user?.id
    })
    const [idError, setIdError] = useState<string>('')
    const [postBook, {isError: isPostBookError, error: postBookError, reset}] = usePostBookMutation()
    const [search, dispatchSearch] = useReducer(searchReducer, {resultId: 0, value: ''})
    const ref = useRef<HTMLDialogElement>(null)
    const openModal = () => ref.current?.showModal()
    const closeModal = () => ref.current?.close()
  
  
    const handleAddBook = async () => {

        const { resultId } = search
    
        try {

            if (!resultId || !user.id || !book) {
                throw Error('You are missing an id.')
                
            }

            
            const bookshelfId = Number(resultId)
            const newBookId = Number(book.id)
            const id = Number(user.id)

            console.log('new book id:', newBookId)

            const response = await postBook({bookshelfId, newBookId, id}).unwrap()
            console.log('add book response:', response)

        } catch(err: any) {
            console.error('There was a problem adding the book to your bookshelf:', err)
            setIdError(err.message)
            
        }

    }

 

    return(
        <>
            <div className="bookshelf-button-modal">
                <BookmarkIcon onClick={openModal}></BookmarkIcon>
                <span>Add to Bookshelf</span>
            </div>
            <dialog className='bookshelf-dialog' ref={ref}>
                {isPostBookError && <ErrorMessage>{handleBookError(postBookError as BookError)}</ErrorMessage>}
                {idError && <ErrorMessage>{idError}</ErrorMessage>}
                
                <h3>Add this book to your bookshelf</h3>
                    <hr />
                    {user ? 
                        <>
                            <SearchFilter search={search} dispatchSearch={dispatchSearch}/>
                            {isUserDataError && <ErrorMessage>There was an error loading your bookshelves</ErrorMessage>}
                            <FilterResults search={search} dispatchSearch={dispatchSearch}>{data?.bookshelves as Bookshelf[]}</FilterResults>
                        </>
                        : <span>You must be logged in to use this feature</span>}
                <div className="bookshelf-dialog-button-wrapper">
                    <Button onClick={() => {closeModal(); reset()}}>Cancel</Button>
                    <Button onClick={handleAddBook}>Add</Button>
                </div>
            </dialog>
        </>
    )

}

export default memo(BookshelfButtonModal)