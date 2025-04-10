import { RefObject, useReducer, useEffect } from 'react'
import SearchFilter from '../../Search/SearchFilter/SearchFilter'
import searchReducer from '../../../reducers/searchReducer'
import Button from '../../Buttons/Button/Button'
import FilterResults from '../../Search/FilterResults/FilterResults'
import { Book } from '../../../types'
import { Data } from '../../../reducers/dataReducer'
import usePut from '../../../hooks/usePut'
import './AddBook.css'



type Props = {
    addBookRef: RefObject<HTMLDialogElement>
    book: Book | Data
}



const AddBook = ({addBookRef, book}: Props) => {

    const [search, dispatchSearch] = useReducer(searchReducer, {id: 0, value: ''})
    const closeModal = () => addBookRef.current?.close()
    const { data, makeRequest } = usePut(`http://localhost:8000/api/user/book/${userState.user?.id}`)



    // useEffect(() => {

    //     if (!data.isLoading && !data.isError && data.data.length > 0) {
    //         bookshelfDispatch({type: 'ADD_BOOK', payload: {bookshelfId: search.id, newBook: data.data}})
    //     }


    // })

    const addBook = async () => {

        const data = { bookId: book.id,  bookshelfId: search.id}
        try {

            await makeRequest(data)

        } catch (err: any) {

            console.error('Error with add book handler:', err)

        }

    }
    

    return (
            <dialog className='addBook' ref={addBookRef}>
                <h3>Add this book to your bookshelf</h3>
                    <hr />
                    {/* {userState.isLoggedIn ? 
                        <main className="bookshelf-results-content">
                            <SearchFilter search={search} dispatchSearch={dispatchSearch}/>
                            <FilterResults search={search} dispatchSearch={dispatchSearch}>{bookshelves}</FilterResults>
                        </main>
                            
                        
                        : <span>You must be logged in to use this feature</span>} */}
                        <div className="button-wrapper">
                            <Button onClick={closeModal}>Cancel</Button>
                            <Button onClick={addBook}>Add</Button>
                        </div>
                    </dialog>
    )

}

export default AddBook