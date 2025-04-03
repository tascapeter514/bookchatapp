import { useState, useMemo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useLogger from '../../hooks/useLogger.tsx'
import { userContext } from '../../context/UserContext/UserContext.tsx'
import Searchbar from '../Search/Searchbar/Searchbar.tsx'
import './Navbar.css'

const Navbar = () => {

  console.log('navbar rendered')

  const [showNavbar] = useState(false)
  // const {authToken, isLoggedIn} = userContext().userState
  const [authToken] = useState<string>(() => {
    const storedToken = sessionStorage.getItem('authToken')
    return storedToken ? JSON.parse(storedToken) : '';
  }


  )
  const navigate = useNavigate()
  // const {userState } = userContext()
  // const { logout } = useLogger()
  


    const handleLogout = async () => {
      console.log('handle logout check')
      sessionStorage.removeItem('authToken')
      sessionStorage.removeItem('activeUser')
      console.log('removed token')
      navigate('/login')
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

    const navLinks = useMemo(() => {

      return authToken  ? authLinks : guestLinks

    }, [authToken])


    console.log('navbar auth token:', authToken)

    // console.log('navbar userState:', userState)


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
                        {/* { userState.authToken && userState.isLoggedIn ? authLinks  :  guestLinks} */}
                        {navLinks}
                    </ul>
                </nav>
            </div> 
      </header>
    )
}

export default Navbar