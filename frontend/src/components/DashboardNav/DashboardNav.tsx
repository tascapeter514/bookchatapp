import { ReactNode } from 'react';
import { MobileNavState } from '../../reducers/mobileNavReducer';
import './DashboardNav.css'

interface Props {
    children: ReactNode,
    mobileNav: MobileNavState

}

const DashboardNav = ({children, mobileNav}: Props) => {

    return(
        <aside className={`dashboard-navbar ${mobileNav.open ? 'enter' : ''} ${mobileNav.isExiting ? 'exit' : ''}`}>
            {children}
        </aside>
    )
}

export default DashboardNav

