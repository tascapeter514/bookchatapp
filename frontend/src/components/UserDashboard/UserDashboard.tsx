import './UserDashboard.css'
import { FC, useState } from 'react'
import { CurrentUser } from '../../types'

interface dashProps {
    user: CurrentUser | null
}

const UserDashboard: FC<dashProps> = ({user}) => {
    console.log('user:', user)
    
    const [activeTab, setActiveTab] = useState(0)
    const activeUser = localStorage.getItem('currentUser')


   const handleCurrentTab = (index: number) => {
        setActiveTab(index)
   }

   




    return(
        <div className='dashboard-container'>
            <main>
                <div className="tabs-container">
                    <ul arial-labelledby='tabs-title'>
                        <li 
                            onClick={() => handleCurrentTab(0)}
                            className={activeTab === 0 ? 'active' : ""}><a id='tab-1' href="#books">Books</a></li>
                        <li onClick={() => handleCurrentTab(1)}
                            className={activeTab === 1 ? 'active' : ""}><a id='tab-2' href="#bookclubs">BookClubs</a></li>
                        <li onClick={() => handleCurrentTab(2)}
                            className={activeTab === 2 ? 'active' : ""}><a id='tab-3' href="#settings">Settings</a></li>
                    </ul>
                </div>
                <div className="tabs_panels flow">
                    {activeTab === 0 && (
                        <div id='books' aria-labelledby='tab-1'>Books</div>
                    )}
                    {activeTab === 1 && (
                        <div id='bookclubs' aria-labelledby='tab-2'>BookClubs</div>
                    )}

                    {activeTab === 2 && (
                        <div id='settings' aria-labelledby='tab-3'>
                            <p>{activeUser ? JSON.parse(activeUser).username : ''}</p>
                        </div>
                    )}
                </div>

            </main>

            <aside className="sidebar">
                <div className="sidebar-widget">
                    <h2 className='widget-title'></h2>
                    <p className="widget-body"></p>
                </div>
            </aside>
            
        </div>
    )
}

export default UserDashboard

{/* <article className='article-featured'>
<h2 article-title></h2>
<p className="article-info"></p>
<p className="article-body"></p>
<a href="" className="article-read-more"></a>
</article>
<article className="article-recent">
<div className="article-recent-main"></div>
<div className="article-recent-secondary"></div>
<h2 className='article-title'></h2>
</article> */}