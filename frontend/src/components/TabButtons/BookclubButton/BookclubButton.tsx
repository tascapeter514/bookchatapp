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
            <a 
                className={`bookclub-button ${userTabs.activeTab === 'bookclubPanel' ? 'active' : ''}`}
                onClick={ () => dispatchUserTabs({type: 'SET_ACTIVE_TAB', payload: 'bookclubPanel'})}
            >
                Bookclubs
            </a>
           <CreateBookclubModal />
        </div>
    )
}

export default BookclubButton


