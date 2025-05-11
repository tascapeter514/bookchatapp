import { Dispatch } from 'react';
import { MobileNavAction, MobileNavState } from '../../../reducers/mobileNavReducer';
import './OpenMobileNav.css'


interface Props {
    mobileNav: MobileNavState,
    navDispatch: Dispatch<MobileNavAction>,
    children: React.ReactNode

}

const OpenMobileNav = ({mobileNav, navDispatch, children}: Props) => {


    return(
        <>
            <button 
                className={`open-toggle ${mobileNav.open ? 'closed' : ''}`} 
                onClick={() => navDispatch({type: 'OPEN_MOBILE_NAV', payload: true})}
            >
                {children}
            </button>  
        </>
    )

}

export default OpenMobileNav