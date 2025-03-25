import './UserDashboard.css';
import { useState } from 'react';
import { BookshelfData } from '../../types';
import { userContext} from '../common/Context/UserContext/UserContext'
import Bookshelfpanel from '../common/BookshelfPanel/BookshelfPanel'
import MessagePanel from './components/MessagePanel/MessagePanel';
import AccountPanel from './components/AccountPanel/AccountPanel';
import UserTabs from '../UserTabs/UserTabs'
import BookclubsPanel from './components/BookclubsPanel/BookclubsPanel'
import { UserIcon, CloseIcon } from '../common/Icons'



const UserDashboard = () => {

    const { userData }   = userContext()
    const bookshelves = userData.find(data => data.type === 'bookshelf') as BookshelfData | undefined
    const [activeTab, setActiveTab] = useState<number>(NaN);
    const [activeBookshelf, setActiveBookshelf] = useState<number>(3);
    const [showNavbar, setShowNavbar] = useState(false);
    const [isExiting, setIsExiting] = useState(false)
   
   
    const isBookshelfTab = activeTab >= 3
    const toggleNavbar = () => {
        setShowNavbar(prev => !prev)
        if (showNavbar) {
            setIsExiting(true)
            setTimeout(() => {
                setShowNavbar(false)
                setIsExiting(false)
            }, 350)
        } else {
            setShowNavbar(true)
        }
    }

    // console.log('active user:', activeUser)
    // console.log('user data:', userData)

    return(
        <div className='dashboard-container'>

            <main className='dashboard-main'>
                <button className={`dashboardNavbar-mobile-toggle ${showNavbar ? '' : 'active'}`} onClick={toggleNavbar}><UserIcon /></button>
                    {activeTab === 0 && <AccountPanel />}
                    {activeTab === 1 && <MessagePanel />}
                    {activeTab === 2 && <BookclubsPanel />}
                    {activeTab === 3 && <Bookshelfpanel bookshelves={bookshelves} activeBookshelf={activeBookshelf} />}
            </main>
            <aside className={`dashboard-navbar ${showNavbar ? 'enter' : ''} ${isExiting ? 'exit' : ''}`}>
                <button 
                        className={`dashboardNavbar-close-toggle ${showNavbar ? 'active' : ''}`}
                        aria-controls='dashboard-navbar'
                        aria-expanded={showNavbar} 
                        onClick={toggleNavbar}
                    >
                        <CloseIcon />
                </button>
                
                <UserTabs activeTab={activeTab} setActiveTab={setActiveTab}></UserTabs>
            
            </aside>
        </div>
    )
}

export default UserDashboard

