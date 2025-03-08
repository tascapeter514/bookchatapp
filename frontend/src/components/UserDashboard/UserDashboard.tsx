import './UserDashboard.css';
import { useState } from 'react';
import Bookshelfpanel from './components/BookshelfPanel/BookshelfPanel'
import MessagePanel from './components/MessagePanel/MessagePanel';
import AccountPanel from './components/AccountPanel/AccountPanel';
import ProfileNavbar from './components/ProfileNavbar/ProfileNavbar'
import BookclubsPanel from './components/BookclubsPanel/BookclubsPanel'


const panels = [
    <AccountPanel />,
    <MessagePanel />,
    <BookclubsPanel />,
]

const UserDashboard = () => {

    
    const [activeTab, setActiveTab] = useState(0)
    const [activeBookshelf, setActiveBookshelf] = useState<number>(4)
   
    const isBookshelfTab = activeTab >= 3
    const PanelComponent = () => { return isBookshelfTab ? <Bookshelfpanel activeBookshelf={activeBookshelf} /> : panels[activeTab] || null} 


    return(
        <div className='dashboard-container'>

            <main className='dashboard-main'>
            <button className='dashboardNavbar-mobile-toggle'>Profile</button>
                    <PanelComponent />
            </main>
            <aside className='dashboard-navbar'>
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

