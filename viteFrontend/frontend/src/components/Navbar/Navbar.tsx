import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'


const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(false)





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
                        <li><Link to='#'>Log In</Link></li>
                    </ul>
                </nav>
            </div> {/* .container */}
      </header>
    )
}

export default Navbar