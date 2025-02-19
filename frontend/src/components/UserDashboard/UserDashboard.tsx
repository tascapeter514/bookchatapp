import './UserDashboard.css';
import { FC, useState } from 'react';
import Bookspanel from './components/BooksPanel/BooksPanel'
import BookclubPanel from './components/BookclubPanel/BookclubPanel';
import SettingsPanel from './components/SettingsPanel/SettingsPanel';
import Tabs from './components/Tabs/Tabs'
import Sidebar from './components/Sidebar/Sidebar'
import { userData } from '../common/UserContext'






const UserDashboard: FC = () => {

    
    const [activeTab, setActiveTab] = useState(0)
    const { activeUser } = userData()



    return(
        <div className='dashboard-container'>
            <main>

                <Tabs activeTab={activeTab} setActiveTab={setActiveTab}></Tabs>
  
                <div className="tab-panels-container container-flex">
                    {activeTab === 0 && (

                        <Bookspanel></Bookspanel>
                        
                    )}
                    {activeTab === 1 && (
                        <BookclubPanel ></BookclubPanel>
                    )}

                    {activeTab === 2 && (

                        <SettingsPanel user={activeUser}></SettingsPanel>  

                    )}
                </div>
                

            </main>
            <Sidebar></Sidebar>


            
        </div>
    )
}

export default UserDashboard

