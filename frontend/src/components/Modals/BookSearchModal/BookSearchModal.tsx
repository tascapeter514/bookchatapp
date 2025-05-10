import Button from '../../Buttons/Button/Button'
import { useReducer, useRef} from 'react'
import { handleBookError, BookError } from '../../../utils/errorHandling'
import ErrorMessage from '../../Messages/ErrorMessage/ErrorMessage'
import { usePostBookMutation } from '../../../slices/bookshelfApiSlice'

import ModalSearchbar from '../../Search/ModalSearchbar/ModalSearchbar'
import { SearchIcon } from '../../Icons'
import searchReducer from '../../../reducers/searchReducer'
import { WEBSOCKET_BASE } from '../../../utils/baseAPI'
import RadioButtons from '../../Mappers/RadioButtons/RadioButtons'
// import SearchResults from '../../Search/SearchResults/SearchResults'
// import BookSearchbar from '../../Search/BookSearchbar/BookSearchbar'
import { SearchResultData } from '../../../types'
import Searchbar from '../../Search/NavigationSearchbar/NavigationSearchbar'
import { Bookshelf  } from '../../../types'
import ModalButtons from '../../Buttons/ModalButtons/ModalButtons'
import './BookSearchModal.css'


interface Props {
    bookshelf: Bookshelf,
    id: number
}


const BookSearchModal = ({ bookshelf, id }: Props) => {


    console.log('bookshelf search id:', id)

    const bookSearchRef = useRef<HTMLDialogElement>(null)
    const openModal = () => bookSearchRef.current?.showModal()
    const closeModal = () => bookSearchRef.current?.close()
    const [searchData, dispatchSearch] = useReducer(searchReducer, {parentId: bookshelf.id,  newItemId: 0} )
    // const { searchValue, searchResults, setSearchValue }  = useBookSearch()
    const [postBook, {isError, error, reset}] = usePostBookMutation()
    

    // const handleOnChange = (e: string) => {
    //     if (isError) reset()
    //     setSearchValue(e)

    // }

    const addBook = async () => {
        console.log('add book')

        // const {bookshelfId, newBookId} = searchData

        // console.log('booksearch modal id:', id)
        // try {

        //     await postBook({bookshelfId, newBookId, id}).unwrap()
        //     setSearchValue('')

        // } catch(err) {
        //     console.error('add book error:', err)
        // }
        
    }
            

    
    return (
        <>
            <Button onClick={openModal}>
                <SearchIcon />
            </Button>
            <dialog className='search-books-modal' ref={bookSearchRef}>
            {isError && <ErrorMessage>{handleBookError(error as BookError)}</ErrorMessage>}
                <h3>Add a new title to your bookshelf</h3>
                <hr />
                <section className='search-books-content'>
                    <article className='suggested-book-list'>
                        <ModalSearchbar url={`${WEBSOCKET_BASE}/ws/search/books/`}/>
                        
                    </article>
                </section>
                <ModalButtons
                    closeModal={closeModal}
                    submitHandler={addBook}
                    submitButtonText='Add Book'
                 />
            </dialog>
        </>
    )
}


export default BookSearchModal
