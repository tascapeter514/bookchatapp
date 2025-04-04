import MessagePanel from '../Panels/MessagePanel/MessagePanel';
import AccountPanel from '../Panels/AccountPanel/AccountPanel';
import Bookshelfpanel from '../Panels/BookshelfPanel/BookshelfPanel'
import OpenMobileNav from '../Buttons/OpenMobileNav/OpenMobileNav';
import { Dispatch } from 'react';
import { MobileNavState, MobileNavAction } from '../../reducers/mobileNavReducer';
import './DashboardMain.css'

interface Props {
    mobileNav: MobileNavState,
    navDispatch: Dispatch<MobileNavAction>
}



const DashboardMain = ({mobileNav, navDispatch} : Props) => {


    return(

        <main className='dashboard-main'>
            <OpenMobileNav mobileNav={mobileNav} navDispatch={navDispatch} />
                {/* {userTabs.activeTab === 'accountTab' && <AccountPanel />}
                {userTabs.activeTab === 'messagesTab' && <MessagePanel />}
                {userTabs.activeTab === 'bookclubTab' && <BookclubsPanel />}
                {userTabs.activeTab === 'bookshelfTab' && <Bookshelfpanel />} */}
        </main>

    )
}

export default DashboardMain