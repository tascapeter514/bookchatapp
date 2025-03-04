import './UserDashboard.css';
import { FC, useState } from 'react';
import Bookspanel from './components/BooksPanel/BooksPanel'
import MessagePanel from './components/MessagePanel/MessagePanel';
import AccountPanel from './components/AccountPanel/AccountPanel';
import ProfileNavbar from './components/Sidebar/ProfileNavbar'



const UserDashboard: FC = () => {

    
    const [activeTab, setActiveTab] = useState(0)





    return(
        <div className='dashboard-container'>
            <main>

                
  
                <div className="tab-panels-container container-flex">
                    {activeTab === 0 && (

                        <AccountPanel></AccountPanel> 

                        
                        
                    )}
                    {activeTab === 1 && (

                    <div className="messages">Messages</div>
                        
                    )}

                    {activeTab === 2 && (

                        <Bookspanel></Bookspanel>
                    )}

                    {activeTab === 3 && (

                        <MessagePanel ></MessagePanel>
                        
                    )}
                </div>
                

            </main>
            
            <ProfileNavbar activeTab={activeTab} setActiveTab={setActiveTab}></ProfileNavbar>
            {/* <Sidebar></Sidebar> */}


            
        </div>
    )
}

export default UserDashboard

