import { Dispatch } from 'react';
import { MobileNavAction, MobileNavState } from '../../../reducers/mobileNavReducer';
import './OpenUserMobileNav.css'


interface Props {
    mobileNav: MobileNavState,
    navDispatch: Dispatch<MobileNavAction>,
    children: React.ReactNode

}

const OpenUserMobileNav = ({mobileNav, navDispatch, children}: Props) => {


    return(
        <>
            <button 
                className={`open-user-nav-toggle ${mobileNav.open ? 'closed' : ''}`} 
                onClick={() => navDispatch({type: 'OPEN_MOBILE_NAV', payload: true})}
            >
                {children}
            </button>  
        </>
    )

}

export default OpenUserMobileNav