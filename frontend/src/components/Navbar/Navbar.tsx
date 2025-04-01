import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import useLogger from '../common/hooks/useLogger.tsx'
import { userContext } from '../common/Context/UserContext/UserContext.tsx'
import Searchbar from '../Searchbar/Searchbar.tsx'
import './Navbar.css'

const Navbar = () => {

  const [showNavbar] = useState(false)
  const {userState} = userContext()
  // const { logout } = useLogger()
  


    const handleLogout = async () => {
      console.log('handle logout check')
      // await logout()
    }


   
    const guestLinks = (
        <li className='login-link'><Link to='/login'>Log In</Link></li>
    )

    const authLinks = (
        <li>
            <Link className='profile-link' to='/userDashboard'>Profile</Link>
            <a className='logout-link' onClick={handleLogout}>Logout</a>
        </li>

    )

    console.log('navbar auth token:', userState.authToken);
    console.log('navbar user state:', userState)


  
    

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
                        { userState.authToken && userState.isLoggedIn ? authLinks : guestLinks}
                    </ul>
                </nav>
            </div> 
      </header>
    )
}

export default Navbar