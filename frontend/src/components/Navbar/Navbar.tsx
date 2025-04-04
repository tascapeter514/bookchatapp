import React, { useState, useMemo, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../../slices/authApiSlice.tsx'
import { RootState } from '../../store/store.tsx'
import Searchbar from '../Search/Searchbar/Searchbar.tsx'
import { removeCredentials } from '../../slices/authSlice.tsx'
import './Navbar.css'








const Navbar = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { authToken } = useSelector((state: RootState) => state.auth)
  const [logout ] = useLogoutMutation()
  

 
  const [showNavbar] = useState(false)

 

  const handleLogout = async () => {
    
    try {
      const response = await logout(authToken)
      console.log('navbar logout response:', response)
      dispatch(removeCredentials())
      navigate('/login')


    } catch (err: any) {
      console.log(err?.data?.message || err?.error)

    }

  }
 
  const guestLinks = (<li className='login-link'><Link to='/login'>Log In</Link></li>)
  const authLinks = (
      <li>
          <Link className='profile-link' to='/userDashboard'>Profile</Link>
          <a className='logout-link' onClick={handleLogout}>Logout</a>
      </li>

  )

  const navLinks = useMemo(() => authToken ? authLinks : guestLinks , [authToken])


    console.log('navbar auth token:', authToken)

  


    return(
        <header>
            <div className="container container-nav">
                <div className="title-searchbar-wrapper">
                  <div className="site-title">
                  <h1>Book Chat</h1>
                  <p className="subtitle">A book club app for book lovers</p>
                  </div>
                  <div className="searchBar-searchResults-wrapper">
                    <Searchbar></Searchbar>
                  </div>
                </div>
                <button className='mobile-nav-toggle' aria-expanded={showNavbar}>
                </button>
                <nav className='main-navbar'>
                    <ul className='main-navbar-list'>
                        <li className='main-list-element'><Link to='/'>Home</Link></li>
                        <li className='main-list-element'><Link to='#'>Books</Link></li>
                        <li className='main-list-element'><Link to='#'>Authors</Link></li>
                        <li className='main-list-element'><Link to='#'>About</Link></li>
                        {navLinks}
                    </ul>
                </nav>
            </div> 
      </header>
    )
}

export default React.memo(Navbar)