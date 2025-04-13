import { TabState, TabAction } from '../../../reducers/tabsReducer'
import { Dispatch } from 'react'
import './MessageButton.css'


interface Props {
    userTabs: TabState,
    dispatchUserTabs: Dispatch<TabAction>
}

const MessageButton = ({userTabs, dispatchUserTabs} : Props) => {

    return (

        <button 
            className={`message-button ${userTabs.activeTab === 'messagesPanel' ? 'active' : ''}`}
            onClick={() => dispatchUserTabs({type: 'SET_ACTIVE_TAB', payload: 'messagesPanel'})}
        >
        Messages
        </button>
        
    )

}

export default MessageButton