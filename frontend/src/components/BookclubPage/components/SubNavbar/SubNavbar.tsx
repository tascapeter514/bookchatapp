import { useRef, Dispatch, SetStateAction, ChangeEvent } from 'react'
import { Bookshelf } from '../../../../types'
import BookshelfModal from '../../../common/Modals/BookshelfModal/BookshelfModal'
import Button from '../../../common/Buttons/Button/Button'
import './SubNavbar.css'


interface SubNavbarProps {
    bookshelves: Bookshelf[] | null,
    subNav: boolean,
    newBookshelf: string,
    setActiveBookshelf: Dispatch<SetStateAction<number>>,
    addBookshelf: (formData: FormData) => Promise<void>,
    handleNewBookshelf: (e: string ) => void

}

const SubNavbar = ({bookshelves, subNav, setActiveBookshelf, addBookshelf, newBookshelf, handleNewBookshelf}: SubNavbarProps) => {

    const bookshelfRef = useRef<HTMLDialogElement>(null)
    const openBookshelfModal = () => bookshelfRef.current?.showModal()
    const closeBookshelfModal = () => bookshelfRef.current?.close()



    return (
        <nav 
            id='bookshelves-subnav' 
            className={`bookshelves-subnav ${subNav ? 'active' : '0'}`}
            aria-hidden='true'
        >
            <ul className="bookshelf-titles-list">
                {bookshelves?.map((bookshelf, index) => 
                <li key={bookshelf.bookshelf_id} onClick={() => setActiveBookshelf(index)} className='bookshelf-title-listElement'>
                    {bookshelf.name}
                </li>)}
            </ul>
            <Button onClick={openBookshelfModal}>Add Bookshelf</Button>
            <BookshelfModal 
                bookshelfRef={bookshelfRef}
                closeBookshelfModal={closeBookshelfModal}
                addBookshelf={addBookshelf}
                newBookshelf={newBookshelf}
                handleNewBookshelf={handleNewBookshelf}
            >
            </BookshelfModal>
        </nav>

    )
}

export default SubNavbar