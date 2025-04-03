import './UserDashboard.css';
import { useReducer } from 'react';
import mobileNavReducer from '../../reducers/mobileNavReducer';
import Bookshelfpanel from '../Panels/BookshelfPanel/BookshelfPanel'
import OpenMobileNav from '../Buttons/OpenMobileNav/OpenMobileNav';
import CloseMobileNav from '../Buttons/CloseMobileNav/CloseMobileNav';
import MessagePanel from '../Panels/MessagePanel/MessagePanel';
import AccountPanel from '../Panels/AccountPanel/AccountPanel';
import UserNav from '../UserNav/UserNav'
import BookclubsPanel from '../Panels/BookclubsPanel/BookclubsPanel';


const UserDashboard = () => {


    const [mobileNav, navDispatch] = useReducer(mobileNavReducer, {open: false, isExiting: false})


    return(
        <div className='dashboard-container'>

            <main className='dashboard-main'>
                <OpenMobileNav mobileNav={mobileNav} navDispatch={navDispatch} />
                    {/* {userTabs.activeTab === 'accountTab' && <AccountPanel />}
                    {userTabs.activeTab === 'messagesTab' && <MessagePanel />}
                    {userTabs.activeTab === 'bookclubTab' && <BookclubsPanel />}
                    {userTabs.activeTab === 'bookshelfTab' && <Bookshelfpanel />} */}
            </main>
            <aside className={`dashboard-navbar ${mobileNav.open ? 'enter' : ''} ${mobileNav.isExiting ? 'exit' : ''}`}>
                <CloseMobileNav mobileNav={mobileNav} navDispatch={navDispatch} />
                <UserNav></UserNav>
            
            </aside>
        </div>
    )
}

export default UserDashboard

