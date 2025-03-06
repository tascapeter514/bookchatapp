import { userData } from '../../../common/UserContext'
import { Dispatch, SetStateAction, useState } from 'react'
import CreateButton from '../../../common/Buttons/CreateButton/CreateButton'
import { Bookshelf } from '../../../../types'
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
    const [activeBookshelf, setActiveBookshelf] = useState<number>(0)
    const { activeUser, userBookshelves } = userData()
    const {day, month, year } = formatDate(activeUser.date_joined)
    const navbarContents = ['Account', 'Messages', 'Bookclubs', 'Bookshelves']
    const bookshelfOffset = navbarContents.length

    // console.log('profile navbar:', userBookshelves)

    console.log('active tab:', activeTab)

    const bookshelfElements = userBookshelves.map((userBookshelf: Bookshelf, userBookshelfIndex: number) => (

        <li 
            key={userBookshelf.bookshelf_id}
            onClick={() => setActiveTab(userBookshelfIndex + bookshelfOffset)}
            className={activeTab == userBookshelfIndex + bookshelfOffset ? 'active' : ''}
        >   
            <a id={`bookshelf-${userBookshelfIndex}`} href={`#${userBookshelf.name.toLowerCase()}`}>
                {userBookshelf.name}
            </a>


        </li>

    ))

    const navbarElements = navbarContents.map((navbarContent: string, navbarIndex: number) => {
        return (
            <>
                {(navbarContent == 'Account' || navbarContent == 'Messages') && (
                    <li 
                        key={navbarIndex}
                        onClick={ () => setActiveTab(navbarIndex)}
                        className={activeTab == navbarIndex ? 'active' : ''}
                    >
                        <a id={`tab-${navbarIndex}`} href={`#${navbarContent.toLowerCase()}`}>
                            {navbarContent}
                        </a>
                    </li> 
                )}

                {navbarContent == 'Bookclubs'&& (
                    <>
                        <hr className='navbar-line-break' />
                        <li 
                            key={navbarIndex}
                            onClick={ () => setActiveTab(navbarIndex)}
                            className={activeTab == navbarIndex ? 'active' : ''}
                        >
                            
                            <a id={`tab-${navbarIndex}`} href={`#${navbarContent.toLowerCase()}`}>
                                {navbarContent}
                            </a>
                            
                        </li>
                        <CreateButton>Bookclub</CreateButton>
                        
                        
                    </> 
                )}
                {navbarContent == 'Bookshelves' && (
                    <div className='navbar-bookshelf-component'>
                        <hr className='navbar-line-break' />
                        <li 
                            key={navbarIndex}
                            onClick={ () => setActiveTab(navbarIndex)}
                            className={activeTab == navbarIndex ? 'active' : ''}
                        >
                                
                            <a id={`tab-${navbarIndex}`} href={`#${navbarContent.toLowerCase()}`}>
                                {navbarContent}
                            </a>
                                
                        </li>
                        <ul className='navbar-bookshelf-list'>
                            {bookshelfElements}

                        </ul>
                        <CreateButton>Bookshelf</CreateButton>

                    </div>
                )} 
           </>
        )
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




