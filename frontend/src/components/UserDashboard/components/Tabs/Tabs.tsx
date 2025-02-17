import './Tabs.css'
import { Dispatch, SetStateAction } from 'react'


interface TabsProps {
    setActiveTab: Dispatch<SetStateAction<number>>,
    activeTab: number
}




const Tabs: React.FC<TabsProps> = ({activeTab, setActiveTab}) => {

    return(

        <div className="tabs-container">
            <ul arial-labelledby='tabs-title'>
                <li 
                    onClick={() => setActiveTab(0)}
                    className={activeTab === 0 ? 'active' : ""}><a id='tab-1' href="#books">Books</a></li>
                <li onClick={() => setActiveTab(1)}
                    className={activeTab === 1 ? 'active' : ""}><a id='tab-2' href="#bookclubs">BookClubs</a></li>
                <li onClick={() => setActiveTab(2)}
                    className={activeTab === 2 ? 'active' : ""}><a id='tab-3' href="#settings">Settings</a></li>
            </ul>
        </div>





    )

}

export default Tabs