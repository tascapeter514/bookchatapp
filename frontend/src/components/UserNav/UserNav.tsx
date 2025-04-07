
import BookshelfButton from '../TabButtons/BookshelfButton/BookshelfButton'
import BookclubButton from '../TabButtons/BookclubButton/BookclubButton'
import { RootState } from '../../store/store'
import { MobileNavState } from '../../reducers/mobileNavReducer'
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

interface Props {
    mobileNav: MobileNavState
}

const UserNav = ({mobileNav}: Props) => {


    console.log('user nav mobile nav:', mobileNav)

    return(
        <div className={`navbar-container ${mobileNav.open ? 'enter' : ''} ${mobileNav.isExiting ? 'exit' : ''}`}>
            <ProfileHeader />
            <nav className='profile-navbar'>
                {/* <AccountButton /> */}
                {/* // <MessageButton /> */}
                <BookclubButton />
                <BookshelfButton />
            </nav>
        </div>
    )
}

export default UserNav



