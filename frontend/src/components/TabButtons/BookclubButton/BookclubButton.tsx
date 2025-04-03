import { useRef } from 'react'
// import { userContext } from '../../../context/UserContext/UserContext'
import CreateButton from '../../Buttons/CreateButton/CreateButton'
import PostModal from '../../Modals/PostModal/PostModal'
import './BookclubButton.css'



const BookclubButton = () => {

    // const { userState, userTabs, tabsDispatch } = userContext()
    const bookclubRef = useRef<HTMLDialogElement>(null)
    const openModal = () => bookclubRef.current?.showModal()
    
    return(
        <> 
            <hr className='navbar-line-break' />
            {/* <button 
                className={`bookclub-button ${userTabs.activeTab === 'bookclubTab' ? 'active' : ''}`}
                onClick={ () => tabsDispatch({type: 'SET_ACTIVE_TAB', payload: 'bookclubTab'})}
            >
                Bookclubs
            </button> */}
            <CreateButton onClick={openModal}>Bookclub</CreateButton>
            {/* <PostModal
                ref={bookclubRef}
                url={`http://localhost:8000/api/user/bookclub/${userState.user?.id}`}
                type='bookclub'
            /> */}
        </>
    )
}

export default BookclubButton


