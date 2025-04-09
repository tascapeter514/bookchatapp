import Button from '../../Buttons/Button/Button'
import { RefObject, useReducer, useRef} from 'react'
import { handleBookError, BookError } from '../../../utils/errorHandling'
import ErrorMessage from '../../Messages/ErrorMessage/ErrorMessage'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import { usePostBookMutation } from '../../../slices/searchApiSlice'
import useBookSearch from '../../../hooks/useBookSearch'
import { SearchIcon } from '../../Icons'
import booksearchReducer from '../../../reducers/booksearchReducer'
import BookResults from '../../Search/BookResults/BookResults'
import BookSearchbar from '../../Search/BookSearchbar/BookSearchbar'
import { Bookshelf } from '../../../types'
import './BookSearchModal.css'


interface Props {
    bookshelf: Bookshelf
}


const BookSearchModal = ({ bookshelf }: Props) => {

    const bookSearchRef = useRef<HTMLDialogElement>(null)
    const {user} = useSelector((state: RootState) => state.auth)
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
        const userId = Number(user.id)

        try {

            await postBook({userId, bookshelfId, newBookId}).unwrap()
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

// {searchValue && searchResults.length > 0 &&<BookResults bookDispatch={bookDispatch}>{searchResults}</BookResults>}

// onClick={async () => newBookId && await addBook(newBookId, currBkslfId)}
{/* <aside className='bookshelves-list'>
                    {newBookId && bookshelves !== undefined  ? 
                        bookshelves.length > 0 ? (
                        bookshelves.map((bookshelf) => {
                        {return <li key={bookshelf.bookshelf_id} className='bookshelf-result'
                                >
                                <label htmlFor={bookshelf.name}>{bookshelf.name}</label>
                                <input 
                                    type="radio" 
                                    className='bookshelf-input' 
                                    id={bookshelf.name}
                                    name='bookshelfGroup'
                                    checked={currBkslfId === bookshelf.bookshelf_id} 
                                    onChange={() => setCurrBkslfId(bookshelf.bookshelf_id)}/>
                                </li> }
                        })
                        ) : (<span>No bookshelves  in your bookclub</span>)
                        : 'No Book Selected'}
                    </aside> */}


 // useEffect(() => {
    //     if (!data.isLoading && !data.isError && data.data.length > 0) {
    //         bookshelfDispatch({type: 'ADD_BOOK' , payload: {bookshelfId: bookshelf.id, newBook: data.data}})
    //     }

    // }, [data])


    // const addBook = async () => {
    //     console.log('handle submit called')

    //     const request = {
    //         bookshelfId: bookshelf.id,
    //         bookId: bookSearch.newBookId
    //     }
    //     try {
    //         console.log('before make request')
    //         await makeRequest(request)

  
            
            
    //     } catch(err) {
    //         console.log('error handling submission:', err)
    //     }

    
    // }