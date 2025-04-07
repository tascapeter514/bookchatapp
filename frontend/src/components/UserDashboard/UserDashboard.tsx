import BookshelfButton from '../TabButtons/BookshelfButton/BookshelfButton';
import BookclubButton from '../TabButtons/BookclubButton/BookclubButton';
import AccountButton from '../TabButtons/AccountButton/AccountButton';
import MessageButton from '../TabButtons/MessageButton/MessageButton';
import CloseMobileNav from '../Buttons/CloseMobileNav/CloseMobileNav';
import BookshelfPanel from '../Panels/BookshelfPanel/BookshelfPanel';
import BookclubsPanel from '../Panels/BookclubsPanel/BookclubsPanel';
import OpenMobileNav from '../Buttons/OpenMobileNav/OpenMobileNav';
import MessagePanel from '../Panels/MessagePanel/MessagePanel';
import AccountPanel from '../Panels/AccountPanel/AccountPanel';
import mobileNavReducer from '../../reducers/mobileNavReducer';
import userTabsReducer from '../../reducers/userTabsReducer';
import DashboardMain from '../DashboardMain/DashboardMain';
import DashboardNav from '../DashboardNav/DashboardNav';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { useReducer } from 'react';
import './UserDashboard.css';

const ProfileHeader = () => {
    const {user} = useSelector((state: RootState) => state.auth)
    return(
        <div className="profile-header">
            <h1>Hi {user?.firstName}!</h1>
            <span>Member since {user?.dateJoined}</span>
        </div>
    )

}

const UserDashboard = () => {


    const [mobileNav, navDispatch] = useReducer(mobileNavReducer, {open: false, isExiting: false})
    const [userTabs, dispatchUserTabs] = useReducer(userTabsReducer, {activeTab: 'accountTab', activeBookshelf: ''})


    return(
        <div className='dashboard-container'>
            <DashboardMain>
                <OpenMobileNav mobileNav={mobileNav} navDispatch={navDispatch} />
                {userTabs.activeTab === 'accountTab' && <AccountPanel />}
                {userTabs.activeTab === 'messagesTab' && <MessagePanel />}
                {userTabs.activeTab === 'bookclubTab' && <BookclubsPanel />}
                {userTabs.activeTab === 'bookshelfTab' && <BookshelfPanel />}
            </DashboardMain>
            <DashboardNav mobileNav={mobileNav}>
                <CloseMobileNav mobileNav={mobileNav} navDispatch={navDispatch} />
                <ProfileHeader></ProfileHeader>
                <AccountButton userTabs={userTabs} dispatchUserTabs={dispatchUserTabs}/>
                <MessageButton userTabs={userTabs} dispatchUserTabs={dispatchUserTabs}/>
                <BookclubButton userTabs={userTabs} dispatchUserTabs={dispatchUserTabs}/>
                <BookshelfButton userTabs={userTabs} dispatchUserTabs={dispatchUserTabs}/>
            </DashboardNav>
        </div>
    )
}

export default UserDashboard
