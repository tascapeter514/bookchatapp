import React, { useState } from 'react'
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
import './Navbar.css'



const Navbar = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { authToken } = useSelector((state: RootState) => state.auth)
  const [logout ] = useLogoutMutation()
  
  const [showNavbar] = useState(false)

 

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
        <header>
            <div className="container container-nav">
                <NavigationSearchbar url={`${WEBSOCKET_BASE}/ws/search/`}>
                  {searchResults => (
                      <>
                        <Links searchResults={searchResults as SearchResultsData[]} />
                      </>  
                  )} 
                </NavigationSearchbar>
                <button className='mobile-nav-toggle' aria-expanded={showNavbar}>
                </button>
                <nav className='main-navbar'>
                    <ul className='main-navbar-list'>
                        <li className='main-list-element'><Link to='/'>Home</Link></li>
                        <li className='main-list-element'><Link to='/books'>Books</Link></li>
                        <li className='main-list-element'><Link to='#'>Authors</Link></li>
                        <li className='main-list-element'><Link to='#'>About</Link></li>
                        <li>
                          {authToken ? (
                            <>
                              <Link className='profile-link' to='/userDashboard'>Profile</Link>
                              <a className='logout-link' onClick={handleLogout}>Logout</a>
                            </>
                          ) : (
                            <Link className='login-link' to='/login'>Log In</Link>
                          )}
                        </li>
                    </ul>
                </nav>
            </div> 
      </header>
    )
}

export default React.memo(Navbar)