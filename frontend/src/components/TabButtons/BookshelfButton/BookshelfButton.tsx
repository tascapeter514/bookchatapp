
import BookshelfDropdown from '../../common/BookshelfDropdown/BookshelfDropdown'
import { useState, useRef} from 'react'
import { RightDropDownIcon } from '../../common/Icons'
import CreateButton from '../../common/Buttons/CreateButton/CreateButton'
import { userContext } from '../../common/Context/UserContext/UserContext'
import PostModal from '../../common/Modals/PostModal/PostModal'
import './BookshelfButton.css'



const BookshelfButton = () => {
     
    
    const { userState, bookshelves, userTabs, tabsDispatch } = userContext()
    const bookshelfRef = useRef<HTMLDialogElement>(null)
    const openModal = () => bookshelfRef.current?.showModal()
    const [isRotated, setIsRotated] = useState(false);
    const [activePanel, setActivePanel] = useState(false);

    const toggleDropdown = () => {
        setActivePanel(prev => !prev)
        setIsRotated(prev => !prev)
    }

    console.log('bookshelves:', bookshelves)

    const bookshelfNames = bookshelves.data.map((bookshelf, index) => {

        console.log('bookshelf:', bookshelf)

        return (
            <li 
                key={bookshelf.id}
                onClick={() => tabsDispatch({type: 'SET_BOOKSHELF_TAB', payload: `bookshelfTab${index}`})}
                className={userTabs.activeBookshelf === `bookshelfTab${index}`  ? 'active' : ''}
            >   
                <a id={`bookshelf-${index + 4}`} href={`#${bookshelf.name.toLowerCase()}`}>
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
                    className={`bookshelf-button ${userTabs.activeTab === 'bookshelfTab' && userTabs.activeBookshelf === '' ? 'active' : ''}`}
                    onClick={ () => tabsDispatch({type: 'SET_ACTIVE_TAB', payload: 'bookshelfTab'})}
                >
                    Bookshelves
                    <RightDropDownIcon onClick={toggleDropdown} isRotated={isRotated} />
                </a>
                <ul className='navbar-bookshelf-list'>{bookshelfNames}</ul>
            </BookshelfDropdown>
            <CreateButton onClick={openModal}>Bookshelf</CreateButton>
            <PostModal 
                ref={bookshelfRef} 
                url={`http://localhost:8000/api/user/bookshelf/${userState.user?.id}`}
                type='bookshelf'  
            /> 
        </div>
    )

}

export default BookshelfButton


 