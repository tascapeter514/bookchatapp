import './DashboardNav.css'
import CloseMobileNav from '../Buttons/CloseMobileNav/CloseMobileNav'
import { Dispatch } from 'react';
import { MobileNavState, MobileNavAction } from '../../reducers/mobileNavReducer';
import UserNav from '../UserNav/UserNav'
import { ReactNode } from 'react';


interface Props {
    children: ReactNode

}


const DashboardNav = ({children}: Props) => {



    return(


        // <aside className={`dashboard-navbar ${mobileNav.open ? 'enter' : ''} ${mobileNav.isExiting ? 'exit' : ''}`}>
            
    
        // </aside>

        <aside className="dashboard-navbar">
            {children}
        </aside>





    )
}

export default DashboardNav

