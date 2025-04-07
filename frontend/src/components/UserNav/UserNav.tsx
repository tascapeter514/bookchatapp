
import BookshelfButton from '../TabButtons/BookshelfButton/BookshelfButton'
import BookclubButton from '../TabButtons/BookclubButton/BookclubButton'
import { RootState } from '../../store/store'
import { MobileNavState } from '../../reducers/mobileNavReducer'
import { useSelector } from 'react-redux'


import './UserNav.css'




interface Props {
    mobileNav: MobileNavState
}

const UserNav = ({mobileNav}: Props) => {


    console.log('user nav mobile nav:', mobileNav)

    return(
        <div className={`navbar-container ${mobileNav.open ? 'enter' : ''} ${mobileNav.isExiting ? 'exit' : ''}`}>

            {/* <AccountButton /> */}
            {/* // <MessageButton /> */}
            {/* <BookclubButton />
            <BookshelfButton /> */}

        </div>
    )
}

export default UserNav



