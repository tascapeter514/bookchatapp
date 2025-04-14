import './CurrentReadButton.css'
import { Dispatch } from 'react'
import { TabAction } from '../../../reducers/tabsReducer'
import CreatePollModal from '../../Modals/CreatePollModal/CreatePollModal'


interface Props {
    dispatchTabs: Dispatch<TabAction>
}


const CurrentReadButton = ({dispatchTabs}: Props) => {

    return(
        <div className="tab-button current-read">
            <button
                className='current-read-button'
                onClick={() => dispatchTabs({type: 'SET_ACTIVE_TAB', payload: 'currentReadPanel'})}
            >
                Current Read
            </button>
            <CreatePollModal />
        </div>
    )

}


export default CurrentReadButton

{/* <div className='tab-button bookclubs'> 
<NavbarDivider />
<button 
    className={`bookclub-button ${userTabs.activeTab === 'bookclubPanel' ? 'active' : ''}`}
    onClick={ () => dispatchUserTabs({type: 'SET_ACTIVE_TAB', payload: 'bookclubPanel'})}
>
    Bookclubs
</button>
<CreateBookclubModal />
</div> */}