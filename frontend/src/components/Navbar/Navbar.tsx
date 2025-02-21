import { useState, FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { HandleLogout, Author, Book, Bookclub } from '../../types.ts'
import { userData } from '../common/UserContext.tsx'
import Searchbar from '../Searchbar/Searchbar.tsx'
import SearchResults from '../SearchResults/SearchResults.tsx'
import './Navbar.css'

const Navbar: FC = () => {

  const navigate = useNavigate()
  const [showNavbar] = useState(false)
  const {activeUserToken, setActiveUserToken} = userData()
  // const [searchResults, setSearchResults] = useState<SearchResults[]>([])
  // const [searchResults, setSearchResults] = useState<SearchResults>({
  //     book_results: [],
  //     author_results: [],
  //     bookclub_results: []

  //   })

  const [authorSearchResults, setAuthorSearchResults] = useState<Author[]>([])
  const [bookSearchResults, setBookSearchResults] = useState<Book[]>([])
  const [bookclubSearchResults, setBookclubSearchResults] = useState<Bookclub[]>([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const searchResults = [
    {type: 'author', items: authorSearchResults},
    {type: 'book', items: bookSearchResults},
    {type: 'bookclub', items: bookclubSearchResults}
  ]

  const sortedSearchResults = searchResults.sort((a, b) => a.items.length - b.items.length)

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
        <li><Link to='/login'>Log In</Link></li>
    )

    const authLinks = (
        <li>
            <Link className='profile-link' to='/userDashboard'>Profile</Link>
            <a className='logout-link' onClick={handleLogout}>Logout</a>
        </li>

    )

    // const searchResultElements = searchResults.map((searchResult) => {

    //   const authorResults = search



    //   return(
    //     <ul className="search-results">
    //       <li key={searchR}>
    //         <Link></Link>
    //       </li>

    //     </ul>
    //   )
    // })

    // console.log('search results:', searchResults)
    console.log('author results:', authorSearchResults)
    console.log('book results:', bookSearchResults)
    console.log('bookclub results:', bookclubSearchResults)

    return(
        <header>
            <div className="container container-nav">
                <div className="title-searchbar-wrapper">
                  <div className="site-title">
                  <h1>Book Chat</h1>
                  <p className="subtitle">A book club app for book lovers</p>
                  </div>
                  <div className="searchBar-searchResults-wrapper">
                    <Searchbar
                      setAuthorSearchResults={setAuthorSearchResults}
                      setBookSearchResults={setBookSearchResults}
                      setBookclubSearchResults={setBookclubSearchResults}
                      setShowSearchResults={setShowSearchResults}
                    ></Searchbar>
                    {showSearchResults ? 
                      <SearchResults></SearchResults> : ''
                    }



                    



                    
                    {/* <div className='search-results'>SearchResults</div> */}
                  </div>
                  

                </div>



                <button className='mobile-nav-toggle' aria-expanded={showNavbar}>

                </button>
                <nav>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='#'>Books</Link></li>
                        <li><Link to='#'>Authors</Link></li>
                        <li><Link to='#'>About</Link></li>
                        { activeUserToken ? authLinks : guestLinks}
                    </ul>
                </nav>
            </div> 
      </header>
    )
}

export default Navbar