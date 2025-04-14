import Button from '../../Buttons/Button/Button'
import { useReducer, useRef} from 'react'
import { handleBookError, BookError } from '../../../utils/errorHandling'
import ErrorMessage from '../../Messages/ErrorMessage/ErrorMessage'
import { usePostBookMutation } from '../../../slices/bookshelfApiSlice'
import useBookSearch from '../../../hooks/useBookSearch'
import { SearchIcon } from '../../Icons'
import booksearchReducer from '../../../reducers/booksearchReducer'
import BookResults from '../../Search/BookResults/BookResults'
import BookSearchbar from '../../Search/BookSearchbar/BookSearchbar'
import { Bookshelf } from '../../../types'
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
    const [searchData, bookDispatch] = useReducer(booksearchReducer, {bookshelfId: bookshelf.id,  newBookId: 0} )
    const { searchValue, searchResults, setSearchValue }  = useBookSearch()
    const [postBook, {isError, error, reset}] = usePostBookMutation()
    

    const handleOnChange = (e: string) => {
        if (isError) reset()
        setSearchValue(e)

    }

    const addBook = async () => {

        const {bookshelfId, newBookId} = searchData

        console.log('booksearch modal id:', id)
        try {

            await postBook({bookshelfId, newBookId, id}).unwrap()
            setSearchValue('')

        } catch(err) {
            console.error('add book error:', err)
        }
        
    }
            
    

    console.log('error:', error)
    
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
                        <BookSearchbar  searchValue={searchValue} handleOnChange={handleOnChange} />
                        <BookResults bookDispatch={bookDispatch}>{searchResults}</BookResults>
                    </article>
                </section>
                <div className="button-wrapper">
                    <Button onClick={closeModal}>Cancel</Button>
                    <Button onClick={addBook}>Add Book</Button>
                </div>
            </dialog>
        </>
    )
}


export default BookSearchModal
