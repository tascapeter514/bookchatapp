import './UserDashboard.css';
import { useReducer } from 'react';
import mobileNavReducer from '../../reducers/mobileNavReducer';
import { BookshelfData } from '../../types';
import { userContext} from '../common/Context/UserContext/UserContext'
import Bookshelfpanel from '../common/BookshelfPanel/BookshelfPanel'
import OpenMobileNav from '../common/Buttons/OpenMobileNav/OpenMobileNav';
import CloseMobileNav from '../common/Buttons/CloseMobileNav/CloseMobileNav';
import MessagePanel from './components/MessagePanel/MessagePanel';
import AccountPanel from './components/AccountPanel/AccountPanel';
import UserTabs from '../UserTabs/UserTabs'
import BookclubsPanel from './components/BookclubsPanel/BookclubsPanel'




const UserDashboard = () => {

    const { userData, userTabs }   = userContext()
    const bookshelves = userData.find(data => data.type === 'bookshelf') as BookshelfData | undefined
    const [mobileNav, navDispatch] = useReducer(mobileNavReducer, {open: false, isExiting: false})
   

    // console.log('active user:', activeUser)
    // console.log('user data:', userData)

    return(
        <div className='dashboard-container'>

            <main className='dashboard-main'>
                <OpenMobileNav mobileNav={mobileNav} navDispatch={navDispatch} />
                    {userTabs.activeTab === 'accountTab' && <AccountPanel />}
                    {userTabs.activeTab === 'messagesTab' && <MessagePanel />}
                    {userTabs.activeTab === 'bookclubTab' && <BookclubsPanel />}
                    {userTabs.activeTab === 'bookshelfTab' && <Bookshelfpanel bookshelves={bookshelves}/>}
            </main>
            <aside className={`dashboard-navbar ${mobileNav.open ? 'enter' : ''} ${mobileNav.isExiting ? 'exit' : ''}`}>
                <CloseMobileNav mobileNav={mobileNav} navDispatch={navDispatch} />
                
                
                <UserTabs></UserTabs>
            
            </aside>
        </div>
    )
}

export default UserDashboard

