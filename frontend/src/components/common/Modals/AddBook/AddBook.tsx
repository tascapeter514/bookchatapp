import { RefObject, useReducer } from 'react'
import SearchFilter from '../../SearchFilter/SearchFilter'
import searchReducer from '../../../../reducers/searchReducer'
import Button from '../../Buttons/Button/Button'
import { userContext } from '../../Context/UserContext/UserContext'
import './AddBook.css'



type Props = {
    addBookRef: RefObject<HTMLDialogElement>
}


const AddBook = ({addBookRef}: Props) => {

    const [search, dispatchSearch] = useReducer(searchReducer, {id: 0})
    const { userState, bookshelves, bookshelfDispatch} = userContext()
    
    

   
    const closeModal = () => addBookRef.current?.close()
    

    return (
            <dialog className='addBook' ref={addBookRef}>
                <h3>Add this book to your bookshelf</h3>
                    <hr />
                    {userState.isLoggedIn ? 
                        <main className="bookshelf-results-content">
                            <SearchFilter
                                
                                
                            >
                                {bookshelves}

                            </SearchFilter>
                            </main>
                            
                        
                        : <span>You must be logged in to use this feature</span>}
                        <div className="button-wrapper">
                            <Button onClick={closeModal}>Cancel</Button>
                            <Button>Add</Button>
                        </div>
                    </dialog>
    )

}

export default AddBook