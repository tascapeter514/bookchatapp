import { userData } from '../../../common/UserContext'
import { Dispatch, SetStateAction } from 'react'
import './ProfileNavbar.css'

interface ProfileNavbarProps {
    setActiveTab: Dispatch<SetStateAction<number>>,
    activeTab: number,
}

export function formatDate(dateString: string) {
    const date = new Date(dateString);
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    


    const day = date.getDate();
    const month = monthNames[date.getMonth()]
    const year = date.getFullYear()

    return { day, month, year }
}

const ProfileNavbar = (props: ProfileNavbarProps) => {

    const { activeTab, setActiveTab } = props
    const { activeUser } = userData()

    // console.log('acitve user:', activeUser)

  

    

    const {day, month, year } = formatDate(activeUser.date_joined)

    const navbarContents = ['Account', 'Messages', 'Bookclubs', 'Bookshelves']

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
                <h1>Hi {activeUser.first_name}!</h1>
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




