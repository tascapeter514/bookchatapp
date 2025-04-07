import { Dispatch } from 'react';
import { MobileNavAction, MobileNavState } from '../../../reducers/mobileNavReducer';
import { UserIcon } from '../../Icons'
import './OpenMobileNav.css'


interface Props {
    mobileNav: MobileNavState,
    navDispatch: Dispatch<MobileNavAction>
}

const OpenMobileNav = ({mobileNav, navDispatch}: Props) => {


    // console.log('open mobile nav:', mobileNav)

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

export default OpenMobileNav