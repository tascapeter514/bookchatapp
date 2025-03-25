
import BookshelfDropdown from '../../common/BookshelfDropdown/BookshelfDropdown'
import { useState, useRef, Dispatch, SetStateAction } from 'react'
import { RightDropDownIcon } from '../../common/Icons'
import CreateButton from '../../common/Buttons/CreateButton/CreateButton'
import { userContext } from '../../common/Context/UserContext/UserContext'
import { Bookshelf, BookshelfData, BookclubData } from '../../../types'
// import PostModal from '../../common/Modals/PostModal/PostModal'
import './BookshelfButton.css'


interface Props {
    activeTab: number,
    setActiveTab: Dispatch<SetStateAction<number>>
}

const BookshelfButton = ({activeTab, setActiveTab}: Props) => {
     
    
    const { userData } = userContext()
    const [ ,bookshelves ]: [ BookclubData, BookshelfData ] = userData

    const bookshelfRef = useRef<HTMLDialogElement>(null)
    const openBookshelfModal = () => bookshelfRef.current?.showModal()
    const [isRotated, setIsRotated] = useState(false);
    const [activePanel, setActivePanel] = useState(false);

    const toggleDropdown = () => {
        setActivePanel(prev => !prev)
        setIsRotated(prev => !prev)
    }

    console.log('bookshelf button user data:', userData)
    console.log('bookshelf data:', bookshelves)

    //  const bookshelfOffset = navbarContents.length



    const bookshelfElements = bookshelves.items.map((bookshelf: Bookshelf, index: number) => {

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
                            <RightDropDownIcon onClick={toggleDropdown} isRotated={isRotated}></RightDropDownIcon>
                        </a>

                        <ul className='navbar-bookshelf-list'>{bookshelfElements}</ul>
                        </BookshelfDropdown>
                        <CreateButton onClick={openBookshelfModal}>Bookshelf</CreateButton>
                        {/* <PostModal 
                            ref={bookshelfRef} 
                            url={`http://localhost:8000/api/user/addBookshelf/${activeUser.id}`}
                            setResults={setUserBookshelves}
                            
                        />  */}

                        {/* <BookshelfModal
                            bookshelfRef={bookshelfRef}
                            closeBookshelfModal={closeBookshelfModal}
                            addBookshelf={addUserBookshelf}
                            newBkslfId={newBkslfId}
                            setBkslfId={setNewBkslfId}
                        ></BookshelfModal> */}
                    </div>
    )

}

export default BookshelfButton


 