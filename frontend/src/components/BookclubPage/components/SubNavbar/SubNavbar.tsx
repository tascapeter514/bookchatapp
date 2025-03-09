import { useRef, Dispatch, SetStateAction } from 'react'
import { Bookclub } from '../../../../types'
import BookshelfModal from '../../../common/Modals/BookshelfModal/BookshelfModal'
import Button from '../../../common/Buttons/Button/Button'
import { v4 as uuidv4 } from 'uuid'
import './SubNavbar.css'


interface SubNavbarProps {
    bookclub: Bookclub | null,
    subNav: boolean,
    setActiveBookshelf: Dispatch<SetStateAction<number>>

}

const SubNavbar = ({bookclub, subNav, setActiveBookshelf}: SubNavbarProps) => {

    const bookshelfRef = useRef<HTMLDialogElement>(null)
    const openBookshelfModal = () => bookshelfRef.current?.showModal()
    const closeBookshelfModal = () => bookshelfRef.current?.close()

    const createBookshelf = async (formData: FormData): Promise<void> => {
        console.log('form data:', formData.get('bookshelfName'))

        const bookshelf = {
            bookshelf_id: uuidv4(),
            name: formData.get('bookshelfName'),
            bookclub_id: bookclub?.bookclub_id

        }

        try {
            const response = await fetch('http://localhost:8000/api/bookclub/addBookshelf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookshelf)
            })

            if (response.ok) {
                const data = response.json()
                console.log("create bookshelf data:", data)
            }


        } catch(err) {
            console.error('Error connecting to backend for bookshelf creation:', err)
        }
    }


    // id={`link-${navbarIndex}`} href={`#${navbarContent.toLowerCase()}
//     <li 
//     key={navbarIndex}
//     onClick={ () => setActiveTab(navbarIndex)}
//     className={activeTab == navbarIndex ? 'active' : ''}
// >




    return (
        <nav 
            id='bookshelves-subnav' 
            className={`bookshelves-subnav ${subNav ? 'active' : '0'}`}
            aria-hidden='true'
        >
            <ul className="bookshelf-titles-list">
                {bookclub?.bookshelves.map((bookshelf, index) => 
                <li key={bookshelf.bookshelf_id} onClick={() => setActiveBookshelf(index)} className='bookshelf-title-listElement'>
                    {bookshelf.name}
                </li>)}
            </ul>
            <Button onClick={openBookshelfModal}>Add Bookshelf</Button>
            <BookshelfModal 
                bookshelfRef={bookshelfRef}
                closeBookshelfModal={closeBookshelfModal}
                createBookshelf={createBookshelf}
            >
            </BookshelfModal>
        </nav>

    )
}

export default SubNavbar