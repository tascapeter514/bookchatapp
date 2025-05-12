import { Dispatch } from 'react';
import { MobileNavAction, MobileNavState } from '../../../reducers/mobileNavReducer';
import './CloseUserMobileNav.css'

interface Props {
    mobileNav: MobileNavState,
    navDispatch: Dispatch<MobileNavAction>,
    children: React.ReactNode
}


const CloseUserMobileNav = ({mobileNav, navDispatch, children}: Props) => {




    return(
        <button 
            className={`close-user-nav-toggle ${mobileNav.open ? 'active' : ''}`}
            aria-controls='dashboard-navbar'
            aria-expanded={mobileNav.open} 
            onClick={() => {
                navDispatch({type: 'CLOSING_MOBILE_NAV', payload: true}) 
                setTimeout(() => {navDispatch({type: 'CLOSED_MOBILE_NAV', payload: false})}, 350)
            }}
        >
            {children}
            
        </button>
    )

}

export default CloseUserMobileNav 