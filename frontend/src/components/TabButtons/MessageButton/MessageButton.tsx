import './MessageButton.css'
import { Dispatch, SetStateAction } from 'react'


interface Props {

    activeTab: number,
    setActiveTab: Dispatch<SetStateAction<number>>
}


const MessageButton = ({activeTab, setActiveTab}: Props) => {

    return (

        <button 
            className={`message-button ${activeTab === 0 ? 'active' : ''}`}
            onClick={() => setActiveTab(0)}
        >
        Messages
        </button>
        
    )

}

export default MessageButton