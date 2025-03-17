import { useRef, Dispatch, SetStateAction } from 'react'
import { bookclubData } from '../../../common/Context/BookclubContext/BookclubContext'
import BookshelfModal from '../../../common/Modals/BookshelfModal/BookshelfModal'
import Button from '../../../common/Buttons/Button/Button'
import './SubNavbar.css'


interface SubNavbarProps {
    subNav: boolean,
    setActiveBookshelf: Dispatch<SetStateAction<number>>,
}


const SubNavbar = ({ subNav, setActiveBookshelf }: SubNavbarProps) => {

    const { bookshelves, addBookshelf, newBkslfId, setBkslfId } = bookclubData()
    const bookshelfRef = useRef<HTMLDialogElement>(null)
    const openBookshelfModal = () => bookshelfRef.current?.showModal()
    const closeBookshelfModal = () => bookshelfRef.current?.close()

    const bookshelfTitles = bookshelves?.map((bookshelf, index) => {


        return (
                <li key={bookshelf.bookshelf_id} onClick={() => setActiveBookshelf(index)} className='bookshelf-title-listElement'>
                    {bookshelf.name}
                </li>
        )})


    
    return (
        <nav 
            id='bookshelves-subnav' 
            className={`bookshelves-subnav ${subNav ? 'active' : '0'}`}
            aria-hidden='true'
        >
            <ul className="bookshelf-titles-list">
                {bookshelfTitles}
            </ul>
            <Button onClick={openBookshelfModal}>Add Bookshelf</Button>
            <BookshelfModal 
                bookshelfRef={bookshelfRef}
                closeBookshelfModal={closeBookshelfModal}
                addBookshelf={addBookshelf}
                newBkslfId={newBkslfId}
                setBkslfId={setBkslfId}
            >
            </BookshelfModal>
        </nav>

    )
}

export default SubNavbar