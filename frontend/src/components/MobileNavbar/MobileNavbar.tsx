
// import { MobileNavState } from '../../reducers/mobileNavReducer';
import { Link } from 'react-router-dom';
import OpenMobileNav from '../Buttons/OpenMobileNav/OpenMobileNav';
import CloseMobileNav from '../Buttons/CloseMobileNav/CloseMobileNav';
import OpenSearchbar from '../Buttons/OpenSearchbar/OpenSearchbar';
import { HamburgerIcon, CloseHamburgerIcon } from '../Icons';
import mobileNavReducer from '../../reducers/mobileNavReducer';
import { useReducer } from 'react';
// import OpenMobileSearch from '../Buttons/OpenMobileSearch/OpenMobileSearch';
// import { SearchResultsData } from '../../types';
// import NavigationSearchbar from '../Search/NavigationSearchbar/NavigationSearchbar';
// import { WEBSOCKET_BASE } from '../../utils/baseAPI';
import './MobileNavbar.css'
// import Links from '../Mappers/Links/Links';

interface Props {
    authToken: string,
    handleLogout: () => Promise<void>

}

const MobileNavbar = ({ authToken, handleLogout}: Props) => {


    const [mobileNav, dispatchNav] = useReducer(mobileNavReducer, {open: false, isExiting: false})


    return(
        <div className='mobile-navbar-container'>
            <div className='mobile-navbar-buttons'>
                <OpenSearchbar/>
                <OpenMobileNav mobileNav={mobileNav} navDispatch={dispatchNav}><HamburgerIcon /></OpenMobileNav>
                <CloseMobileNav mobileNav={mobileNav} navDispatch={dispatchNav}><CloseHamburgerIcon /></CloseMobileNav>
            </div>  
            <aside className={`mobile-navbar ${mobileNav.open ? 'open' : ''}`}>
                <ul className='mobile-navbar-list' onClick={() => mobileNav.open = false}>
                    <li className='mobile-list-element'><Link to='/'>Home</Link></li>
                    <li className='mobile-list-element'><Link to='/books'>Books</Link></li>
                    <li className='mobile-list-element'><Link to='#'>Authors</Link></li>
                    <li className='mobile-list-element'><Link to='#'>About</Link></li>
                    <li className="mobile-auth-links">
                        {authToken ? (
                            <>
                                <Link className='mobile-profile-link' to='/userDashboard'>Profile</Link>
                                <a className='mobile-logout-link' onClick={handleLogout}>Logout</a>
                            </>
                            
                        ) : (
                            <Link className='mobile-login-link' to='/login'>Log In</Link>
                        )}
                    </li>
                
                </ul>
                
            </aside>
        
        </div>
        
    )
}

export default MobileNavbar





