import './BookclubPage.css'

import { useState } from 'react'
// import BookshelfPanel from '../Panels/BookshelfPanel/BookshelfPanel'
// import CurrentReadPanel from './components/CurrentReadPanel/CurrentReadPanel'
import BookclubHeader from '../BookclubHeader/BookclubHeader'
import BookclubNav from '../BookclubNav/BookclubNav'
// import BookshelfProvider from '../../context/BookshelfContext/BookshelfContext'
import Tabs from '../BookclubTabs/BookclubTabs'



const BookclubPage = () => {

    
    const [activeTab, setActiveTab] = useState(0)
    const [showSubNav, setShowSubNav] = useState(false)
    const [activeBookshelf, setActiveBookshelf] = useState<number>(0)
    const tabContents = [{name: 'Bookshelves', id: 0}, {name: 'Current Read', id: 1}]
    
    
    // const panels = [
    //     <BookshelfPanel 
    //         activeBookshelf={activeBookshelf} 
    //         bookshelves={bookshelves}
    //     />,
    //     <CurrentReadPanel />
    // ]
    // const PanelComponent = () => panels[activeTab]


    return(
            <div className='bookclub-container'>
                <div className="bookclub-content-wrapper">
                    <BookclubHeader></BookclubHeader>
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
                        <BookclubNav 
                            subNav={showSubNav} 
                            setActiveBookshelf={setActiveBookshelf}
                        >
                        </BookclubNav>
                    </div>
                    {/* <BookshelfProvider>
                        <PanelComponent />
                    </BookshelfProvider> */}
                </div>
            </div>
            )
}


export default BookclubPage




