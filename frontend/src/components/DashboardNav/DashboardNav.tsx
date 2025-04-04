import './DashboardNav.css'
import CloseMobileNav from '../Buttons/CloseMobileNav/CloseMobileNav'
import { Dispatch } from 'react';
import { MobileNavState, MobileNavAction } from '../../reducers/mobileNavReducer';
import UserNav from '../UserNav/UserNav'


interface Props {
    mobileNav: MobileNavState,
    navDispatch: Dispatch<MobileNavAction>

}


const DashboardNav = ({mobileNav, navDispatch}: Props) => {



    return(


        <aside className={`dashboard-navbar ${mobileNav.open ? 'enter' : ''} ${mobileNav.isExiting ? 'exit' : ''}`}>
            <CloseMobileNav mobileNav={mobileNav} navDispatch={navDispatch} />
            <UserNav></UserNav>
    
        </aside>





    )
}

export default DashboardNav