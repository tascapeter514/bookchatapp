import { useRef, Dispatch, SetStateAction } from 'react'
import { Bookshelf } from '../../../../types'
import BookshelfModal from '../../../common/Modals/BookshelfModal/BookshelfModal'
import Button from '../../../common/Buttons/Button/Button'
import './SubNavbar.css'


interface SubNavbarProps {
    bookshelves: Bookshelf[] | null,
    subNav: boolean,
    setActiveBookshelf: Dispatch<SetStateAction<number>>,
    

}

// Add Bookshelf
const SubNavbar = ({bookshelves, subNav, setActiveBookshelf }: SubNavbarProps) => {
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
            >
            </BookshelfModal>
        </nav>

    )
}

export default SubNavbar