import { useRef } from 'react'
import { TabState, TabAction } from '../../../reducers/userTabsReducer'
import { Dispatch } from 'react'
import CreateButton from '../../Buttons/CreateButton/CreateButton'
import PostModal from '../../Modals/PostModal/PostModal'
import './BookclubButton.css'


interface Props {
    userTabs: TabState,
    dispatchUserTabs: Dispatch<TabAction>
}



const BookclubButton = ({userTabs, dispatchUserTabs}: Props) => {

  
    const bookclubRef = useRef<HTMLDialogElement>(null)
    const openModal = () => bookclubRef.current?.showModal()
    
    return(
        <div className='tab-button bookclubs'> 
            <hr className='navbar-line-break' />
            <button 
                className={`bookclub-button ${userTabs.activeTab === 'bookclubTab' ? 'active' : ''}`}
                onClick={ () => dispatchUserTabs({type: 'SET_ACTIVE_TAB', payload: 'bookclubTab'})}
            >
                Bookclubs
            </button>
            <CreateButton onClick={openModal}>Bookclub</CreateButton>
            {/* <PostModal
                ref={bookclubRef}
                url={`http://localhost:8000/api/user/bookclub/${userState.user?.id}`}
                type='bookclub'
            /> */}
        </div>
    )
}

export default BookclubButton


