import './UserDashboard.css';
import { useState } from 'react';
import Bookshelfpanel from './components/BookshelfPanel/BookshelfPanel'
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

    
    const [activeTab, setActiveTab] = useState(0)
    const [activeBookshelf, setActiveBookshelf] = useState<number>(4)
    const [activeNavbar, setActiveNavbar] = useState(false)
   
    const isBookshelfTab = activeTab >= 3
    const PanelComponent = () => { return isBookshelfTab ? <Bookshelfpanel activeBookshelf={activeBookshelf} /> : panels[activeTab] || null} 
    const toggleNavbar = () => setActiveNavbar(prev => !prev)


    return(
        <div className='dashboard-container'>

            <main className='dashboard-main'>
                <button className={`dashboardNavbar-mobile-toggle ${activeNavbar ? 'active' : ''}`} onClick={toggleNavbar}><UserIcon /></button>
                    <PanelComponent />
            </main>
            <aside className={`dashboard-navbar ${activeNavbar ? 'active' : ''}`}>
                <button className={`dashboardNavbar-close-toggle ${activeNavbar ? 'active' : ''}`} onClick={toggleNavbar}><CloseIcon /></button>
                
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

