import { useState, FC } from 'react'
import { Link } from 'react-router-dom'
import { HandleLogout } from '../../types.ts'
import './Navbar.css'


interface NavProps {
    auth: () => boolean,
    logout: HandleLogout
}


const Navbar: FC<NavProps> = ({auth, logout}) => {
    const [showNavbar] = useState(false)
    const isAuthenticated = auth()


   

    const guestLinks = (
        <li><Link to='/login'>Log In</Link></li>
    )

    const authLinks = (
        <li>
            <Link to='/userDashboard'>Profile</Link>
            <button onClick={logout}>Logout</button>
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