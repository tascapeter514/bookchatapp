import { userContext } from '../common/Context/UserContext/UserContext'
import BookclubButton from '../TabButtons/BookclubButton/BookclubButton'
import BookshelfButton from '../TabButtons/BookshelfButton/BookshelfButton'
import AccountButton from '../TabButtons/AccountButton/AccountButton'
import MessageButton from '../TabButtons/MessageButton/MessageButton'
import './UserNav.css'


const ProfileHeader = () => {

    const { activeUser } = userContext()
    return(
        <div className="profile-header">
            <h1>Hi {activeUser.first_name}!</h1>
            <span>Member since {activeUser.date_joined}</span>
        </div>
    )

}



const UserNav = () => {
    return(
        <div className="navbar-container">
            <ProfileHeader></ProfileHeader>
            <nav className='profile-navbar'>
                <AccountButton />
                <MessageButton />
                <BookclubButton />
                <BookshelfButton />
            </nav>
        </div>
    )
}

export default UserNav





