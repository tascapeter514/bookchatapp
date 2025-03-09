import './UserDashboard.css';
import { useState } from 'react';
import { userData } from '../common/UserContext'
import Bookshelfpanel from '../common/BookshelfPanel/BookshelfPanel'
import MessagePanel from './components/MessagePanel/MessagePanel';
import AccountPanel from './components/AccountPanel/AccountPanel';
import ProfileNavbar from './components/ProfileNavbar/ProfileNavbar'
import BookclubsPanel from './components/BookclubsPanel/BookclubsPanel'
import { UserIcon, CloseIcon } from '../common/Icons'


const panels = [
    <AccountPanel />,
    <MessagePanel />,
    <BookclubsPanel />,
]

const UserDashboard = () => {

    
    const [activeTab, setActiveTab] = useState(0);
    const [activeBookshelf, setActiveBookshelf] = useState<number>(4);
    const [showNavbar, setShowNavbar] = useState(false);
    const [isExiting, setIsExiting] = useState(false)
    const { userBookshelves }   = userData()
   
    const isBookshelfTab = activeTab >= 3
    const PanelComponent = () =>
          isBookshelfTab ? <Bookshelfpanel bookshelves={userBookshelves} activeBookshelf={activeBookshelf} /> : panels[activeTab] || null 
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


    return(
        <div className='dashboard-container'>

            <main className='dashboard-main'>
                <button className={`dashboardNavbar-mobile-toggle ${showNavbar ? '' : 'active'}`} onClick={toggleNavbar}><UserIcon /></button>
                    <PanelComponent />
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
                
                
                <ProfileNavbar 
                    activeTab={activeTab} 
                    setActiveTab={setActiveTab} 
                    activeBookshelf={activeBookshelf}
                    setActiveBookshelf={setActiveBookshelf}
                >

                </ProfileNavbar>
            </aside>
            
          
            


            
        </div>
    )
}

export default UserDashboard

