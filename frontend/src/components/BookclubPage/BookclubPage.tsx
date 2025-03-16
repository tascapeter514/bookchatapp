import './BookclubPage.css'

import { useState, useEffect } from 'react'
import { Bookclub } from '../../types'
import { userData } from '../../components/common/Context/UserContext/UserContext'
import { bookclubData } from '../../components/common/Context/BookclubContext/BookclubContext'
import BookshelfPanel from '../common/BookshelfPanel/BookshelfPanel'
import CurrentReadPanel from './components/CurrentReadPanel/CurrentReadPanel'
import SubNavbar from './components/SubNavbar/SubNavbar'
import TopFacade from './components/TopFacade/TopFacade'
import BookshelfProvider from '../common/Context/BookshelfContext/BookshelfContext'
import Tabs from './components/Tabs/Tabs'



const BookclubPage = () => {

    const { userBookclubs } = userData()
    const { bookshelves, parameters } = bookclubData()
    const [activeTab, setActiveTab] = useState(0)
    const [showSubNav, setShowSubNav] = useState(false)
    const [activeBookshelf, setActiveBookshelf] = useState<number>(0)
    const tabContents = [{name: 'Bookshelves', id: 0}, {name: 'Current Read', id: 1}]
    const [isMember, setIsMember] = useState(false)
    
    const panels = [
        <BookshelfPanel 
            activeBookshelf={activeBookshelf} 
            bookshelves={bookshelves}
        />,
        <CurrentReadPanel />
    ]
    const PanelComponent = () => panels[activeTab]


    useEffect(() => {
        setIsMember(() => {
            return  userBookclubs.map((userBookclub: Bookclub) => userBookclub.bookclub_id).some(userBookclubId => userBookclubId === parameters.id)
        })

        const lastVisited = new Date().toISOString()
        localStorage.setItem(`lastVisited/${parameters.id}`, lastVisited)

    }, [userBookclubs])

    return(
            <div className='bookclub-container'>
                {isMember && (
                    <div className="bookclub-content-wrapper">
                        <TopFacade></TopFacade>
                            <hr />
                            <Tabs
                                showSubNav={showSubNav}
                                setShowSubNav={setShowSubNav} 
                                contents={tabContents} 
                                setActiveTab={setActiveTab} 
                                activeTab={activeTab}
                            >
                                </Tabs>
                            <div 
                                className={`subnav-container ${showSubNav ? 'active' : ''}`}

                            >
                                <SubNavbar 
                                    subNav={showSubNav} 
                                    setActiveBookshelf={setActiveBookshelf}
                                >
                                </SubNavbar>
                            </div>
                            <BookshelfProvider>
                                <PanelComponent />
                            </BookshelfProvider>


                    </div>
                )}

                {!isMember && (
                    <div>
                        <h1>We're sorry.</h1>
                        <p>You must be a member to view the book club.</p>
                    </div>
                ) }
                </div>
        
    )
}


export default BookclubPage


