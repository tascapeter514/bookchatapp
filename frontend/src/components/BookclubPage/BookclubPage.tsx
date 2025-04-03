import './BookclubPage.css'

import { useState } from 'react'
import { bookclubData } from '../../context/BookclubContext/BookclubContext'
import BookshelfPanel from '../Panels/BookshelfPanel/BookshelfPanel'
import CurrentReadPanel from './components/CurrentReadPanel/CurrentReadPanel'
import SubNavbar from './components/SubNavbar/SubNavbar'
import TopFacade from './components/TopFacade/TopFacade'
import BookshelfProvider from '../../context/BookshelfContext/BookshelfContext'
import Tabs from './components/Tabs/Tabs'



const BookclubPage = () => {

    
    const { bookshelves } = bookclubData()
    const [activeTab, setActiveTab] = useState(0)
    const [showSubNav, setShowSubNav] = useState(false)
    const [activeBookshelf, setActiveBookshelf] = useState<number>(0)
    const tabContents = [{name: 'Bookshelves', id: 0}, {name: 'Current Read', id: 1}]
    
    
    const panels = [
        <BookshelfPanel 
            activeBookshelf={activeBookshelf} 
            bookshelves={bookshelves}
        />,
        <CurrentReadPanel />
    ]
    const PanelComponent = () => panels[activeTab]


    return(
            <div className='bookclub-container'>
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
                    {/* <BookshelfProvider>
                        <PanelComponent />
                    </BookshelfProvider> */}
                </div>
            </div>
            )
}


export default BookclubPage




