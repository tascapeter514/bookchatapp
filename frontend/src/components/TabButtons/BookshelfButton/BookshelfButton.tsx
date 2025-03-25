
import BookshelfDropdown from '../../common/BookshelfDropdown/BookshelfDropdown'
import { useState, useRef, Dispatch, SetStateAction } from 'react'
import { RightDropDownIcon } from '../../common/Icons'
import CreateButton from '../../common/Buttons/CreateButton/CreateButton'
import { userContext } from '../../common/Context/UserContext/UserContext'
import { Bookshelf, BookshelfData } from '../../../types'
import PostModal from '../../common/Modals/PostModal/PostModal'
import './BookshelfButton.css'


interface Props {
    activeTab: number,
    setActiveTab: Dispatch<SetStateAction<number>>
}

const BookshelfButton = ({activeTab, setActiveTab}: Props) => {
     
    
    const { userData, activeUser } = userContext()
    const bookshelves = userData.find(data => data.type === 'bookshelf') as BookshelfData | undefined

    const bookshelfRef = useRef<HTMLDialogElement>(null)
    const openModal = () => bookshelfRef.current?.showModal()
    const [isRotated, setIsRotated] = useState(false);
    const [activePanel, setActivePanel] = useState(false);

    const toggleDropdown = () => {
        setActivePanel(prev => !prev)
        setIsRotated(prev => !prev)
    }

    console.log('bookshelf button user data:', userData)
    console.log('bookshelf data:', bookshelves)

    const bookshelfNames = bookshelves?.items.map((bookshelf: Bookshelf, index: number) => {

        function handleActiveBookshelf() {
            setActiveTab(index + 4)
            // setActiveBookshelf(index)
        }

        return (
            <li 
                key={bookshelf.id}
                onClick={handleActiveBookshelf}
                className={activeTab == index + 4 ? 'active' : ''}
            >   
                <a id={`bookshelf-${index}`} href={`#${bookshelf.name.toLowerCase()}`}>
                    {bookshelf.name}
                </a>
            </li>
        )
    })

                
    return (
        <div className='navbar-bookshelf-component'>
            <hr className='navbar-line-break' />
            <BookshelfDropdown activePanel={activePanel}>
                <a 
                    className={`bookshelf-button ${activeTab === 3 ? 'active' : ''}`}
                    onClick={ () => setActiveTab(3)}
                >
                    Bookshelves
                    <RightDropDownIcon onClick={toggleDropdown} isRotated={isRotated} />
                </a>
                <ul className='navbar-bookshelf-list'>{bookshelfNames}</ul>
            </BookshelfDropdown>
            <CreateButton onClick={openModal}>Bookshelf</CreateButton>
            <PostModal 
                ref={bookshelfRef} 
                url={`http://localhost:8000/api/user/addBookshelf/${activeUser.id}`}
                type='bookshelf'  
            /> 
        </div>
    )

}

export default BookshelfButton


 