import { useState, FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HandleLogout, CurrentUser } from '../../types.ts'
import './Navbar.css'


interface NavProps {
    auth: () => boolean,
    setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser | null>>;
}


const Navbar: FC<NavProps> = ({auth, setCurrentUser}) => {
    const navigate = useNavigate()
    const [showNavbar] = useState(false)
    const isAuthenticated = auth()

    const handleLogout: HandleLogout = async () => {
        console.log('handle logout check')
        const token = localStorage.getItem('authToken');
        try {
          if (token) {
            await fetch('http:localhost:8000/api/auth/logout', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization' : `Token ${JSON.parse(token)}`
              }
            });
          }
        } catch (error) {
          console.error('Error during logout', error)
        } finally {
          // Clear client-side data regardless of server response
          localStorage.removeItem('authToken')
          localStorage.removeItem('currentUser')
          setCurrentUser(null)
          navigate('/login')
        }
      };
   

    const guestLinks = (
        <li><Link to='/login'>Log In</Link></li>
    )

    const authLinks = (
        <li>
            <Link to='/userDashboard'>Profile</Link>
            <button onClick={handleLogout}>Logout</button>
        </li>

    )
    

    return(
        <header>
            <div className="container container-nav">
                <div className="site-title">
                <h1>Book Chat</h1>
                <p className="subtitle">A book club app for book lovers</p>
                </div>
                <button className='mobile-nav-toggle' aria-expanded={showNavbar}>

                </button>
                <nav>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='#'>Books</Link></li>
                        <li><Link to='#'>Authors</Link></li>
                        <li><Link to='#'>About</Link></li>
                        { isAuthenticated ? authLinks : guestLinks}
                    </ul>
                </nav>
            </div> {/* .container */}
      </header>
    )
}

export default Navbar