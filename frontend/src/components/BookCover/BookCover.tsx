import AddBookToBookshelfModal from '../Modals/AddBookToBookshelfModal/AddBookToBookshelfModal'
import WithAsync from '../HigherOrderComponents/WithAsync'
import WithAddBookToBookshelf from '../HigherOrderComponents/WithAddBookToBookshelf'
import BookshelfIconButton from '../Buttons/BookshelfIconButton/BookshelfIconButton'
import Dropdown from '../Mappers/Dropdown/Dropdown'
import { RootState } from '../../store/store'
import { useState } from 'react'
import { usePostBookMutation } from '../../slices/bookshelfApiSlice'
import { useSelector } from 'react-redux'
import { useGetUserDataQuery } from '../../slices/userDataApiSlice'
import { Book, SearchResultData } from '../../types'
import { BookError } from '../../utils/errorHandling'
import { handleBookError } from '../../utils/errorHandling'
import Dialog from '../Dialog/Dialog'
import './BookCover.css'

interface Props {
    book: Book
}

// const BookshelfButtonModalWithLogic = WithAddBookToBookshelf(WithAsync(AddBookToBookshelfModal))

const BookCover = ({book}: Props) => {

    const thumbnail = book.imageLinks?.thumbnail || null

    const { user } = useSelector((state: RootState) => state.auth)
    const { data: userData } = useGetUserDataQuery(user?.id, {
        skip: !user?.id
    })
    const [postBook] = usePostBookMutation()


    const [error, setError] = useState<string>('')
    

    
    const addBook = async (bookshelfId: number) => {

        try {

            if (!bookshelfId || !book.id|| !user.id) {
                throw new Error('You are missing an id.')
                
            }

            await postBook({bookshelfId: bookshelfId, newBookId: book.id}).unwrap()

        } catch(err: any | BookError) {
            console.log('catch handler running')
            console.log('add book error log:', err)
            console.error('add book error:', err)

            console.log('Error' in err)

            err instanceof Error ? setError(err.message) : setError(handleBookError(err))

        }
        
    }


    return(
        <div className="book-cover">
            {thumbnail ? (
                <img 
                    className='book-cover-image skeleton' 
                    src={book.imageLinks?.thumbnail}
                    height='500'
                    loading='lazy' 
                    
                    alt="" />

                ) : (
                    <div className="cover-placeholder">No Cover</div>
                )
        
            }
            
            {/* <BookshelfButtonModalWithLogic bookId={book.id}/>  */}
            <Dialog
                data={userData?.bookshelves.map((
                    bookshelf: SearchResultData) => ({id: bookshelf.id, name: bookshelf.name})) as SearchResultData[]}
                    title='Select your Bookshelf'
                    handleSubmit={addBook}
                    button={openModal => <BookshelfIconButton openModal={openModal}/>}
            >
                {(data, dispatch) => <Dropdown data={data} dispatch={dispatch} dataType='bookshelves'  />} 

            </Dialog>
        </div>
    )

}

export default BookCover


