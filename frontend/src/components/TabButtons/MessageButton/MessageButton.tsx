import './MessageButton.css'
import { Dispatch, SetStateAction } from 'react'
import { userContext } from '../../common/Context/UserContext/UserContext'


interface Props {

    activeTab: number,
    setActiveTab: Dispatch<SetStateAction<number>>
}


const MessageButton = ({activeTab, setActiveTab}: Props) => {

    const { userTabs, tabsDispatch } = userContext()

    return (

        <button 
            className={`message-button ${userTabs.activeTab === 'messagesTab' ? 'active' : ''}`}
            onClick={() => tabsDispatch({type: 'SET_ACTIVE_TAB', payload: 'messagesTab'})}
        >
        Messages
        </button>
        
    )

}

export default MessageButton