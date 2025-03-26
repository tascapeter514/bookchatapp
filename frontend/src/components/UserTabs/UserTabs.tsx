import { userContext } from '../common/Context/UserContext/UserContext'
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


    return(
        <div className="navbar-container">
            <div className="profile-header">
                <h1>Hi {activeUser.first_name}!</h1>
                <span>Member since {month} {day}, {year}</span>
            </div>
            <nav className='profile-navbar'>
                <AccountButton />
                <MessageButton />
                <BookclubButton />
                <BookshelfButton />
            </nav>
        </div>
    )
}

export default UserTabs





