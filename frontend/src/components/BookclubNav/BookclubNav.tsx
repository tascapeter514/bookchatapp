import { useRef, Dispatch, SetStateAction } from 'react'
import { TabState } from '../../reducers/tabsReducer'
// import { bookclubData } from '../../../../context/BookclubContext/BookclubContext'
import BookshelfModal from '../../../Modals/CreateBookshelf/CreateBookshelf'
import Button from '../Buttons/Button/Button'
import './BookclubNav.css'


interface Props {
    bookclubTabs: TabState
}


const BookclubNav = ({bookclubTabs}: Props) => {

    // const { bookshelves, addBookshelf, newBkslfId, setBkslfId } = bookclubData()
    const bookshelfRef = useRef<HTMLDialogElement>(null)
    const openBookshelfModal = () => bookshelfRef.current?.showModal()
    const closeBookshelfModal = () => bookshelfRef.current?.close()

    // const bookshelfTitles = bookshelves?.map((bookshelf, index) => {


    //     return (
    //             <li key={bookshelf.bookshelf_id} onClick={() => setActiveBookshelf(index)} className='bookshelf-title-listElement'>
    //                 {bookshelf.name}
    //             </li>
    //     )})


    
    return (
        <nav 
            id='bookshelves-subnav' 
            className={`bookshelves-subnav ${bookclubTabs.showNav ? 'active' : '0'}`}
            aria-hidden='true'
        >
            <ul className="bookshelf-titles-list">
                {/* {bookshelfTitles} */}
            </ul>
            <Button onClick={openBookshelfModal}>Add Bookshelf</Button>
            {/* <BookshelfModal 
                bookshelfRef={bookshelfRef}
                closeBookshelfModal={closeBookshelfModal}
                addBookshelf={addBookshelf}
                newBkslfId={newBkslfId}
                setBkslfId={setBkslfId}
            >
            </BookshelfModal> */}
        </nav>

    )
}

export default BookclubNav