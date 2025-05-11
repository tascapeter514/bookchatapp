import CreateBookshelfModal from '../Modals/CreateBookshelfModal/CreateBookshelfModal';
import BookshelfButton from '../TabButtons/BookshelfButton/BookshelfButton';
import BookclubButton from '../TabButtons/BookclubButton/BookclubButton';
import AccountButton from '../TabButtons/AccountButton/AccountButton';
import MessageButton from '../TabButtons/MessageButton/MessageButton';
import CloseMobileUserNav from '../Buttons/CloseMobileNav/CloseMobileNav';
import BookshelfPanel from '../Panels/BookshelfPanel/BookshelfPanel';
import BookclubsPanel from '../Panels/BookclubsPanel/BookclubsPanel';
import NavbarDivider from '../Dividers/NavbarDivider/NavbarDivider';
import { useGetUserDataQuery } from '../../slices/userDataApiSlice';
import OpenMobileUserNav from '../Buttons/OpenMobileUserNav/OpenMobileUserNav';
import LoadSpinner from '../LoadSpinner/LoadSpinner';
import MessagePanel from '../Panels/MessagePanel/MessagePanel';
import AccountPanel from '../Panels/AccountPanel/AccountPanel';
import mobileNavReducer from '../../reducers/mobileNavReducer';
import tabsReducer from '../../reducers/tabsReducer';
import BookshelfTabs from '../BookshelfTabs/BookshelfTabs';
import DashboardMain from '../DashboardMain/DashboardMain';
import DashboardNav from '../DashboardNav/DashboardNav';
import { ActiveUser } from '../../types';
import { RootState } from '../../store/store';
import { useSelector,  shallowEqual } from 'react-redux';
import { useReducer } from 'react';
import './UserDashboard.css';


interface Props {
    user: ActiveUser
}

const ProfileHeader = ({user}: Props) => {

    return(
        <div className="profile-header">
            <h1>Hi {user?.firstName}!</h1>
            <span>Member since {user?.dateJoined}</span>
        </div>
    )

}

const UserDashboard = () => {

    const { user } = useSelector((state: RootState) => state.auth, shallowEqual)
    const { data: userData, isLoading } = useGetUserDataQuery(user.id)
 

    const bookclubs = userData?.bookclubs ?? []
    const bookshelves = userData?.bookshelves ?? []
    const invitations = userData?.invitations ?? []

    

    
    const [mobileNav, navDispatch] = useReducer(mobileNavReducer, {open: false, isExiting: false})
    const [userTabs, dispatchUserTabs] = useReducer(tabsReducer, {activeTab: 'accountPanel', activeBookshelf: ''})

    
    if (isLoading) return <><LoadSpinner /></>
    


    console.log('user dashboard data:', userData)


    return(
        <div className='dashboard-container'>
  
            <DashboardMain>
                <OpenMobileUserNav mobileNav={mobileNav} navDispatch={navDispatch} />
                {userTabs.activeTab === 'accountPanel' && <AccountPanel />}
                {userTabs.activeTab === 'messagesPanel' && <MessagePanel invitations={invitations} />}
                {userTabs.activeTab === 'bookclubPanel' && <BookclubsPanel bookclubs={bookclubs}/>}
                {userTabs.activeTab === 'bookshelfPanel' && <BookshelfPanel tabs={userTabs} bookshelves={bookshelves} id={user.id}/>}
            </DashboardMain>
            <DashboardNav mobileNav={mobileNav}>
                <CloseMobileUserNav mobileNav={mobileNav} navDispatch={navDispatch} />
                <ProfileHeader user={user}/>
                <AccountButton userTabs={userTabs} dispatchUserTabs={dispatchUserTabs}/>
                <MessageButton userTabs={userTabs} dispatchUserTabs={dispatchUserTabs}/>
                <BookclubButton userTabs={userTabs} dispatchUserTabs={dispatchUserTabs}/>
                <BookshelfButton>
                    <NavbarDivider />
                    <BookshelfTabs tabs={userTabs} dispatchTabs={dispatchUserTabs} bookshelves={bookshelves} />
                    <CreateBookshelfModal />
                </BookshelfButton>
            </DashboardNav>
        </div>
    )
}

export default UserDashboard


