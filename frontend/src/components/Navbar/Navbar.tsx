import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../../slices/authApiSlice.tsx'
import { RootState } from '../../store/store.tsx'
import { removeCredentials } from '../../slices/authSlice.tsx'
import OpenSearchbar from '../Buttons/OpenSearchbar/OpenSearchbar.tsx'
import MobileNavbar from '../MobileNavbar/MobileNavbar.tsx'
import './Navbar.css'



const Navbar = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { authToken } = useSelector((state: RootState) => state.auth)
  const [logout ] = useLogoutMutation()
  
 

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
          <nav className='desktop-main-navbar'>
            <div className="searchbar-title-wrapper">
              <h1 className='main-title'>Book Chat</h1>
              <p className="subtitle">A book club app for book lovers</p>
            </div>
            <ul className='main-navbar-list'>
                <li className='main-list-element'><Link to='/'>Home</Link></li>
                <li className='main-list-element'><Link to='/books'>Books</Link></li>
                <li className='main-list-element'><Link to='#'>Authors</Link></li>
                <li className='main-list-element'><Link to='#'>About</Link></li>
            </ul>
          </nav>
          <nav className='desktop-right-navbar'>
              <OpenSearchbar/>
              {authToken ? (
                <>
                  <Link className='profile-link' to='/userDashboard'>Profile</Link>
                  <a className='logout-link' onClick={handleLogout}>Logout</a>
                </>
                ) : (
                  <Link className='login-link' to='/login'>Log In</Link>
              )}
          </nav>
          <MobileNavbar  authToken={authToken} handleLogout={handleLogout}/>   
      </header>
    )
}

export default React.memo(Navbar)