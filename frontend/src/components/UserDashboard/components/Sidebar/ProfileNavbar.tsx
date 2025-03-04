import { userData } from '../../../common/UserContext'
import { Dispatch, SetStateAction } from 'react'
import './ProfileNavbar.css'

interface ProfileNavbarProps {
    setActiveTab: Dispatch<SetStateAction<number>>,
    activeTab: number,
}

const ProfileNavbar = (props: ProfileNavbarProps) => {

    const { activeTab, setActiveTab } = props
    const { activeUser } = userData()

    console.log('acitve user:', activeUser)

    function formatDate(dateString: string) {
        const date = new Date(dateString);
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const monthIndex = date.getMonth() + 1;


        const day = date.getDate();
        const month = monthNames[monthIndex]
        const year = date.getFullYear()

        return { day, month, year }
    }

    const {day, month, year } = formatDate(activeUser.date_joined)

    const navbarContents = ['Account', 'Bookclubs', 'Bookshelves', 'Messages']

    const navbarElements = navbarContents.map((navbarContent: string, navbarIndex: number) => {

        return <li 
            key={navbarIndex}
            onClick={ () => setActiveTab(navbarIndex)}
            className={activeTab == navbarIndex ? 'active' : ''}
            >

                <a id={`tab-${navbarIndex}`} href={`#${navbarContent.toLowerCase()}`}>
                    {navbarContent}
                </a>
            

        </li>

    })

    

    

    

    return(
        <div className="navbar-container">
            <div className="profile-header">
                <h1>Hello {activeUser.first_name}!</h1>
                <span>Member since {month} {day}, {year}</span>
            </div>
            <nav className='profile-navbar'>
                
                <ul className='profile-nav-list'>

                    {navbarElements}
                    
                    
            
                </ul>
            </nav>
        </div>
    )
}

export default ProfileNavbar


{/* <li className="active">
                        <a href="" aria-current='page'>Account</a>
                        
                    </li>
                    <li>
                        <a href="">Bookclubs</a>
                    </li>
                    <li>
                        <a href="">Bookshelves</a>
                    </li>
                    <li>
                        <a href="">Messages</a>
                    </li> */}