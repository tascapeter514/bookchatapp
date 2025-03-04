import './UserDashboard.css';
import { FC, useState } from 'react';
import Bookspanel from './components/BooksPanel/BooksPanel'
import BookclubPanel from './components/BookclubPanel/BookclubPanel';
import SettingsPanel from './components/SettingsPanel/SettingsPanel';
import ProfileNavbar from './components/Sidebar/ProfileNavbar'
import Tabs from '../common/Tabs/Tabs'
import Sidebar from './components/Sidebar/Sidebar'


const UserDashboard: FC = () => {

    
    const [activeTab, setActiveTab] = useState(0)
    const tabContents = ['Books', 'Bookclubs', 'Settings']




    return(
        <div className='dashboard-container'>
            <main>

                
  
                <div className="tab-panels-container container-flex">
                    {activeTab === 0 && (

                        <SettingsPanel></SettingsPanel> 

                        
                        
                    )}
                    {activeTab === 1 && (
                        <BookclubPanel ></BookclubPanel>
                    )}

                    {activeTab === 2 && (

                        <Bookspanel></Bookspanel>
                    )}

                    {activeTab === 3 && (
                        <div className="messages">Messages</div>
                    )}
                </div>
                

            </main>
            <ProfileNavbar activeTab={activeTab} setActiveTab={setActiveTab}></ProfileNavbar>
            {/* <Sidebar></Sidebar> */}


            
        </div>
    )
}

export default UserDashboard

