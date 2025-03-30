import { userContext } from '../common/Context/UserContext/UserContext'
import BookclubButton from '../TabButtons/BookclubButton/BookclubButton'
import BookshelfButton from '../TabButtons/BookshelfButton/BookshelfButton'
import AccountButton from '../TabButtons/AccountButton/AccountButton'
import MessageButton from '../TabButtons/MessageButton/MessageButton'
import './UserNav.css'


const ProfileHeader = () => {

    const { userState } = userContext()
    const { user } = userState



    return(
        <div className="profile-header">
            <h1>Hi {user?.firstName}!</h1>
            <span>Member since {user?.dateJoined}</span>
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





