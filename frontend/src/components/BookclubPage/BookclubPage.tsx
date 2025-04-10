import './BookclubPage.css'

import { useReducer } from 'react'
import { Bookshelf } from '../../types'
// import BookshelfPanel from '../Panels/BookshelfPanel/BookshelfPanel'
// import CurrentReadPanel from './components/CurrentReadPanel/CurrentReadPanel'
import BookclubHeader from '../BookclubHeader/BookclubHeader'
import BookclubNav from '../BookclubNav/BookclubNav'
import tabsReducer from '../../reducers/tabsReducer'
import BookclubTabs from '../BookclubTabs/BookclubTabs'





const BookclubPage = () => {

    const [bookclubTabs, dispatchTabs] = useReducer(tabsReducer, {activeTab: '', activeBookshelf: '', showNav: false})

    const bookshelves = [] as Bookshelf[]
    return(
            <div className='bookclub-container'>
                <div className="bookclub-content-wrapper">
                    <BookclubHeader /> 
                    <hr />
                    

                    <BookclubTabs bookclubTabs={bookclubTabs} dispatchTabs={dispatchTabs}/>
                    {bookclubTabs.showNav && <BookclubNav bookclubTabs={bookclubTabs}/>}

                    {/* <div 
                        className={`subnav-container ${showSubNav ? 'active' : ''}`}

                    > */}
                        {/* <BookclubNav 
                            subNav={showSubNav} 
                            setActiveBookshelf={setActiveBookshelf}
                        >
                        </BookclubNav> */}
                    {/* </div> */}
     
                        
                 
                </div>
            </div>
            )
}


export default BookclubPage




