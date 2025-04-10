import { BookmarkIcon } from '../../Icons'
import Button from '../../Buttons/Button/Button'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import SearchFilter from '../../Search/SearchFilter/SearchFilter'
// import FilterResults from '../../Search/FilterResults/FilterResults'
import searchReducer from '../../../reducers/searchReducer'
import { useGetUserDataQuery, usePostBookMutation } from '../../../slices/userDataApiSlice'
import { useRef, useReducer, memo } from 'react'
import './BookshelfButtonModal.css'



const BookshelfButtonModal = () => {

    const { user } = useSelector((state: RootState) => state.auth)

    const {data, isError, error} = useGetUserDataQuery(user?.id, {
        skip: !user?.id
    })
    // const [postBook, {isError, error, reset}] = usePostBookMutation()
    const [search, dispatchSearch] = useReducer(searchReducer, {id: 0, value: ''})
    const ref = useRef<HTMLDialogElement>(null)
    const openModal = () => ref.current?.showModal()
    const closeModal = () => ref.current?.close()
    const addBook = () => console.log('add button click')

    console.log('bookshelf modal data:', data)
    console.log('bookshelf modal user:', user)

    return(
        <>
            <div className="bookshelf-button-modal">
                <BookmarkIcon onClick={openModal}></BookmarkIcon>
                <span>Add to Bookshelf</span>
            </div>
            <dialog className='bookshelf-dialog' ref={ref}>
                <h3>Add this book to your bookshelf</h3>
                    <hr />
                    {user ? 
                        <main className="bookshelf-results">
                            <SearchFilter search={search} dispatchSearch={dispatchSearch}/>
                            {/* <FilterResults search={search} dispatchSearch={dispatchSearch}>{bookshelves}</FilterResults> */}
                        </main>
                            
                        
                        : <span>You must be logged in to use this feature</span>}
                <div className="button-wrapper">
                    <Button onClick={closeModal}>Cancel</Button>
                    <Button onClick={addBook}>Add</Button>
                </div>
            </dialog>
            
        </>

    )

}

export default memo(BookshelfButtonModal)