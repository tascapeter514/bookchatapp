
import BookshelfButton from '../TabButtons/BookshelfButton/BookshelfButton'
import BookclubButton from '../TabButtons/BookclubButton/BookclubButton'
import { RootState } from '../../store/store'
import { useSelector } from 'react-redux'


import './UserNav.css'


const ProfileHeader = () => {

    const {user} = useSelector((state: RootState) => state.auth)

    console.log('profile header user:', user)

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
                {/* // <AccountButton />
                // <MessageButton /> */}
                <BookclubButton />
                <BookshelfButton />
            </nav>
        </div>
    )
}

export default UserNav





