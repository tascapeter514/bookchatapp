import { Dispatch } from 'react';
import { MobileNavAction, MobileNavState } from '../../../reducers/mobileNavReducer';
import { CloseIcon } from '../../Icons'
import './CloseMobileNav.css'

interface Props {
    mobileNav: MobileNavState,
    navDispatch: Dispatch<MobileNavAction>
}


const CloseMobileNav = ({mobileNav, navDispatch}: Props) => {


    return(
        <button 
            className={`dashboardNavbar-close-toggle ${mobileNav.open ? 'active' : ''}`}
            aria-controls='dashboard-navbar'
            aria-expanded={mobileNav.open} 
            onClick={() => { navDispatch({type: 'CLOSING_MOBILE_NAV', payload: true});
            setTimeout(() => {navDispatch({type: 'CLOSED_MOBILE_NAV', payload: false})}, 350)}}
        >
            <CloseIcon />
        </button>
    )

}

export default CloseMobileNav 