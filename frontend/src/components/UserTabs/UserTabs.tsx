import { userContext } from '../common/Context/UserContext/UserContext'
import { useState } from 'react'


import BookclubButton from '../TabButtons/BookclubButton/BookclubButton'
import BookshelfButton from '../TabButtons/BookshelfButton/BookshelfButton'
import { formatDate } from '../common/functions'
import './UserTabs.css'
import AccountButton from '../TabButtons/AccountButton/AccountButton'
import MessageButton from '../TabButtons/MessageButton/MessageButton'

// interface ProfileNavbarProps {
//     activeTab: number,
//     activeBookshelf: number,
//     setActiveTab: Dispatch<SetStateAction<number>>,
//     setActiveBookshelf: Dispatch<SetStateAction<number>>
// }

const UserTabs = () => {

    const { activeUser } = userContext()

    // MOVE LOGIC SERVER SIDE?
    const {day, month, year } = formatDate(activeUser.date_joined)

    // const [activePanel, setActivePanel] = useState(false);
    const [activeTab, setActiveTab] = useState<number>(NaN)
    
    // const [newBkslfId, setNewBkslfId] = useState<string>('')


   
    
    
    // const closeBookshelfModal = () => bookshelfRef.current?.close()
    // 
    


   
    


    // console.log('user bookshelves:', userBookshelves)


   

    // const navbarElements = navbarContents.map((navbarContent: string, navbarIndex: number) => {

    //     return (
    //         <>
    //

    //             {navbarContent == 'Bookclubs'&& (
    //                
                {/* {navbarContent == 'Bookshelves' && (
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
                        <CreateButton onClick={openBookshelfModal}>Bookshelf</CreateButton>
                        <PostModal 
                            ref={bookshelfRef} 
                            closeModal={closeBookshelfModal}
                            url={`http://localhost:8000/api/user/addBookshelf/${activeUser.id}`}
                            setResults={setUserBookshelves}
                            
                        /> */}

                        {/* <BookshelfModal
                            bookshelfRef={bookshelfRef}
                            closeBookshelfModal={closeBookshelfModal}
                            addBookshelf={addUserBookshelf}
                            newBkslfId={newBkslfId}
                            setBkslfId={setNewBkslfId}
                        ></BookshelfModal> */}
    //                 </div>
    //             )} 
    //        </>
    //     )
    // })

    return(
        <div className="navbar-container">
            <div className="profile-header">
                <h1>Hi {activeUser.first_name}!</h1>
                <span>Member since {month} {day}, {year}</span>
            </div>
            <nav className='profile-navbar'>
                <ul className="profile-nav-list">
                    <AccountButton activeTab={activeTab} setActiveTab ={setActiveTab}
                    />
                    <MessageButton activeTab={activeTab} setActiveTab ={setActiveTab} 
                    />
                    <BookclubButton activeTab={activeTab} setActiveTab ={setActiveTab}
                    />
                    <BookshelfButton activeTab={activeTab} setActiveTab ={setActiveTab}
                    />

                    

                    

                </ul>
               
                
            </nav>
        </div>
    )
}

export default UserTabs


 {/* <ul className='profile-nav-list'>
                    {navbarElements}
                </ul> */}




