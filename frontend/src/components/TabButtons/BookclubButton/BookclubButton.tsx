import CreateBookclubModal from '../../Modals/CreateBookclubModal/CreateBookclubModal'
import { TabState, TabAction } from '../../../reducers/tabsReducer'
import NavbarDivider from '../../Dividers/NavbarDivider/NavbarDivider'
import { Dispatch } from 'react'
import './BookclubButton.css'


interface Props {
    userTabs: TabState,
    dispatchUserTabs: Dispatch<TabAction>
}



const BookclubButton = ({userTabs, dispatchUserTabs}: Props) => {

  
    return(
        <div className='tab-button bookclubs'> 
            <NavbarDivider />
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


