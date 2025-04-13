import CreateBookshelfModal from '../Modals/CreateBookshelfModal/CreateBookshelfModal';
import BookshelfButton from '../TabButtons/BookshelfButton/BookshelfButton';
import BookclubButton from '../TabButtons/BookclubButton/BookclubButton';
import AccountButton from '../TabButtons/AccountButton/AccountButton';
import MessageButton from '../TabButtons/MessageButton/MessageButton';
import CloseMobileNav from '../Buttons/CloseMobileNav/CloseMobileNav';
import BookshelfPanel from '../Panels/BookshelfPanel/BookshelfPanel';
import BookclubsPanel from '../Panels/BookclubsPanel/BookclubsPanel';
import NavbarDivider from '../Dividers/NavbarDivider/NavbarDivider';
import { useGetUserDataQuery } from '../../slices/userDataApiSlice';
import OpenMobileNav from '../Buttons/OpenMobileNav/OpenMobileNav';
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
import { useNavigate } from 'react-router-dom';
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

    const navigate = useNavigate()
    const { user } = useSelector((state: RootState) => state.auth, shallowEqual)
    const { data, isLoading } = useGetUserDataQuery(user.id)

    const bookclubs = data?.bookclubs ?? []
    const bookshelves = data?.bookshelves ?? []
    const invitations = data?.invitations ?? []

    
    const [mobileNav, navDispatch] = useReducer(mobileNavReducer, {open: false, isExiting: false})
    const [userTabs, dispatchUserTabs] = useReducer(tabsReducer, {activeTab: 'accountTab', activeBookshelf: ''})

    
    if (isLoading) return <><LoadSpinner /></>
    


    console.log('user dashboard data:', data)
    // console.log('user dashboard bookshelves:', bookshelves)

    return(
        <div className='dashboard-container'>
  
            <DashboardMain>
                <OpenMobileNav mobileNav={mobileNav} navDispatch={navDispatch} />
                {userTabs.activeTab === 'accountTab' && <AccountPanel />}
                {userTabs.activeTab === 'messagesTab' && <MessagePanel invitations={invitations} />}
                {userTabs.activeTab === 'bookclubTab' && <BookclubsPanel bookclubs={bookclubs}/>}
                {userTabs.activeTab === 'bookshelfTab' && <BookshelfPanel userTabs={userTabs} bookshelves={bookshelves}/>}
            </DashboardMain>
            <DashboardNav mobileNav={mobileNav}>
                <CloseMobileNav mobileNav={mobileNav} navDispatch={navDispatch} />
                <ProfileHeader user={user}/>
                <AccountButton userTabs={userTabs} dispatchUserTabs={dispatchUserTabs}/>
                <MessageButton userTabs={userTabs} dispatchUserTabs={dispatchUserTabs}/>
                <BookclubButton userTabs={userTabs} dispatchUserTabs={dispatchUserTabs}/>
                <BookshelfButton>
                    <NavbarDivider />
                    <BookshelfTabs userTabs={userTabs} dispatchUserTabs={dispatchUserTabs} bookshelves={bookshelves} />
                    <CreateBookshelfModal />
                </BookshelfButton>
            </DashboardNav>
        </div>
    )
}

export default UserDashboard


