
import BookshelfDropdown from '../../BookshelfDropdown/BookshelfDropdown'
import { TabState, TabAction } from '../../../reducers/userTabsReducer'
import { Dispatch } from 'react'
import { useState, useRef} from 'react'
import { RightDropDownIcon } from '../../Icons'
// import CreateButton from '../../Buttons/CreateButton/CreateButton'
import PostModal from '../../Modals/PostModal/PostModal'
import './BookshelfButton.css'

interface Props {

    userTabs: TabState,
    dispatchUserTabs: Dispatch<TabAction>
    
}

const BookshelfButton = ({userTabs, dispatchUserTabs}: Props) => {
     
    
    const bookshelfRef = useRef<HTMLDialogElement>(null)
    const openModal = () => bookshelfRef.current?.showModal()
    const [isRotated, setIsRotated] = useState(false);
    const [activePanel, setActivePanel] = useState(false);

    const toggleDropdown = () => {
        setActivePanel(prev => !prev)
        setIsRotated(prev => !prev)
    }

    // console.log('bookshelves:', bookshelves)

    // const bookshelfNames = bookshelves.data?.map((bookshelf, index) => {

    //     console.log('bookshelf:', bookshelf)

    //     return (
    //         <li 
    //             key={bookshelf.id}
    //             onClick={() => tabsDispatch({type: 'SET_BOOKSHELF_TAB', payload: `bookshelfTab${index}`})}
    //             className={userTabs.activeBookshelf === `bookshelfTab${index}`  ? 'active' : ''}
    //         >   
    //             <a id={`bookshelf-${index + 4}`} href={`#${bookshelf.name?.toLowerCase()}`}>
    //                 {bookshelf.name == undefined ? '' : bookshelf.name}
    //             </a>
    //         </li>
    //     )
    // })

                
    return (
        <div className='tab-button bookshelves'>
            <hr className='navbar-line-break' />
            <BookshelfDropdown activePanel={activePanel}>
                <a 
                    className={`bookshelf-button ${userTabs.activeTab === 'bookshelfTab' && userTabs.activeBookshelf === '' ? 'active' : ''}`}
                    onClick={ () => dispatchUserTabs({type: 'SET_ACTIVE_TAB', payload: 'bookshelfTab'})}
                >
                    Bookshelves
                    <RightDropDownIcon onClick={toggleDropdown} isRotated={isRotated} />
                </a>
                {/* <ul className='navbar-bookshelf-list'>{bookshelfNames}</ul> */}
            </BookshelfDropdown>
            
            {/* <PostModal 
                ref={bookshelfRef} 
                url={`http://localhost:8000/api/user/bookshelf/${userState.user?.id}`}
                type='bookshelf'  
            />  */}
        </div>
    )

}

export default BookshelfButton


 