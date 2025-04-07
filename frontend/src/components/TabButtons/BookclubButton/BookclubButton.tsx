import { useRef } from 'react'
import { TabState, TabAction } from '../../../reducers/userTabsReducer'
import { Dispatch } from 'react'
import CreateBookclubModal from '../../Modals/CreateBookclubModal/CreateBookclubModal'
import './BookclubButton.css'


interface Props {
    userTabs: TabState,
    dispatchUserTabs: Dispatch<TabAction>
}



const BookclubButton = ({userTabs, dispatchUserTabs}: Props) => {

  
    return(
        <div className='tab-button bookclubs'> 
            <hr className='navbar-line-break' />
            <button 
                className={`bookclub-button ${userTabs.activeTab === 'bookclubTab' ? 'active' : ''}`}
                onClick={ () => dispatchUserTabs({type: 'SET_ACTIVE_TAB', payload: 'bookclubTab'})}
            >
                Bookclubs
            </button>
           <CreateBookclubModal></CreateBookclubModal>
        </div>
    )
}

export default BookclubButton


