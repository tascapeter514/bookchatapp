import { RefObject, useState } from 'react'
import { Bookshelf } from '../../../../types'
import SearchFilter from '../../SearchFilter/SearchFilter'
import SearchResults from '../../../Bookpage/components/SearchFilter/FilterResults'
import Button from '../../Buttons/Button/Button'
import { userData } from '../../Context/UserContext/UserContext'
import './AddBook.css'



type Props = {
    addBookRef: RefObject<HTMLDialogElement>
}


const AddBook = ({addBookRef}: Props) => {

    const {activeUser, userBookshelves, setUserBookshelves} = userData()
    
    const [currentBookshelf, setCurrentBookshelf] = useState<Bookshelf | null>(null)
    const [selectedUserBookshelf, setSelectedUserBookshelf] = useState<string | null>(null)

      const handleUserBookshelfSelection = (bookshelfId: string) => {
        setSelectedUserBookshelf(bookshelfId)

    }

   
    const closeModal = () => addBookRef.current?.close()
    

    return (
            <dialog className='addBook' ref={addBookRef}>
                <h3>Add this book to your bookshelf</h3>
                    <hr />
                    {activeUser ? 
                        <main className="bookshelf-results-content">
                            <SearchFilter
                                
                                
                            >
                                {userBookshelves}

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