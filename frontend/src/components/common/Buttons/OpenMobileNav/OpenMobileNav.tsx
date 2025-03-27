import { Dispatch } from 'react';
import { MobileNavAction, MobileNavState } from '../../../../reducers/mobileNavReducer';
import { UserIcon } from '../../Icons'
import './OpenMobileNav.css'


interface Props {
    mobileNav: MobileNavState,
    navDispatch: Dispatch<MobileNavAction>
}

const OpenMobileNav = ({mobileNav, navDispatch}: Props) => {

    // const [showNavbar, setShowNavbar] = useState(false);
    // const [isExiting, setIsExiting] = useState(false)
   
    // const toggleNavbar = () => {
    //     setShowNavbar(prev => !prev)
    //     if (showNavbar) {
    //         setIsExiting(true)
    //         setTimeout(() => {
    //             setShowNavbar(false)
    //             setIsExiting(false)
    //         }, 350)
    //     } else {
    //         setShowNavbar(true)
    //     }
    // }

    console.log('mobile nav open:', mobileNav.open)

    return(
        <>
            <button 
                className={`dashboardNavbar-mobile-toggle ${mobileNav.open ? '' : 'active'}`} 
                onClick={() => navDispatch({type: 'OPEN_MOBILE_NAV', payload: true})}
            >
                <UserIcon />
            </button>  
        </>
    )

}

export default OpenMobileNav