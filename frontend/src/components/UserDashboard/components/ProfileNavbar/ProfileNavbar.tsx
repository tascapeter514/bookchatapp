import { userData } from '../../../common/UserContext'
import { Dispatch, SetStateAction, useState } from 'react'
import CreateButton from '../../../common/Buttons/CreateButton/CreateButton'
import { Bookshelf } from '../../../../types'
import  BookshelfDropdown  from '../../../common/BookshelfDropdown/BookshelfDropdown'
import { RightDropDownIcon } from '../../../common/Icons'
import { formatDate } from '../../../common/functions'
import './ProfileNavbar.css'

interface ProfileNavbarProps {
    activeTab: number,
    activeBookshelf: number,
    setActiveTab: Dispatch<SetStateAction<number>>,
    setActiveBookshelf: Dispatch<SetStateAction<number>>
}

const ProfileNavbar = (props: ProfileNavbarProps) => {

    const { activeTab, setActiveTab, setActiveBookshelf } = props
    const { activeUser, userBookshelves } = userData()
    const [activePanel, setActivePanel] = useState(false);
    const [isRotated, setIsRotated] = useState(false);
    const {day, month, year } = formatDate(activeUser.date_joined)
    const navbarContents = ['Account', 'Messages', 'Bookclubs', 'Bookshelves']
    const bookshelfOffset = navbarContents.length
    
    const toggleDropdown = () => {
        setActivePanel(prev => !prev)
        setIsRotated(prev => !prev)

    }

    const bookshelfElements = userBookshelves.map((userBookshelf: Bookshelf, userBookshelfIndex: number) => {

        function handleActiveBookshelf() {
            setActiveTab(userBookshelfIndex + bookshelfOffset)
            setActiveBookshelf(userBookshelfIndex)
        }

        return (

            <li 
                key={userBookshelf.bookshelf_id}
                onClick={handleActiveBookshelf}
                className={activeTab == userBookshelfIndex + bookshelfOffset ? 'active' : ''}
            >   
                <a id={`bookshelf-${userBookshelfIndex}`} href={`#${userBookshelf.name.toLowerCase()}`}>
                    {userBookshelf.name}
                </a>


            </li>
        )

    })

    const navbarElements = navbarContents.map((navbarContent: string, navbarIndex: number) => {

        return (
            <>
                {(navbarContent == 'Account' || navbarContent == 'Messages') && (
                    <li 
                        key={navbarIndex}
                        onClick={ () => setActiveTab(navbarIndex)}
                        className={activeTab == navbarIndex ? 'active' : ''}
                    >
                        <a id={`link-${navbarIndex}`} href={`#${navbarContent.toLowerCase()}`}>
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
                            
                            <a id={`link-${navbarIndex}`} href={`#${navbarContent.toLowerCase()}`}>
                                {navbarContent}
                            </a>
                            
                        </li>
                        <CreateButton>Bookclub</CreateButton>
                        
         
                    </> 
                )}
                {navbarContent == 'Bookshelves' && (
                    <div className='navbar-bookshelf-component'>
                        <hr className='navbar-line-break' />
                        <BookshelfDropdown activePanel={activePanel}>
                            <li
                                key={navbarIndex}
                                onClick={ () => setActiveTab(navbarIndex)}
                                className={ `navbar-bookshelf-listElement ${activeTab == navbarIndex ? 'active' : ''}`}
                            >
                                <a className='navbar-bookshelf-link' id={`link-${navbarIndex}`} href={`#${navbarContent.toLowerCase()}`}>
                                    {navbarContent}
                                    <RightDropDownIcon onClick={toggleDropdown} isRotated={isRotated}></RightDropDownIcon>
                                </a>
                            </li>
                            <ul className='navbar-bookshelf-list'>{bookshelfElements}</ul>
                        </BookshelfDropdown>
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




