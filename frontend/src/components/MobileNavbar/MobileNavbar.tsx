
import { MobileNavState } from '../../reducers/mobileNavReducer';
import { Link } from 'react-router-dom';
// import { useState } from 'react';
// import OpenMobileSearch from '../Buttons/OpenMobileSearch/OpenMobileSearch';
// import { SearchResultsData } from '../../types';
// import NavigationSearchbar from '../Search/NavigationSearchbar/NavigationSearchbar';
// import { WEBSOCKET_BASE } from '../../utils/baseAPI';
import './MobileNavbar.css'
// import Links from '../Mappers/Links/Links';

interface Props {
    mobileNav: MobileNavState
    authToken: string,
    handleLogout: () => Promise<void>

}

const MobileNavbar = ({ mobileNav, authToken, handleLogout}: Props) => {

    // const [openSearchbar, setOpenSearchbar] = useState<boolean>(false)

    return(
        <aside className={`mobile-navbar ${mobileNav.open ? 'open' : ''}`}>
            <ul className='mobile-navbar-list'>
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
                {/* {authToken && ()} */}
                {/* {openSearchbar && (
                    <NavigationSearchbar url={`${WEBSOCKET_BASE}/ws/search/`}>
                    {searchResults => (
                        <>
                            <Links searchResults={searchResults as SearchResultsData[]} />
                        </>
                    )}
                    </NavigationSearchbar>
                )} */}

            </ul>
            
        </aside>
    )
}

export default MobileNavbar


