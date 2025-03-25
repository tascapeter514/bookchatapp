import { userContext } from '../common/Context/UserContext/UserContext'
import { useState } from 'react'
import BookclubButton from '../TabButtons/BookclubButton/BookclubButton'
import BookshelfButton from '../TabButtons/BookshelfButton/BookshelfButton'
import { formatDate } from '../common/functions'
import './UserTabs.css'
import AccountButton from '../TabButtons/AccountButton/AccountButton'
import MessageButton from '../TabButtons/MessageButton/MessageButton'



const UserTabs = () => {

    const { activeUser } = userContext()

    // MOVE LOGIC SERVER SIDE?
    const {day, month, year } = formatDate(activeUser.date_joined)

    // const [activePanel, setActivePanel] = useState(false);
    const [activeTab, setActiveTab] = useState<number>(NaN)
    
    // const [newBkslfId, setNewBkslfId] = useState<string>('')

    return(
        <div className="navbar-container">
            <div className="profile-header">
                <h1>Hi {activeUser.first_name}!</h1>
                <span>Member since {month} {day}, {year}</span>
            </div>
            <nav className='profile-navbar'>
                <AccountButton activeTab={activeTab} setActiveTab ={setActiveTab}
                />
                <MessageButton activeTab={activeTab} setActiveTab ={setActiveTab} 
                />
                <BookclubButton activeTab={activeTab} setActiveTab ={setActiveTab}
                />
                <BookshelfButton activeTab={activeTab} setActiveTab ={setActiveTab}
                />
            </nav>
        </div>
    )
}

export default UserTabs





