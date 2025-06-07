import {Bookshelf, Book} from '../../types'
import BookCard from '../BookCard/BookCard'
import useSearch from '../../hooks/useSearch'
import { WEBSOCKET_BASE } from '../../utils/baseAPI'
import { SearchIcon } from '../Icons'
import Button from '../Buttons/Button/Button'
import ModalSearchbar from '../Search/ModalSearchbar/ModalSearchbar'
import Dialog from '../Dialog/Dialog'
import { usePostBookMutation } from '../../slices/bookshelfApiSlice'
import './BookshelfDisplay.css'

interface Props {
    children: Bookshelf,
    id: number

}



// const BookSearchModalWithLogic = WithAddBook(WithAsync(BookSearchModal))

const BookshelfDisplay = ({ children, id }: Props) => {

    console.log('bookshelf display children:', children)


    const { books } = children
    const {searchResults, searchValue, setSearchValue} = useSearch(`${WEBSOCKET_BASE}/ws/search/books/`)
    const [postBook] = usePostBookMutation()

    const addBook = async (newBookId: number) => {
    
        try {

            if (!id|| !newBookId) {
                throw new Error('You are missing an id.')
                
            }

            await postBook({bookshelfId: id, newBookId}).unwrap()

        } catch(err: any) {
            console.log('catch handler running')
            console.log('add book error log:', err)
            console.error('add book error:', err)


        }
        
    }

    
    return(
        <section className="bookshelf-container">

            <Dialog
                title='Add a new title to your bookshelf'
                button={openModal => <Button onClick={openModal}><SearchIcon /></Button>}
                data={searchResults}
                handleSubmit={addBook}
            >
                {(data, handleSelectedItem) => 
                    <ModalSearchbar 
                        searchValue={searchValue} 
                        setSearchValue={setSearchValue}
                        searchResults={data}
                        setSelection={handleSelectedItem} 
                    />
                    
                }

            </Dialog>
            
            <ul className="bookshelf-title-list">
                {books.map((bookElement: Book) => {
                    return(
                        <li
                            className='book-card-listElement'
                            key={bookElement.id}
                        >
                            <BookCard id={id} bookshelfId={children.id}>{bookElement}</BookCard>
                        </li>
                    )
                })}
            </ul>
        </section>
        
    )
}

export default BookshelfDisplay