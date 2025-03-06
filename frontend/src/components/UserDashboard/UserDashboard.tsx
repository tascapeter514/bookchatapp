import './UserDashboard.css';
import { FC, useState } from 'react';
import Bookspanel from './components/BooksPanel/BooksPanel'
import MessagePanel from './components/MessagePanel/MessagePanel';
import AccountPanel from './components/AccountPanel/AccountPanel';
import ProfileNavbar from './components/Sidebar/ProfileNavbar'
import BookclubsPanel from './components/BookclubsPanel/BookclubsPanel'



const UserDashboard: FC = () => {

    
    const [activeTab, setActiveTab] = useState(0)





    return(
        <div className='dashboard-container'>
            <main className='dashboard-main'>

                
  
                <div className="tab-panels-container container-flex">
                    {activeTab === 0 && (

                        <AccountPanel></AccountPanel> 

                        
                        
                    )}
                    {activeTab === 1 && (

                        <MessagePanel ></MessagePanel>

                        

                        

                    
                        
                    )}

                    {activeTab === 2 && (

                        <BookclubsPanel></BookclubsPanel>

                        
                    )}

                    {activeTab === 3 && (


                        <Bookspanel></Bookspanel>

                        

                        
                        
                    )}
                </div>
                

            </main>
            
            <ProfileNavbar activeTab={activeTab} setActiveTab={setActiveTab}></ProfileNavbar>
            


            
        </div>
    )
}

export default UserDashboard

