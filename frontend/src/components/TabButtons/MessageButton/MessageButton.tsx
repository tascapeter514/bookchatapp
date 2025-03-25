import './MessageButton.css'
import { Dispatch, SetStateAction } from 'react'


interface Props {

    activeTab: number,
    setActiveTab: Dispatch<SetStateAction<number>>
}


const MessageButton = ({activeTab, setActiveTab}: Props) => {

    return (

        <button 
            className={`message-button ${activeTab === 1 ? 'active' : ''}`}
            onClick={() => setActiveTab(1)}
        >
        Messages
        </button>
        
    )

}

export default MessageButton