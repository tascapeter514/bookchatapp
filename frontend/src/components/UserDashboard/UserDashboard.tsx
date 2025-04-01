import './UserDashboard.css';
import { useReducer } from 'react';
import mobileNavReducer from '../../reducers/mobileNavReducer';
import { userContext} from '../common/Context/UserContext/UserContext'
import Bookshelfpanel from '../common/BookshelfPanel/BookshelfPanel'
import OpenMobileNav from '../common/Buttons/OpenMobileNav/OpenMobileNav';
import CloseMobileNav from '../common/Buttons/CloseMobileNav/CloseMobileNav';
import MessagePanel from './components/MessagePanel/MessagePanel';
import AccountPanel from './components/AccountPanel/AccountPanel';
import UserNav from '../UserNav/UserNav'
import BookclubsPanel from './components/BookclubsPanel/BookclubsPanel'


const UserDashboard = () => {

    const { userTabs } = userContext()
    const [mobileNav, navDispatch] = useReducer(mobileNavReducer, {open: false, isExiting: false})

    const { userState } = userContext()

    console.log('user dashboard user state:', userState)

    return(
        <div className='dashboard-container'>

            <main className='dashboard-main'>
                <OpenMobileNav mobileNav={mobileNav} navDispatch={navDispatch} />
                    {userTabs.activeTab === 'accountTab' && <AccountPanel />}
                    {userTabs.activeTab === 'messagesTab' && <MessagePanel />}
                    {userTabs.activeTab === 'bookclubTab' && <BookclubsPanel />}
                    {userTabs.activeTab === 'bookshelfTab' && <Bookshelfpanel />}
            </main>
            <aside className={`dashboard-navbar ${mobileNav.open ? 'enter' : ''} ${mobileNav.isExiting ? 'exit' : ''}`}>
                <CloseMobileNav mobileNav={mobileNav} navDispatch={navDispatch} />
                <UserNav></UserNav>
            
            </aside>
        </div>
    )
}

export default UserDashboard

