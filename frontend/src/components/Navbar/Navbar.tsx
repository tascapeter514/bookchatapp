import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HandleLogout } from '../../types.ts'
import { userContext } from '../common/Context/UserContext/UserContext.tsx'
import Searchbar from '../Searchbar/Searchbar.tsx'
import './Navbar.css'

const Navbar = () => {

  const navigate = useNavigate()
  const [showNavbar] = useState(false)
  const {activeUserToken, setActiveUserToken} = userContext()
  
    const handleLogout: HandleLogout = async () => {
        const token = localStorage.getItem('authToken');
        try {
          if (token) {
            await fetch('http:localhost:8000/api/auth/logout', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Token ${activeUserToken}`
              }
            });
          }
        } catch (error) {
          console.error('Error during logout', error)
        } finally {
          // Clear client-side data regardless of server response
          setActiveUserToken('')
          sessionStorage.removeItem('authToken')
          sessionStorage.removeItem('currentUser')
          navigate('/login')
        }
      };
   
    const guestLinks = (
        <li className='login-link'><Link to='/login'>Log In</Link></li>
    )

    const authLinks = (
        <li>
            <Link className='profile-link' to='/userDashboard'>Profile</Link>
            <a className='logout-link' onClick={handleLogout}>Logout</a>
        </li>

    )

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
                        { activeUserToken ? authLinks : guestLinks}
                    </ul>
                </nav>
            </div> 
      </header>
    )
}

export default Navbar