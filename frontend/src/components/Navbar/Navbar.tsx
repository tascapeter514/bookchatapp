import React, { useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../../slices/authApiSlice.tsx'
import { RootState } from '../../store/store.tsx'
import NavigationSearchbar from '../Search/NavigationSearchbar/NavigationSearchbar.tsx'
import { removeCredentials } from '../../slices/authSlice.tsx'
import Links from '../Mappers/Links/Links.tsx'
import { WEBSOCKET_BASE } from '../../utils/baseAPI.tsx'
import { SearchResultsData } from '../../types.ts'
import OpenMobileSearch from '../Buttons/OpenMobileSearch/OpenMobileSearch.tsx'
import { HamburgerIcon, CloseHamburgerIcon } from '../Icons.tsx'
import CloseMobileNav from '../Buttons/CloseMobileNav/CloseMobileNav.tsx'
import mobileNavReducer from '../../reducers/mobileNavReducer.tsx'
import OpenMobileNav from '../Buttons/OpenMobileNav/OpenMobileNav.tsx'
import MobileNavbar from '../MobileNavbar/MobileNavbar.tsx'

import './Navbar.css'



const Navbar = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { authToken } = useSelector((state: RootState) => state.auth)
  const [logout ] = useLogoutMutation()
  const [openSearchbar, setOpenSearchbar] = useState<boolean>(false)
  
const [mobileNav, dispatchNav] = useReducer(mobileNavReducer, {open: false, isExiting: false})
 

  const handleLogout = async () => {
    
    try {
      console.log('nav')
      const response = await logout(authToken)
      console.log('navbar logout response:', response)
      dispatch(removeCredentials())
      navigate('/login')


    } catch (err: any) {
      console.log(err?.data?.message || err?.error)

    }

  }

    return(
        <header className="container container-nav">
          <div className="searchbar-title-wrapper">
              <h1 className='main-title'>Book Chat</h1>
              <p className="subtitle">A book club app for book lovers</p>
          </div>
          <OpenMobileNav mobileNav={mobileNav} navDispatch={dispatchNav}><HamburgerIcon /></OpenMobileNav>
          <CloseMobileNav mobileNav={mobileNav} navDispatch={dispatchNav}><CloseHamburgerIcon /></CloseMobileNav>
          <MobileNavbar mobileNav={mobileNav} authToken={authToken} handleLogout={handleLogout}/>
          <nav className='desktop-main-navbar'>
              <ul className='main-navbar-list'>
                  <li className='main-list-element'><Link to='/'>Home</Link></li>
                  <li className='main-list-element'><Link to='/books'>Books</Link></li>
                  <li className='main-list-element'><Link to='#'>Authors</Link></li>
                  <li className='main-list-element'><Link to='#'>About</Link></li>

              </ul>
          </nav>
          <nav className='desktop-right-navbar'>
              <OpenMobileSearch setOpenSearchbar={setOpenSearchbar}/>

              {authToken ? (
                <>
                  <Link className='profile-link' to='/userDashboard'>Profile</Link>
                  <a className='logout-link' onClick={handleLogout}>Logout</a>
                </>
                ) : (
                  <Link className='login-link' to='/login'>Log In</Link>
              )}
              {openSearchbar && (
                <NavigationSearchbar url={`${WEBSOCKET_BASE}/ws/search/`}>
                  {searchResults => (
                    <>
                      <Links searchResults={searchResults as SearchResultsData[]} />
                    </>  
                  )} 
                </NavigationSearchbar>
              )}
          </nav>   
      </header>
    )
}

export default React.memo(Navbar)