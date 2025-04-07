import BookshelfPanel from '../Panels/BookshelfPanel/BookshelfPanel';
import BookclubsPanel from '../Panels/BookclubsPanel/BookclubsPanel';
import OpenMobileNav from '../Buttons/OpenMobileNav/OpenMobileNav';
import mobileNavReducer from '../../reducers/mobileNavReducer';
import userTabsReducer from '../../reducers/userTabsReducer';
import MessagePanel from '../Panels/MessagePanel/MessagePanel';
import AccountPanel from '../Panels/AccountPanel/AccountPanel';
import DashboardMain from '../DashboardMain/DashboardMain';
import DashboardNav from '../DashboardNav/DashboardNav';
import UserNav from '../UserNav/UserNav';
import CloseMobileNav from '../Buttons/CloseMobileNav/CloseMobileNav';
import { useReducer } from 'react';
import './UserDashboard.css';










const UserDashboard = () => {


    const [mobileNav, navDispatch] = useReducer(mobileNavReducer, {open: false, isExiting: false})
    const [userTabs, dispatchUserTabs] = useReducer(userTabsReducer, {activeTab: 'accountTab', activeBookshelf: ''})

    console.log('mobile nav:', mobileNav)


    return(
        <div className='dashboard-container'>

            <DashboardMain>
                <OpenMobileNav mobileNav={mobileNav} navDispatch={navDispatch} />
                {/* {userTabs.activeTab === 'accountTab' && <AccountPanel />} */}
                {/* {userTabs.activeTab === 'messagesTab' && <MessagePanel />}
                {userTabs.activeTab === 'bookclubTab' && <BookclubsPanel />}
                {userTabs.activeTab === 'bookshelfTab' && <BookshelfPanel />}  */}
            </DashboardMain>
            <DashboardNav>
                <CloseMobileNav mobileNav={mobileNav} navDispatch={navDispatch} />
                <UserNav></UserNav>
            </DashboardNav>
        </div>
    )
}

export default UserDashboard
