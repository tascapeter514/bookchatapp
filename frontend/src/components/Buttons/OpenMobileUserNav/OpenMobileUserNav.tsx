import { Dispatch } from 'react';
import { MobileNavAction, MobileNavState } from '../../../reducers/mobileNavReducer';
import { UserIcon } from '../../Icons'
import './OpenMobileUserNav.css'


interface Props {
    mobileNav: MobileNavState,
    navDispatch: Dispatch<MobileNavAction>
}

const OpenMobileUserNav = ({mobileNav, navDispatch}: Props) => {


    return(
        <>
            <button 
                className={`open-toggle ${mobileNav.open ? 'closed' : ''}`} 
                onClick={() => navDispatch({type: 'OPEN_MOBILE_NAV', payload: true})}
            >
                <UserIcon />
            </button>  
        </>
    )

}

export default OpenMobileUserNav