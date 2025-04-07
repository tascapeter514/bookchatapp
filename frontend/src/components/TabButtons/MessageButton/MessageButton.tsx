import { TabState, TabAction } from '../../../reducers/userTabsReducer'
import { Dispatch } from 'react'
import './MessageButton.css'


interface Props {

    userTabs: TabState,
    dispatchUserTabs: Dispatch<TabAction>

}

const MessageButton = ({userTabs, dispatchUserTabs} : Props) => {




    return (

        <button 
            className={`message-button ${userTabs.activeTab === 'messagesTab' ? 'active' : ''}`}
            onClick={() => dispatchUserTabs({type: 'SET_ACTIVE_TAB', payload: 'messagesTab'})}
        >
        Messages
        </button>
        
    )

}

export default MessageButton